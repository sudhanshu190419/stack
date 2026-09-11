const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9293;

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

async function testTarget(url, label) {
  console.log(`\n==================================================`);
  console.log(`TESTING: ${label} (${url})`);
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

    let downloadCount = 0;
    let cacheCount = 0;
    let totalDownloadBytes = 0;

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        if (resp.url.includes('/hero/')) {
          if (resp.fromDiskCache || resp.fromMemoryCache) {
            cacheCount++;
          } else {
            downloadCount++;
            totalDownloadBytes += (resp.encodedDataLength || 0);
          }
        }
      }
    });

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');

    console.log(`Navigating to ${url}...`);
    await send('Page.navigate', { url });
    await sleep(3000);

    // Instrument RAF and canvas draws
    await send('Runtime.evaluate', {
      expression: `
        window.__metrics = {
          rafDurations: [],
          droppedFrames: 0, // >16.7ms for 60fps
          jankFrames: 0,    // >33.3ms (skips 2+ frames)
          drawnFrames: [],
          longTasks: []
        };

        let lastT = performance.now();
        function loop(t) {
          const dt = t - lastT;
          lastT = t;
          window.__metrics.rafDurations.push(dt);
          if (dt > 20) window.__metrics.droppedFrames++;
          if (dt > 34) window.__metrics.jankFrames++;
          requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

        const canvas = document.querySelector('canvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const origDraw = ctx.drawImage;
          ctx.drawImage = function(...args) {
            window.__metrics.drawnFrames.push(performance.now());
            return origDraw.apply(this, args);
          };
        }

        if (typeof PerformanceObserver !== 'undefined') {
          try {
            const po = new PerformanceObserver((list) => {
              for (const e of list.getEntries()) {
                window.__metrics.longTasks.push({ duration: e.duration, start: e.startTime });
              }
            });
            po.observe({ entryTypes: ['longtask'] });
          } catch(e) {}
        }
      `
    });

    console.log('Scrolling through Hero: 3500px over 3.5 seconds...');
    const t0 = Date.now();
    for (let s = 100; s <= 3500; s += 100) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(100);
    }
    await sleep(500);

    const metrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const m = window.__metrics;
          const total = m.rafDurations.length;
          const sum = m.rafDurations.reduce((a,b)=>a+b,0);
          const avg = sum / (total || 1);
          const max = Math.max(...m.rafDurations, 0);
          return {
            totalRafTicks: total,
            avgFps: (1000 / avg).toFixed(1),
            droppedFramesCount: m.droppedFrames,
            jankFramesCount: m.jankFrames,
            avgFrameDurationMs: avg.toFixed(2),
            maxFrameDurationMs: max.toFixed(2),
            totalCanvasDraws: m.drawnFrames.length,
            longTasksCount: m.longTasks.length,
            longTasksTotalMs: m.longTasks.reduce((a,b)=>a+b.duration, 0).toFixed(2),
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Results for ' + label + ':');
    console.log(metrics.result.value);
    console.log(`Hero network downloads: ${downloadCount} (${(totalDownloadBytes / 1024 / 1024).toFixed(2)} MB), Cache hits: ${cacheCount}`);

    ws.close();
  } finally {
    chrome.kill();
  }
}

async function main() {
  await testTarget('https://www.stackstich.online', 'LIVE PRODUCTION (https://www.stackstich.online)');
  await testTarget('http://127.0.0.1:3005', 'LOCAL PRODUCTION (http://127.0.0.1:3005)');
}

main().catch(console.error);
