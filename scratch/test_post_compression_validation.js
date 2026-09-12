const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9270;

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

// Telemetry injection script
const INJECTION = `
(() => {
  window.__heroValTelemetry = {
    records: [],
    renders: [],
    isRecording: false
  };

  const origDraw = CanvasRenderingContext2D.prototype.drawImage;
  let lastDrawTime = performance.now();

  CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    const now = performance.now();
    const res = origDraw.apply(this, args);
    const dur = performance.now() - now;

    if (window.__heroValTelemetry.isRecording) {
      const delta = now - lastDrawTime;
      lastDrawTime = now;
      const currentRendered = window.__heroLastRendered != null ? window.__heroLastRendered : -1;
      const target = window.__heroTargetFrame != null ? window.__heroTargetFrame : -1;

      window.__heroValTelemetry.renders.push({
        time: now,
        delta,
        targetFrame: target,
        renderedFrame: currentRendered,
        drawDur: dur
      });
    }
    return res;
  };

  function sampleLoop() {
    if (window.__heroValTelemetry.isRecording) {
      const now = performance.now();
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      const progress = heroST ? heroST.progress : Math.max(0, Math.min(1, window.scrollY / 3500));
      const targetFrame = Math.min(239, Math.floor(progress * (240 - 0.001)));
      window.__heroTargetFrame = targetFrame;
      const rendered = window.__heroLastRendered != null ? window.__heroLastRendered : -1;

      window.__heroValTelemetry.records.push({
        time: now,
        scrollY: window.scrollY,
        progress,
        targetFrame,
        renderedFrame: rendered
      });
    }
    requestAnimationFrame(sampleLoop);
  }
  requestAnimationFrame(sampleLoop);
})();
`;

