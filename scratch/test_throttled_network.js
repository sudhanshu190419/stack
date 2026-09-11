const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9291;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(p) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + p, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function runBenchmark(name, netConditions) {
  console.log(`\n==================================================`);
  console.log(`BENCHMARK: ${name}`);
  console.log(`==================================================`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await sleep(2500);
    const tabs = await getJson('/json');
    const tab = tabs.find(t => t.type === 'page') || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === reqId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');

    if (netConditions) {
      console.log(`Applying network throttling: Latency=${netConditions.latency}ms, Download=${(netConditions.downloadThroughput * 8 / 1000000).toFixed(1)} Mbps`);
      await send('Network.emulateNetworkConditions', {
        offline: false,
        latency: netConditions.latency,
        downloadThroughput: netConditions.downloadThroughput,
        uploadThroughput: netConditions.uploadThroughput,
        connectionType: 'cellular4g'
      });
    }

    console.log('Navigating to http://127.0.0.1:3005 ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3005' });
    await sleep(3000); // Wait for Frame 0 + warmup runway

    // Instrument draw calls, frame indexes, and freeze duration tracking
    await send('Runtime.evaluate', {
      expression: `
        window.__log = {
          draws: [],
          renderTimes: [],
          monotonicErrors: 0
        };

        const canvas = document.querySelector('canvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const origDraw = ctx.drawImage;
          let lastFrameDrawn = -1;
          let lastDirection = 1;

          ctx.drawImage = function(...args) {
            const now = performance.now();
            const hud = document.querySelector('span[class*=\"font-mono\"]');
            const target = hud ? parseInt(hud.innerText, 10) : -1;

            window.__log.draws.push({
              time: now,
              target
            });

            return origDraw.apply(this, args);
          };
        }
      `
    });

    console.log('Simulating 3.5-second scroll (3500px)...');
    for (let s = 100; s <= 3500; s += 100) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(100);
    }
    await sleep(800);

    const forwardStats = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const draws = window.__log.draws;
          let maxFreezeMs = 0;
          for (let i = 1; i < draws.length; i++) {
            const gap = draws[i].time - draws[i-1].time;
            if (gap > maxFreezeMs) maxFreezeMs = gap;
          }
          return {
            totalDraws: draws.length,
            maxFreezeMs: maxFreezeMs.toFixed(1),
            effectiveFps: (draws.length / 3.5).toFixed(1),
            firstDrawTarget: draws[0] ? draws[0].target : 0,
            lastDrawTarget: draws[draws.length - 1] ? draws[draws.length - 1].target : 0
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Forward Scroll Results:');
    console.log(forwardStats.result.value);

    // Now test direction reversal: Zigzag scrolling test
    console.log('Testing rapid direction reversal (Zigzag: 3400 -> 1500 -> 2500 -> 500 -> 1800)...');
    const waypoints = [1500, 2500, 500, 1800];
    for (const wp of waypoints) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${wp});` });
      await sleep(300);
    }
    await sleep(500);

    const totalZigzagDraws = await send('Runtime.evaluate', {
      expression: `window.__log.draws.length`,
      returnByValue: true
    });
    console.log(`Total draws after zigzag test: ${totalZigzagDraws.result.value}`);

    ws.close();
  } finally {
    chrome.kill();
  }
}

async function main() {
  // Test 1: Fast 4G / 10 Mbps (60ms latency, ~10 Mbps down)
  await runBenchmark('10 Mbps Fast 4G WAN Simulation', {
    latency: 60,
    downloadThroughput: 10 * 1024 * 1024 / 8,
    uploadThroughput: 3 * 1024 * 1024 / 8
  });

  await sleep(2500);

  // Test 2: Constrained 5 Mbps WAN Simulation (80ms latency, ~5 Mbps down)
  await runBenchmark('5 Mbps Constrained WAN Simulation', {
    latency: 80,
    downloadThroughput: 5 * 1024 * 1024 / 8,
    uploadThroughput: 1.5 * 1024 * 1024 / 8
  });

  await sleep(2500);

  // Test 3: Heavy Constrained 3 Mbps WAN Simulation (120ms latency, ~3 Mbps down)
  await runBenchmark('3 Mbps Heavy Constrained Simulation', {
    latency: 120,
    downloadThroughput: 3 * 1024 * 1024 / 8,
    uploadThroughput: 1 * 1024 * 1024 / 8
  });
}

main().catch(console.error);
