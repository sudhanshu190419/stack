const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9276;

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

const INJECTION = `
(() => {
  window.__mobileTelemetry = {
    draws: [],
    fetches: {},
    rafs: [],
    scrollEvents: [],
    isRecording: false
  };

  const origDraw = CanvasRenderingContext2D.prototype.drawImage;
  let lastDrawTime = performance.now();

  CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    const now = performance.now();
    const res = origDraw.apply(this, args);
    const dur = performance.now() - now;

    if (window.__mobileTelemetry.isRecording) {
      const delta = now - lastDrawTime;
      lastDrawTime = now;

      const rendered = window.__heroHandle ? window.__heroHandle.getLastRenderedFrame() : (window.__heroMobileLastRendered != null ? window.__heroMobileLastRendered : -1);

      window.__mobileTelemetry.draws.push({
        time: now,
        delta,
        dur,
        frameIdx: rendered,
        scrollY: window.scrollY
      });
    }
    return res;
  };

  let lastRaf = performance.now();
  function rafLoop(now) {
    const delta = now - lastRaf;
    lastRaf = now;

    if (window.__mobileTelemetry.isRecording) {
      const targetFrame = window.__heroHandle ? window.__heroHandle.getCurrentFrame() : Math.min(199, Math.floor((window.scrollY / 2500) * 200));
      const renderedFrame = window.__heroHandle ? window.__heroHandle.getLastRenderedFrame() : (window.__heroMobileLastRendered != null ? window.__heroMobileLastRendered : -1);

      window.__mobileTelemetry.rafs.push({
        time: now,
        delta,
        scrollY: window.scrollY,
        targetFrame,
        renderedFrame
      });
    }
    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);

  window.addEventListener('scroll', () => {
    if (window.__mobileTelemetry.isRecording) {
      window.__mobileTelemetry.scrollEvents.push({
        time: performance.now(),
        scrollY: window.scrollY
      });
    }
  }, { passive: true });
})();
`;

async function validateLocalAssets() {
  console.log('=== STEP 1: ASSET VALIDATION ACROSS ALL 200 MOBILE FRAMES ===');
  let errors = 0;
  let totalBytes = 0;
  const clip1Stats = { sizes: [], dims: [] };
  const clip2Stats = { sizes: [], dims: [] };

  for (let c = 1; c <= 2; c++) {
    const clipStr = 'clip-' + c.toString().padStart(2, '0');
    const expectedW = c === 1 ? 926 : 910;
    const expectedH = 1920;

    for (let f = 1; f <= 100; f++) {
      const frameStr = 'frame-' + f.toString().padStart(3, '0') + '.webp';
      const url = `http://127.0.0.1:3000/hero_mobile/${clipStr}/${frameStr}`;
      const filePath = path.join(__dirname, '..', 'public', 'hero_mobile', clipStr, frameStr);

      try {
        const res = await fetch(url);
        if (res.status !== 200) {
          console.error(`ERROR: ${url} returned status ${res.status}`);
          errors++;
          continue;
        }

        const buf = await res.arrayBuffer();
        const size = buf.byteLength;
        totalBytes += size;

        const meta = await sharp(Buffer.from(buf)).metadata();
        if (meta.width !== expectedW || meta.height !== expectedH) {
          console.error(`ERROR: ${clipStr}/${frameStr} dimensions mismatch: expected ${expectedW}x${expectedH}, got ${meta.width}x${meta.height}`);
          errors++;
        }

        const targetStats = c === 1 ? clip1Stats : clip2Stats;
        targetStats.sizes.push(size / 1024);
        targetStats.dims.push(`${meta.width}x${meta.height}`);
      } catch (err) {
        console.error(`ERROR fetching ${url}:`, err.message);
        errors++;
      }
    }
  }

  function calcStats(arr) {
    const s = [...arr].sort((a,b)=>a-b);
    return {
      count: s.length,
      totalMb: s.reduce((a,b)=>a+b,0) / 1024,
      avgKb: s.reduce((a,b)=>a+b,0) / s.length,
      medianKb: s[Math.floor(s.length * 0.5)],
      p95Kb: s[Math.floor(s.length * 0.95)],
      maxKb: s[s.length - 1],
      minKb: s[0]
    };
  }

  const c1 = calcStats(clip1Stats.sizes);
  const c2 = calcStats(clip2Stats.sizes);
  const all = calcStats([...clip1Stats.sizes, ...clip2Stats.sizes]);

  console.log(`Validated 200 mobile assets. Errors: ${errors}`);
  console.log(`Clip 1: Count=${c1.count}, Total=${c1.totalMb.toFixed(2)} MB, Avg=${c1.avgKb.toFixed(1)} KB, Max=${c1.maxKb.toFixed(1)} KB, Min=${c1.minKb.toFixed(1)} KB`);
  console.log(`Clip 2: Count=${c2.count}, Total=${c2.totalMb.toFixed(2)} MB, Avg=${c2.avgKb.toFixed(1)} KB, Max=${c2.maxKb.toFixed(1)} KB, Min=${c2.minKb.toFixed(1)} KB`);
  console.log(`Total Mobile: Count=${all.count}, Total=${all.totalMb.toFixed(2)} MB, Avg=${all.avgKb.toFixed(1)} KB, Max=${all.maxKb.toFixed(1)} KB`);

  return { errors, c1, c2, all };
}