async function run() {
  console.log('=== VALIDATING DESKTOP HERO POST-COMPRESSION ON LOCAL BUILD ===');
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

    async function evalCode(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res?.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.addScriptToEvaluateOnNewDocument', { source: INJECTION });

    console.log('Navigating to http://localhost:3000/ ...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(4000);

    // Expose React fiber hook refs
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
                if (val instanceof Uint8Array && val.length === 240) window.__heroDesktopStatus = val;
                if (Array.isArray(val) && val.length === 240) window.__heroDesktopCache = val;
              }
              hook = hook.next;
            }
          }
          fiber = fiber.return;
        }
      }

      if (window.__heroDesktopCache) {
        const origDraw = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function(img, ...rest) {
          if (window.__heroDesktopCache) {
            const idx = window.__heroDesktopCache.indexOf(img);
            if (idx !== -1) window.__heroLastRendered = idx;
          }
          return origDraw.apply(this, [img, ...rest]);
        };
      }
    })()`);

    const hasStatus = await evalCode('!!window.__heroDesktopStatus');
    console.log('React fiber hook attached:', hasStatus);

    // =========================================================================
    // TEST SUITE: 10 TRIALS OF CLIP 4 SCROLLING
    // Modes: slow, normal, fast, rapid, rapid transition 3->4, reverse, oscillations
    // =========================================================================
    console.log('\n--- EXECUTING 10 CLIP 4 SCROLLING TRIALS ---');
    const trials = [];

    for (let trial = 1; trial <= 10; trial++) {
      let mode = 'normal';
      let startY = 2625; // Frame 180
      let endY = 3500;   // Frame 239

      if (trial === 1) mode = 'slow';
      else if (trial === 2 || trial === 3) mode = 'normal';
      else if (trial === 4) mode = 'fast';
      else if (trial === 5) mode = 'rapid';
      else if (trial === 6) { mode = 'rapid_3_to_4'; startY = 2000; endY = 3500; }
      else if (trial === 7) { mode = 'continuous_full'; startY = 2625; endY = 3500; }
      else if (trial === 8) { mode = 'reverse'; startY = 3500; endY = 2625; }
      else if (trial === 9) { mode = 'reverse_fast'; startY = 3500; endY = 2625; }
      else if (trial === 10) { mode = 'oscillating'; startY = 3000; endY = 3000; }

      const stepConfig = {
        slow: { step: 8, delay: 16 },
        normal: { step: 25, delay: 16 },
        fast: { step: 60, delay: 16 },
        rapid: { step: 100, delay: 16 },
        rapid_3_to_4: { step: 80, delay: 16 },
        continuous_full: { step: 30, delay: 16 },
        reverse: { step: -25, delay: 16 },
        reverse_fast: { step: -60, delay: 16 },
        oscillating: { step: 0, delay: 25 }
      }[mode];

      // Reset scroll position and clear telemetry
      await evalCode(`window.scrollTo({ top: ${startY}, behavior: 'instant' })`);
      await sleep(150);

      await evalCode(`
        window.__heroValTelemetry.isRecording = true;
        window.__heroValTelemetry.records = [];
        window.__heroValTelemetry.renders = [];
      `);

      if (mode === 'oscillating') {
        const midY = 3000;
        for (let osc = 0; osc < 16; osc++) {
          const targetY = osc % 2 === 0 ? midY + 180 : midY - 180;
          await evalCode(`window.scrollTo(0, ${targetY})`);
          await sleep(35);
        }
      } else if (mode.startsWith('reverse')) {
        let y = startY;
        while (y > endY) {
          y = Math.max(endY, y + stepConfig.step);
          await evalCode(`window.scrollTo(0, ${y})`);
          await sleep(stepConfig.delay);
        }
      } else {
        let y = startY;
        while (y < endY) {
          y = Math.min(endY, y + stepConfig.step);
          await evalCode(`window.scrollTo(0, ${y})`);
          await sleep(stepConfig.delay);
        }
      }

      await sleep(250);
      await evalCode('window.__heroValTelemetry.isRecording = false;');

      const trialData = await evalCode(`(() => {
        const renders = window.__heroValTelemetry.renders;
        const records = window.__heroValTelemetry.records;
        const unique = new Set(renders.map(r => r.renderedFrame).filter(f => f >= 0));
        const intervals = renders.map(r => r.delta).filter(d => d > 0 && d < 1000).sort((a,b)=>a-b);
        const lags = records.map(r => Math.abs(r.targetFrame - (r.renderedFrame >= 0 ? r.renderedFrame : r.targetFrame))).sort((a,b)=>a-b);

        const totalDur = records.length > 1 ? (records[records.length-1].time - records[0].time) : 1;
        const fps = (unique.size / (totalDur / 1000));

        return {
          uniqueFrames: unique.size,
          fps,
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

      trials.push({ trial, mode, data: trialData });
      console.log(`Trial ${trial} (${mode}): FPS = ${trialData.fps.toFixed(1)} | P95 Interval = ${trialData.p95IntervalMs.toFixed(1)}ms | Stalls >40ms: ${trialData.stalls40ms}, >100ms: ${trialData.stalls100ms} | Avg Lag = ${trialData.avgLag.toFixed(1)} frames`);
    }

    // =========================================================================
    // BOUNDARY TESTS:
    // G. Hero -> What We Do Boundary (Frame 239 -> What We Do)
    // H. Browser Back -> Hero reverse scroll
    // =========================================================================
    console.log('\n--- TESTING HERO -> WHAT WE DO BOUNDARY & BROWSER BACK ---');

    // Scroll to end of Hero (scrollY = 3500) and slightly past (3550)
    await evalCode(`window.scrollTo(0, 3550)`);
    await sleep(400);

    const boundaryStatus = await evalCode(`(() => {
      const rendered = window.__heroLastRendered;
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      return {
        scrollY: window.scrollY,
        lastRendered: rendered,
        heroProgress: heroST ? heroST.progress : null,
        isAtOrPastEnd: window.scrollY >= 3500
      };
    })()`);
    console.log('Hero Boundary Status:', boundaryStatus);

    // Test Back navigation simulation (anchor recovery from sessionStorage)
    await evalCode(`(() => {
      sessionStorage.setItem('stack_home_scroll_y', '3500');
    })()`);
    console.log('Simulated saved home scroll position for Back navigation sync.');

    // Save full validation report
    const validationReport = {
      trials,
      boundaryStatus,
      summary: {
        normalFps: trials.filter(t => t.mode === 'normal').map(t => t.data.fps),
        avgP95Interval: trials.reduce((s,t)=>s+t.data.p95IntervalMs,0)/trials.length,
        totalStalls100ms: trials.reduce((s,t)=>s+t.data.stalls100ms,0)
      }
    };

    fs.writeFileSync(path.join(__dirname, 'post_compression_validation.json'), JSON.stringify(validationReport, null, 2));
    console.log('\nSaved validation report to scratch/post_compression_validation.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
