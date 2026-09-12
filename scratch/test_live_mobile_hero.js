const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9272;

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

// Telemetry injection script specifically designed for Mobile Hero
const INJECTION = `
(() => {
  window.__mobileTelemetry = {
    draws: [],
    fetches: {},
    rafs: [],
    touchEvents: [],
    scrollEvents: [],
    isRecording: false
  };

  // 1. Hook Canvas drawImage
  const origDraw = CanvasRenderingContext2D.prototype.drawImage;
  let lastDrawTime = performance.now();

  CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    const now = performance.now();
    const res = origDraw.apply(this, args);
    const dur = performance.now() - now;

    if (window.__mobileTelemetry.isRecording) {
      const delta = now - lastDrawTime;
      lastDrawTime = now;

      let frameIdx = -1;
      if (window.__heroMobileCache) {
        frameIdx = window.__heroMobileCache.indexOf(args[0]);
      }

      window.__mobileTelemetry.draws.push({
        time: now,
        delta,
        dur,
        frameIdx,
        scrollY: window.scrollY
      });
    }
    return res;
  };

  // 2. Resource timing observer for /hero_mobile/ fetches
  const resObs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('/hero_mobile/')) {
        window.__mobileTelemetry.fetches[entry.name] = {
          url: entry.name,
          duration: entry.duration,
          transferSize: entry.transferSize,
          decodedBodySize: entry.decodedBodySize,
          startTime: entry.startTime,
          responseStart: entry.responseStart,
          responseEnd: entry.responseEnd,
          ttfb: entry.responseStart - entry.startTime,
          downloadTime: entry.responseEnd - entry.responseStart
        };
      }
    }
  });
  resObs.observe({ type: 'resource', buffered: true });

  // 3. RAF loop to track paint cadence, target frame vs rendered frame
  let lastRaf = performance.now();
  function rafLoop(now) {
    const delta = now - lastRaf;
    lastRaf = now;

    if (window.__mobileTelemetry.isRecording) {
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      const progress = heroST ? heroST.progress : Math.max(0, Math.min(1, window.scrollY / 2500));
      const targetFrame = Math.min(199, Math.floor(progress * (200 - 0.001)));

      let readyCount = 0;
      let loadingCount = 0;
      let unreqCount = 0;
      const status = window.__heroMobileStatus;
      if (status) {
        for (let i = 0; i < 200; i++) {
          if (status[i] === 2) readyCount++;
          else if (status[i] === 1) loadingCount++;
          else if (status[i] === 0) unreqCount++;
        }
      }

      window.__mobileTelemetry.rafs.push({
        time: now,
        delta,
        scrollY: window.scrollY,
        progress,
        targetFrame,
        renderedFrame: window.__heroMobileLastRendered != null ? window.__heroMobileLastRendered : -1,
        readyCount,
        loadingCount,
        unreqCount
      });
    }
    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);

  // 4. Scroll and Touch event tracking
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

async function run() {
  console.log('=== STARTING LIVE MOBILE HERO PERFORMANCE INVESTIGATION ===');
  console.log('Target: https://www.stackstich.online/');

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844',
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

    // Emulate iPhone 14 / modern iOS mobile device
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

    console.log('Navigating to live production site in mobile viewport...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Expose React fiber state for Mobile Hero
    await evalCode(`(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
      if (fiberKey) {
        let fiber = canvas[fiberKey];
        while (fiber) {
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

      if (window.__heroMobileCache) {
        const origDraw = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function(img, ...rest) {
          if (window.__heroMobileCache) {
            const idx = window.__heroMobileCache.indexOf(img);
            if (idx !== -1) window.__heroMobileLastRendered = idx;
          }
          return origDraw.apply(this, [img, ...rest]);
        };
      }
    })()`);

    const hasStatus = await evalCode('!!window.__heroMobileStatus');
    const hasCache = await evalCode('!!window.__heroMobileCache');
    const isMobileMode = await evalCode('window.innerWidth < 768');
    const canvasDims = await evalCode('(() => { const c = document.querySelector("canvas"); return c ? { w: c.width, h: c.height, cssW: c.clientWidth, cssH: c.clientHeight, dpr: window.devicePixelRatio } : null; })()');
    console.log('Mobile Hook Attached:', hasStatus, 'isMobileMode:', isMobileMode, 'Canvas:', canvasDims);

    // SECTION 1 & 2: REPRODUCE MOBILE TOUCH SCROLLING (10 TRIALS)
    // Trials:
    // 1. Slow touch drag (12px per step)
    // 2. Normal touch scroll (30px per step)
    // 3. Fast swipe (75px per step)
    // 4. Long flick (150px per step)
    // 5. Rapid continuous swipes (80px per step)
    // 6. Direction reversal (forward then backward)
    // 7. Clip 1 only (0 -> 1250px)
    // 8. Clip 2 only (1250 -> 2500px)
    // 9. Boundary transition 99->100 (1100 -> 1400px)
    // 10. Full top-to-bottom run (0 -> 2500px)
    console.log('\n--- RUNNING 10 LIVE MOBILE SCROLLING TRIALS ---');
    const trials = [];

    const trialConfigs = [
      { id: 1, mode: 'slow', startY: 0, endY: 1250, step: 12, delay: 20 },
      { id: 2, mode: 'normal', startY: 0, endY: 2500, step: 35, delay: 16 },
      { id: 3, mode: 'fast_swipe', startY: 0, endY: 2500, step: 75, delay: 16 },
      { id: 4, mode: 'long_flick', startY: 0, endY: 2500, step: 150, delay: 16 },
      { id: 5, mode: 'rapid_swipes', startY: 0, endY: 2500, step: 90, delay: 12 },
      { id: 6, mode: 'reverse', startY: 2500, endY: 0, step: -40, delay: 16 },
      { id: 7, mode: 'clip1_only', startY: 0, endY: 1250, step: 30, delay: 16 },
      { id: 8, mode: 'clip2_only', startY: 1250, endY: 2500, step: 30, delay: 16 },
      { id: 9, mode: 'boundary_transition', startY: 1100, endY: 1400, step: 15, delay: 16 },
      { id: 10, mode: 'full_run', startY: 0, endY: 2500, step: 40, delay: 16 }
    ];

    for (const cfg of trialConfigs) {
      await evalCode(`window.scrollTo({ top: ${cfg.startY}, behavior: 'instant' })`);
      await sleep(200);

      await evalCode(`
        window.__mobileTelemetry.isRecording = true;
        window.__mobileTelemetry.draws = [];
        window.__mobileTelemetry.rafs = [];
        window.__mobileTelemetry.scrollEvents = [];
      `);

      let y = cfg.startY;
      if (cfg.step > 0) {
        while (y < cfg.endY) {
          y = Math.min(cfg.endY, y + cfg.step);
          await evalCode(`window.scrollTo(0, ${y})`);
          await sleep(cfg.delay);
        }
      } else {
        while (y > cfg.endY) {
          y = Math.max(cfg.endY, y + cfg.step);
          await evalCode(`window.scrollTo(0, ${y})`);
          await sleep(cfg.delay);
        }
      }

      await sleep(250);
      await evalCode('window.__mobileTelemetry.isRecording = false;');

      const data = await evalCode(`(() => {
        const rafs = window.__mobileTelemetry.rafs;
        const draws = window.__mobileTelemetry.draws;
        const scrolls = window.__mobileTelemetry.scrollEvents;

        const uniqueFrames = new Set(draws.map(d => d.frameIdx).filter(f => f >= 0));
        const intervals = rafs.map(r => r.delta).filter(d => d > 0 && d < 1000).sort((a,b)=>a-b);
        const lags = rafs.map(r => Math.abs(r.targetFrame - (r.renderedFrame >= 0 ? r.renderedFrame : r.targetFrame))).sort((a,b)=>a-b);

        // Scroll delta per scroll event
        const scrollDeltas = [];
        for (let i = 1; i < scrolls.length; i++) {
          scrollDeltas.push(Math.abs(scrolls[i].scrollY - scrolls[i-1].scrollY));
        }
        scrollDeltas.sort((a,b)=>a-b);

        const totalDur = rafs.length > 1 ? (rafs[rafs.length-1].time - rafs[0].time) : 1;
        const deliveredFps = (uniqueFrames.size / (totalDur / 1000));

        // Draw times
        const drawDurs = draws.map(d => d.dur).sort((a,b)=>a-b);

        return {
          deliveredFps,
          uniqueFrames: uniqueFrames.size,
          totalDraws: draws.length,
          avgIntervalMs: intervals.length ? intervals.reduce((a,b)=>a+b,0)/intervals.length : 0,
          p95IntervalMs: intervals.length ? intervals[Math.floor(intervals.length*0.95)] : 0,
          maxIntervalMs: intervals.length ? intervals[intervals.length-1] : 0,
          stalls40ms: intervals.filter(d => d > 40).length,
          stalls100ms: intervals.filter(d => d > 100).length,
          avgLagFrames: lags.length ? lags.reduce((a,b)=>a+b,0)/lags.length : 0,
          p95LagFrames: lags.length ? lags[Math.floor(lags.length*0.95)] : 0,
          maxLagFrames: lags.length ? lags[lags.length-1] : 0,
          avgDrawMs: drawDurs.length ? drawDurs.reduce((a,b)=>a+b,0)/drawDurs.length : 0,
          p95DrawMs: drawDurs.length ? drawDurs[Math.floor(drawDurs.length*0.95)] : 0,
          maxDrawMs: drawDurs.length ? drawDurs[drawDurs.length-1] : 0,
          avgScrollDelta: scrollDeltas.length ? scrollDeltas.reduce((a,b)=>a+b,0)/scrollDeltas.length : 0,
          p95ScrollDelta: scrollDeltas.length ? scrollDeltas[Math.floor(scrollDeltas.length*0.95)] : 0,
          maxScrollDelta: scrollDeltas.length ? scrollDeltas[scrollDeltas.length-1] : 0,
          scrollEventCount: scrolls.length
        };
      })()`);

      trials.push({ cfg, data });
      console.log(`Trial ${cfg.id} (${cfg.mode}): FPS = ${data.deliveredFps.toFixed(1)} | P95 Interval = ${data.p95IntervalMs.toFixed(1)}ms (Max: ${data.maxIntervalMs.toFixed(1)}ms) | Stalls >40ms: ${data.stalls40ms}, >100ms: ${data.stalls100ms} | Avg Lag = ${data.avgLagFrames.toFixed(1)} frames (Max: ${data.maxLagFrames})`);
    }

    // SECTION 3 & 4: MEASURE LIVE FETCH & DECODE TIMINGS FOR ALL 200 MOBILE FRAMES
    console.log('\n--- MEASURING LIVE FETCH & DECODE TIMINGS FOR ALL 200 MOBILE FRAMES ---');
    const microBenchmark = await evalCode(`(async () => {
      const results = {
        clip1: { fetchMs: [], decodeMs: [], drawMs: [], sizes: [] },
        clip2: { fetchMs: [], decodeMs: [], drawMs: [], sizes: [] },
        heaviestFrames: []
      };

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d', { alpha: false });

      for (let i = 0; i < 200; i++) {
        const clipIdx = Math.floor(i / 100) + 1;
        const frameIdx = (i % 100) + 1;
        const clipStr = 'clip-' + clipIdx.toString().padStart(2, '0');
        const frameStr = 'frame-' + frameIdx.toString().padStart(3, '0') + '.webp';
        const url = '/hero_mobile/' + clipStr + '/' + frameStr;

        const t0 = performance.now();
        const res = await fetch(url);
        const blob = await res.blob();
        const fetchDur = performance.now() - t0;

        const t1 = performance.now();
        const bitmap = await createImageBitmap(blob);
        const decodeDur = performance.now() - t1;

        const t2 = performance.now();
        ctx.drawImage(bitmap, 0, 0);
        const drawDur = performance.now() - t2;

        bitmap.close();

        const fData = {
          globalIndex: i,
          clipIdx,
          frameIdx,
          filename: frameStr,
          sizeKb: blob.size / 1024,
          fetchDur,
          decodeDur,
          drawDur,
          totalTurnaround: fetchDur + decodeDur + drawDur
        };

        const targetClip = clipIdx === 1 ? results.clip1 : results.clip2;
        targetClip.fetchMs.push(fetchDur);
        targetClip.decodeMs.push(decodeDur);
        targetClip.drawMs.push(drawDur);
        targetClip.sizes.push(fData.sizeKb);

        // Track frames in Clip 2 010-045 and heavy frames
        if (clipIdx === 2 && frameIdx >= 10 && frameIdx <= 45) {
          results.heaviestFrames.push(fData);
        }
      }

      function stats(arr) {
        const sorted = [...arr].sort((a,b)=>a-b);
        return {
          avg: sorted.reduce((a,b)=>a+b,0) / sorted.length,
          median: sorted[Math.floor(sorted.length * 0.5)],
          p95: sorted[Math.floor(sorted.length * 0.95)],
          max: sorted[sorted.length - 1],
          min: sorted[0]
        };
      }

      return {
        clip1: {
          fetch: stats(results.clip1.fetchMs),
          decode: stats(results.clip1.decodeMs),
          draw: stats(results.clip1.drawMs),
          size: stats(results.clip1.sizes)
        },
        clip2: {
          fetch: stats(results.clip2.fetchMs),
          decode: stats(results.clip2.decodeMs),
          draw: stats(results.clip2.drawMs),
          size: stats(results.clip2.sizes)
        },
        heaviestFrames: results.heaviestFrames
      };
    })()`);

    console.log('Mobile Micro-Benchmark Summary:');
    console.log('Clip 1:', JSON.stringify(microBenchmark.clip1, null, 2));
    console.log('Clip 2:', JSON.stringify(microBenchmark.clip2, null, 2));

    // SECTION 5: COLD VS WARM COMPARISON ON MOBILE
    console.log('\n--- SECTION 5: COLD VS WARM MOBILE SCROLL COMPARISON ---');
    
    // Test Cold Mobile Scroll
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(3500);

    // Reattach hooks
    await evalCode(`(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
      if (fiberKey) {
        let fiber = canvas[fiberKey];
        while (fiber) {
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

      if (window.__heroMobileCache) {
        const origDraw = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function(img, ...rest) {
          if (window.__heroMobileCache) {
            const idx = window.__heroMobileCache.indexOf(img);
            if (idx !== -1) window.__heroMobileLastRendered = idx;
          }
          return origDraw.apply(this, [img, ...rest]);
        };
      }
    })()`);

    // Run COLD test
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
    console.log(`  FPS: ${coldMetrics.fps.toFixed(1)} | Unique: ${coldMetrics.uniqueFrames}/200 | P95 Interval: ${coldMetrics.p95IntervalMs.toFixed(1)}ms | Stalls >40ms: ${coldMetrics.stalls40ms}, >100ms: ${coldMetrics.stalls100ms} | Avg Lag: ${coldMetrics.avgLag.toFixed(1)} frames`);

    // Prewarm ALL 200 mobile frames
    console.log('\nPrewarming all 200 mobile frames in memory...');
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
                window.__heroMobileStatus[i] = 2; // STATUS_READY
              }
            })
            .catch(e => console.error(e))
        );
      }
      await Promise.all(promises);
    })()`);
    await sleep(2000);

    // Run WARM test
    await evalCode(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await sleep(200);

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
    console.log(`  FPS: ${warmMetrics.fps.toFixed(1)} | Unique: ${warmMetrics.uniqueFrames}/200 | P95 Interval: ${warmMetrics.p95IntervalMs.toFixed(1)}ms | Stalls >40ms: ${warmMetrics.stalls40ms}, >100ms: ${warmMetrics.stalls100ms} | Avg Lag: ${warmMetrics.avgLag.toFixed(1)} frames`);

    // SECTION 11: CLIP BOUNDARY 99 -> 100 TEST
    console.log('\n--- SECTION 11: CLIP BOUNDARY 99 -> 100 TEST ---');
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

    // Compile full mobile report data
    const fullReport = {
      canvasDims,
      trials,
      microBenchmark,
      coldMetrics,
      warmMetrics,
      boundaryCrossings: { avgMaxDelta, totalDrops, boundaryCrossings }
    };

    fs.writeFileSync(path.join(__dirname, 'live_mobile_investigation_results.json'), JSON.stringify(fullReport, null, 2));
    console.log('\nSaved full investigation results to scratch/live_mobile_investigation_results.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