async function runPerformanceValidation() {
  console.log('\n=== STEP 2: RUNTIME MOBILE HERO BENCHMARK (LOCAL SERVER) ===');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-extensions',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844',
    'about:blank'
  ]);

  try {
    await sleep(2500);
    const tabs = await getJson('/json');
    const tab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs.find(t => t.type === 'page') || tabs[0];
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
      hasTouch: true
    });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await send('Network.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    });

    await send('Page.addScriptToEvaluateOnNewDocument', { source: INJECTION });

    console.log('Navigating to local server in mobile viewport...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(5500);

    await evalCode(`(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
      if (fiberKey) {
        let fiber = canvas[fiberKey];
        while (fiber) {
          if (fiber.type && fiber.type.name === 'Hero') {
            let h = fiber.memoizedState;
            let idx = 0;
            while (h) {
              if (idx === 2 && h.memoizedState && h.memoizedState.current) {
                window.__heroHandle = h.memoizedState.current;
              }
              h = h.next;
              idx++;
            }
          }
          if (fiber.memoizedState) {
            let hook = fiber.memoizedState;
            while (hook) {
              if (hook.memoizedState && typeof hook.memoizedState === 'object' && 'current' in hook.memoizedState) {
                const val = hook.memoizedState.current;
                if (val instanceof Uint8Array && val.length === 200) window.__heroMobileStatus = val;
                if (Array.isArray(val) && val.length === 200) window.__heroMobileCache = val;
              }
              hook = hook.next;
            }
          }
          fiber = fiber.return;
        }
      }
    })()`);

    const hasHandle = await evalCode('!!window.__heroHandle');
    const hasStatus = await evalCode('!!window.__heroMobileStatus');
    const hasCache = await evalCode('!!window.__heroMobileCache');
    const isMobileMode = await evalCode('window.innerWidth < 768');
    console.log('Hero Handle Attached:', hasHandle, 'Status:', hasStatus, 'Cache:', hasCache, 'isMobileMode:', isMobileMode);

    // TEST 1: COLD SCROLL
    console.log('\n--- EXECUTING COLD MOBILE SCROLL BENCHMARK ---');
    await evalCode(`
      window.__mobileTelemetry.isRecording = true;
      window.__mobileTelemetry.draws = [];
      window.__mobileTelemetry.rafs = [];
    `);

    for (let y = 0; y <= 2500; y += 35) {
      await evalCode(`window.scrollTo(0, ${y})`);
      await sleep(16);
    }
    await sleep(250);
    await evalCode('window.__mobileTelemetry.isRecording = false;');

    const coldMetrics = await evalCode(`(() => {
      const rafs = window.__mobileTelemetry.rafs;
      const draws = window.__mobileTelemetry.draws;
      const unique = new Set(draws.map(d => d.frameIdx).filter(f => f >= 0));
      const intervals = rafs.map(r => r.delta).filter(d => d > 0 && d < 1000).sort((a,b)=>a-b);
      const lags = rafs.map(r => Math.abs(r.targetFrame - (r.renderedFrame >= 0 ? r.renderedFrame : r.targetFrame))).sort((a,b)=>a-b);
      const totalDur = rafs.length > 1 ? (rafs[rafs.length-1].time - rafs[0].time) : 1;

      return {
        fps: (unique.size / (totalDur / 1000)),
        uniqueFrames: unique.size,
        totalDraws: draws.length,
        avgIntervalMs: intervals.length ? intervals.reduce((a,b)=>a+b,0)/intervals.length : 0,
        p95IntervalMs: intervals.length ? intervals[Math.floor(intervals.length*0.95)] : 0,
        maxIntervalMs: intervals.length ? intervals[intervals.length-1] : 0,
        stalls40ms: intervals.filter(d => d > 40).length,
        stalls100ms: intervals.filter(d => d > 100).length,
        avgLag: lags.length ? lags.reduce((a,b)=>a+b,0)/lags.length : 0,
        p95Lag: lags.length ? lags[Math.floor(lags.length*0.95)] : 0,
        maxLag: lags.length ? lags[lags.length-1] : 0
      };
    })()`);

    console.log('COLD Mobile Scroll Result:');
    console.log(`  FPS: ${coldMetrics.fps.toFixed(1)} | Unique: ${coldMetrics.uniqueFrames}/200 | Total Draws: ${coldMetrics.totalDraws}`);
    console.log(`  P95 Interval: ${coldMetrics.p95IntervalMs.toFixed(1)}ms | Max Interval: ${coldMetrics.maxIntervalMs.toFixed(1)}ms`);
    console.log(`  Stalls >40ms: ${coldMetrics.stalls40ms}, >100ms: ${coldMetrics.stalls100ms}`);
    console.log(`  Avg Lag: ${coldMetrics.avgLag.toFixed(1)} frames | Max Lag: ${coldMetrics.maxLag} frames`);

    // TEST 2: WARM SCROLL
    console.log('\n--- EXECUTING WARM MOBILE SCROLL BENCHMARK ---');
    console.log('Prewarming all 200 mobile frames into memory...');
    await evalCode(`(async () => {
      const promises = [];
      for (let i = 0; i < 200; i++) {
        const clipIdx = Math.floor(i / 100) + 1;
        const frameIdx = (i % 100) + 1;
        const clipStr = 'clip-' + clipIdx.toString().padStart(2, '0');
        const frameStr = 'frame-' + frameIdx.toString().padStart(3, '0') + '.webp';
        const url = '/hero_mobile/' + clipStr + '/' + frameStr;

        promises.push(
          fetch(url)
            .then(r => r.blob())
            .then(b => createImageBitmap(b))
            .then(bmp => {
              if (window.__heroMobileCache && window.__heroMobileStatus) {
                window.__heroMobileCache[i] = bmp;
                window.__heroMobileStatus[i] = 2;
              }
            })
            .catch(e => console.error(e))
        );
      }
      await Promise.all(promises);
    })()`);
    await sleep(2000);

    await evalCode(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await sleep(250);

    await evalCode(`
      window.__mobileTelemetry.isRecording = true;
      window.__mobileTelemetry.draws = [];
      window.__mobileTelemetry.rafs = [];
    `);

    for (let y = 0; y <= 2500; y += 35) {
      await evalCode(`window.scrollTo(0, ${y})`);
      await sleep(16);
    }
    await sleep(250);
    await evalCode('window.__mobileTelemetry.isRecording = false;');

    const warmMetrics = await evalCode(`(() => {
      const rafs = window.__mobileTelemetry.rafs;
      const draws = window.__mobileTelemetry.draws;
      const unique = new Set(draws.map(d => d.frameIdx).filter(f => f >= 0));
      const intervals = rafs.map(r => r.delta).filter(d => d > 0 && d < 1000).sort((a,b)=>a-b);
      const lags = rafs.map(r => Math.abs(r.targetFrame - (r.renderedFrame >= 0 ? r.renderedFrame : r.targetFrame))).sort((a,b)=>a-b);
      const totalDur = rafs.length > 1 ? (rafs[rafs.length-1].time - rafs[0].time) : 1;

      return {
        fps: (unique.size / (totalDur / 1000)),
        uniqueFrames: unique.size,
        totalDraws: draws.length,
        avgIntervalMs: intervals.length ? intervals.reduce((a,b)=>a+b,0)/intervals.length : 0,
        p95IntervalMs: intervals.length ? intervals[Math.floor(intervals.length*0.95)] : 0,
        maxIntervalMs: intervals.length ? intervals[intervals.length-1] : 0,
        stalls40ms: intervals.filter(d => d > 40).length,
        stalls100ms: intervals.filter(d => d > 100).length,
        avgLag: lags.length ? lags.reduce((a,b)=>a+b,0)/lags.length : 0,
        p95Lag: lags.length ? lags[Math.floor(lags.length*0.95)] : 0,
        maxLag: lags.length ? lags[lags.length-1] : 0
      };
    })()`);

    console.log('WARM Mobile Scroll Result:');
    console.log(`  FPS: ${warmMetrics.fps.toFixed(1)} | Unique: ${warmMetrics.uniqueFrames}/200 | Total Draws: ${warmMetrics.totalDraws}`);
    console.log(`  P95 Interval: ${warmMetrics.p95IntervalMs.toFixed(1)}ms | Max Interval: ${warmMetrics.maxIntervalMs.toFixed(1)}ms`);
    console.log(`  Stalls >40ms: ${warmMetrics.stalls40ms}, >100ms: ${warmMetrics.stalls100ms}`);
    console.log(`  Avg Lag: ${warmMetrics.avgLag.toFixed(1)} frames | Max Lag: ${warmMetrics.maxLag} frames`);

    // TEST 3: CLIP BOUNDARY 99 -> 100 TEST
    console.log('\n--- EXECUTING CLIP BOUNDARY 99 -> 100 TEST ---');
    const boundaryCrossings = [];
    for (let r = 0; r < 5; r++) {
      await evalCode(`window.scrollTo({ top: 1150, behavior: 'instant' })`);
      await sleep(150);
      await evalCode(`
        window.__mobileTelemetry.isRecording = true;
        window.__mobileTelemetry.draws = [];
        window.__mobileTelemetry.rafs = [];
      `);

      for (let y = 1150; y <= 1350; y += 10) {
        await evalCode(`window.scrollTo(0, ${y})`);
        await sleep(16);
      }
      await sleep(150);
      await evalCode('window.__mobileTelemetry.isRecording = false;');

      const bData = await evalCode(`(() => {
        const deltas = window.__mobileTelemetry.rafs.map(r => r.delta).filter(d => d < 500);
        const maxDelta = Math.max(...deltas, 0);
        const dropped = deltas.filter(d => d > 25).length;
        return { maxDelta, dropped, sampleCount: deltas.length };
      })()`);
      boundaryCrossings.push(bData);
    }
    const avgMaxDelta = boundaryCrossings.reduce((s, c) => s + c.maxDelta, 0) / boundaryCrossings.length;
    const totalDrops = boundaryCrossings.reduce((s, c) => s + c.dropped, 0);
    console.log(`Boundary 99->100: Avg Max Delta = ${avgMaxDelta.toFixed(1)}ms, Drops (>25ms) = ${totalDrops}`);

    ws.close();
    return { coldMetrics, warmMetrics, boundaryCrossings: { avgMaxDelta, totalDrops } };
  } finally {
    chrome.kill();
  }
}

async function main() {
  const assetReport = await validateLocalAssets();
  const perfReport = await runPerformanceValidation();

  const finalOutput = {
    timestamp: new Date().toISOString(),
    assetReport,
    perfReport
  };

  fs.writeFileSync(path.join(__dirname, 'mobile_post_compression_validation.json'), JSON.stringify(finalOutput, null, 2));
  console.log('\nAll validation tests complete. Saved to scratch/mobile_post_compression_validation.json');
}

main().catch(console.error);
