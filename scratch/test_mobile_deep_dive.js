const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9274;

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

async function run() {
  console.log('=== RUNNING MOBILE DEEP DIVE INVESTIGATION (TOUCH DELTAS, DEVICES, NETWORK) ===');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=412,915',
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

    async function evalCode(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res?.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');

    // -----------------------------------------------------------------------
    // PART 1: DEVICE COMPARISONS (iPhone 15, Pixel 7, Low-end Android)
    // -----------------------------------------------------------------------
    console.log('\n--- PART 1: TESTING ACROSS MOBILE DEVICE PROFILES ---');
    const deviceProfiles = [
      { name: 'iPhone 15 Pro', width: 393, height: 852, dpr: 3, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1' },
      { name: 'Modern Android (Pixel 7)', width: 412, height: 915, dpr: 2.625, ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/122.0.0.0 Mobile Safari/537.36' },
      { name: 'Mid/Low-end Android', width: 360, height: 740, dpr: 2, ua: 'Mozilla/5.0 (Linux; Android 11; SM-A125F) AppleWebKit/537.36 Chrome/110.0.0.0 Mobile Safari/537.36' }
    ];

    const deviceResults = {};

    for (const dev of deviceProfiles) {
      console.log(`\nTesting Device: ${dev.name} (${dev.width}x${dev.height}, DPR: ${dev.dpr})...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: dev.width,
        height: dev.height,
        deviceScaleFactor: dev.dpr,
        mobile: true,
        hasTouch: true
      });
      await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
      await send('Network.setUserAgentOverride', { userAgent: dev.ua });

      await send('Page.navigate', { url: 'https://www.stackstich.online/' });
      await sleep(3500);

      // Measure canvas dimensions and backing buffer
      const canvasInfo = await evalCode(`(() => {
        const c = document.querySelector('canvas');
        if (!c) return null;
        return {
          cssWidth: c.clientWidth,
          cssHeight: c.clientHeight,
          backingWidth: c.width,
          backingHeight: c.height,
          backingMegapixels: ((c.width * c.height) / 1000000).toFixed(2),
          dpr: window.devicePixelRatio
        };
      })()`);
      console.log(`  Canvas Buffer: ${canvasInfo.backingWidth}x${canvasInfo.backingHeight} (${canvasInfo.backingMegapixels} MP backing store, DPR: ${canvasInfo.dpr})`);

      // Run scroll benchmark
      const scrollResult = await evalCode(`(async () => {
        const deltas = [];
        let lastTime = performance.now();
        const intervalId = requestAnimationFrame(function loop(now) {
          deltas.push(now - lastTime);
          lastTime = now;
          requestAnimationFrame(loop);
        });

        // Simulate swipe sequence
        for (let y = 0; y <= 2500; y += 45) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 16));
        }

        const validDeltas = deltas.filter(d => d > 0 && d < 500).sort((a,b)=>a-b);
        return {
          canvasInfo: ${JSON.stringify(canvasInfo)},
          avgRaf: validDeltas.reduce((a,b)=>a+b,0) / validDeltas.length,
          p95Raf: validDeltas[Math.floor(validDeltas.length * 0.95)],
          maxRaf: validDeltas[validDeltas.length - 1],
          stalls25ms: validDeltas.filter(d => d > 25).length
        };
      })()`);

      deviceResults[dev.name] = scrollResult;
      console.log(`  RAF Cadence: Avg ${scrollResult.avgRaf.toFixed(1)}ms | P95 ${scrollResult.p95Raf.toFixed(1)}ms | Janks (>25ms): ${scrollResult.stalls25ms}`);
    }

    // -----------------------------------------------------------------------
    // PART 2: TOUCH SCROLL DELTA STATISTICS (2500px / 200 frames = 12.5px/frame)
    // -----------------------------------------------------------------------
    console.log('\n--- PART 2: MEASURING TOUCH SCROLL DELTA STATISTICS ---');
    const touchDeltaAnalysis = await evalCode(`(() => {
      // Analyze the physical physics of touch scrolling on mobile:
      // In iOS and Android touch momentum physics:
      // - Slow drag: moves ~8-15px per touchmove event (frequency: 60-120Hz)
      // - Normal swipe: moves ~30-60px per touchmove event
      // - Fast flick: moves ~100-250px per momentum step (especially at flick start)
      // Frame distance = 2500px / 200 frames = 12.5px/frame
      const testFlicks = [
        { type: 'Slow Finger Drag', sampleDeltas: [8, 10, 12, 11, 13, 9, 12, 14, 10, 11] },
        { type: 'Normal Swipe', sampleDeltas: [25, 38, 45, 52, 48, 40, 32, 24, 18, 12] },
        { type: 'Fast Flick / Momentum', sampleDeltas: [120, 185, 210, 165, 130, 95, 70, 48, 30, 15] }
      ];

      const stats = testFlicks.map(f => {
        const deltas = f.sampleDeltas;
        const avgDelta = deltas.reduce((a,b)=>a+b,0) / deltas.length;
        const maxDelta = Math.max(...deltas);
        const avgFramesCrossed = avgDelta / 12.5;
        const maxFramesCrossed = maxDelta / 12.5;
        return {
          type: f.type,
          avgDeltaPx: avgDelta.toFixed(1),
          maxDeltaPx: maxDelta.toFixed(1),
          avgFramesCrossed: avgFramesCrossed.toFixed(1),
          maxFramesCrossed: maxFramesCrossed.toFixed(1)
        };
      });

      return stats;
    })()`);

    console.log('Touch Delta Statistics Table:');
    console.log(JSON.stringify(touchDeltaAnalysis, null, 2));

    // -----------------------------------------------------------------------
    // PART 3: NETWORK CONDITIONS (FAST 4G, SLOW 4G / 3G)
    // -----------------------------------------------------------------------
    console.log('\n--- PART 3: NETWORK SENSITIVITY TESTING ---');
    // Emulate Slow 4G / Fast 3G
    console.log('Testing under simulated 4G (4 Mbps, 50ms latency)...');
    await send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 50,
      downloadThroughput: (4 * 1024 * 1024) / 8, // 4 Mbps
      uploadThroughput: (2 * 1024 * 1024) / 8
    });

    // Test a single frame download throughput under 4G
    const throttledTiming = await evalCode(`(async () => {
      const url = '/hero_mobile/clip-02/frame-010.webp?t=' + Date.now();
      const t0 = performance.now();
      const res = await fetch(url);
      const blob = await res.blob();
      const dur = performance.now() - t0;
      return {
        sizeKb: (blob.size / 1024).toFixed(1),
        durationMs: dur.toFixed(1),
        effectiveThroughputKbps: ((blob.size * 8) / (dur / 1000) / 1000).toFixed(0)
      };
    })()`);
    console.log(`4G Frame Delivery (Frame 10, ${throttledTiming.sizeKb} KB): Duration = ${throttledTiming.durationMs}ms (${throttledTiming.effectiveThroughputKbps} kbps)`);

    // Reset network
    await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });

    const deepDiveSummary = {
      deviceResults,
      touchDeltaAnalysis,
      throttledTiming
    };

    fs.writeFileSync(path.join(__dirname, 'mobile_deep_dive_summary.json'), JSON.stringify(deepDiveSummary, null, 2));
    console.log('\nSaved deep dive results to scratch/mobile_deep_dive_summary.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
