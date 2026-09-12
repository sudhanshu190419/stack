const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9260;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const INJECTION_SCRIPT = `
(() => {
  window.__heroTelemetry = {
    draws: [],
    fetches: {},
    longtasks: [],
    rafs: [],
    scrollEvents: [],
    activeTarget: 0,
    activeFrame: 0
  };

  // 1. Hook drawImage
  const origDrawImage = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    const t0 = performance.now();
    const res = origDrawImage.apply(this, args);
    const dur = performance.now() - t0;
    
    // Check if drawing from an image/bitmap
    const srcObj = args[0];
    let srcName = 'bitmap';
    if (srcObj && srcObj.src) srcName = srcObj.src;
    else if (srcObj && srcObj._framePath) srcName = srcObj._framePath;

    window.__heroTelemetry.draws.push({
      time: t0,
      dur: dur,
      scrollY: window.scrollY,
      src: srcName
    });
    return res;
  };

  // 2. Resource timing observer for frame fetches
  const resObs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('/hero/')) {
        window.__heroTelemetry.fetches[entry.name] = {
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

  // 3. LongTask observer
  const ltObs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__heroTelemetry.longtasks.push({
        startTime: entry.startTime,
        duration: entry.duration,
        name: entry.name
      });
    }
  });
  try { ltObs.observe({ type: 'longtask', buffered: true }); } catch (e) {}

  // 4. RAF frame loop monitoring
  let lastRaf = performance.now();
  function rafLoop(now) {
    const delta = now - lastRaf;
    lastRaf = now;
    window.__heroTelemetry.rafs.push({
      time: now,
      delta: delta,
      scrollY: window.scrollY
    });
    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);
})();
`;

async function main() {
  console.log('=== RUNNING LIVE HERO BENCHMARK (https://www.stackstich.online/) ===');
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
    await send('Page.addScriptToEvaluateOnNewDocument', { source: INJECTION_SCRIPT });

    console.log('Navigating to live production site...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Verify initial load
    const readyState = await evalCode('document.readyState');
    console.log('Document readyState:', readyState);

    // Clear telemetry before test suites
    await evalCode('window.__heroTelemetry.draws = []; window.__heroTelemetry.rafs = [];');

    // TEST 1: Systematic Per-Clip Scrubbing (10 trials each)
    // Clips:
    // Clip 1: frames 0–59   -> scrollY 0 to 875
    // Clip 2: frames 60–119  -> scrollY 875 to 1750
    // Clip 3: frames 120–179 -> scrollY 1750 to 2625
    // Clip 4: frames 180–239 -> scrollY 2625 to 3500
    const clipRanges = [
      { name: 'Clip 1 (0-59)', startY: 0, endY: 875, startFrame: 0, endFrame: 59 },
      { name: 'Clip 2 (60-119)', startY: 875, endY: 1750, startFrame: 60, endFrame: 119 },
      { name: 'Clip 3 (120-179)', startY: 1750, endY: 2625, startFrame: 120, endFrame: 179 },
      { name: 'Clip 4 (180-239)', startY: 2625, endY: 3500, startFrame: 180, endFrame: 239 }
    ];

    const clipResults = {};

    for (const clip of clipRanges) {
      console.log(`\n--- Benchmarking ${clip.name} (10 trials: slow, normal, fast, reverse, jitter) ---`);
      const trials = [];

      for (let trial = 1; trial <= 10; trial++) {
        // Reset telemetry for trial
        await evalCode('window.__heroTelemetry.draws = []; window.__heroTelemetry.rafs = [];');
        
        // Mode variation across 10 trials
        const mode = trial <= 2 ? 'slow' : (trial <= 5 ? 'normal' : (trial <= 7 ? 'fast' : (trial <= 9 ? 'reverse' : 'oscillating')));
        
        if (mode === 'reverse') {
          // Start from end of clip and scroll backwards
          await evalCode(`window.scrollTo({ top: ${clip.endY}, behavior: 'instant' })`);
          await sleep(200);
          await evalCode('window.__heroTelemetry.draws = []; window.__heroTelemetry.rafs = [];');

          let y = clip.endY;
          const step = 25;
          while (y > clip.startY) {
            y = Math.max(clip.startY, y - step);
            await evalCode(`window.scrollTo(0, ${y})`);
            await sleep(16);
          }
        } else if (mode === 'oscillating') {
          // Repeated direction changes around middle of clip
          const midY = (clip.startY + clip.endY) / 2;
          await evalCode(`window.scrollTo({ top: ${midY}, behavior: 'instant' })`);
          await sleep(150);
          await evalCode('window.__heroTelemetry.draws = []; window.__heroTelemetry.rafs = [];');

          for (let osc = 0; osc < 12; osc++) {
            const targetY = osc % 2 === 0 ? midY + 120 : midY - 120;
            await evalCode(`window.scrollTo(0, ${targetY})`);
            await sleep(25);
          }
        } else {
          // Forward scroll (slow = 10px, normal = 30px, fast = 80px)
          const step = mode === 'slow' ? 10 : (mode === 'normal' ? 30 : 80);
          const interval = mode === 'slow' ? 25 : (mode === 'normal' ? 16 : 10);
          
          await evalCode(`window.scrollTo({ top: ${clip.startY}, behavior: 'instant' })`);
          await sleep(150);
          await evalCode('window.__heroTelemetry.draws = []; window.__heroTelemetry.rafs = [];');

          let y = clip.startY;
          while (y < clip.endY) {
            y = Math.min(clip.endY, y + step);
            await evalCode(`window.scrollTo(0, ${y})`);
            await sleep(interval);
          }
        }

        await sleep(300);

        // Gather metrics for trial
        const metrics = await evalCode(`(() => {
          const draws = window.__heroTelemetry.draws;
          const rafs = window.__heroTelemetry.rafs;
          const drawDurs = draws.map(d => d.dur);
          const rafDeltas = rafs.map(r => r.delta).filter(d => d < 500); // Filter out tab pauses

          // Janky frames (interval > 25ms, i.e. < 40fps)
          const droppedFrames = rafDeltas.filter(d => d > 25).length;
          const severeDrops = rafDeltas.filter(d => d > 45).length;

          drawDurs.sort((a,b) => a - b);
          rafDeltas.sort((a,b) => a - b);

          const avgDraw = drawDurs.length ? (drawDurs.reduce((a,b)=>a+b,0) / drawDurs.length) : 0;
          const p95Draw = drawDurs.length ? drawDurs[Math.floor(drawDurs.length * 0.95)] : 0;
          const maxDraw = drawDurs.length ? drawDurs[drawDurs.length - 1] : 0;

          const avgRaf = rafDeltas.length ? (rafDeltas.reduce((a,b)=>a+b,0) / rafDeltas.length) : 0;
          const p95Raf = rafDeltas.length ? rafDeltas[Math.floor(rafDeltas.length * 0.95)] : 0;
          const maxRaf = rafDeltas.length ? rafDeltas[rafDeltas.length - 1] : 0;
          const effectiveFps = avgRaf > 0 ? (1000 / avgRaf) : 0;

          return {
            drawCount: draws.length,
            rafCount: rafs.length,
            avgDrawMs: avgDraw,
            p95DrawMs: p95Draw,
            maxDrawMs: maxDraw,
            avgRafDeltaMs: avgRaf,
            p95RafDeltaMs: p95Raf,
            maxRafDeltaMs: maxRaf,
            fps: effectiveFps,
            droppedFrames,
            severeDrops
          };
        })()`);

        trials.push({ trial, mode, metrics });
      }

      // Aggregate across 10 trials
      const avgFps = trials.reduce((sum, t) => sum + t.metrics.fps, 0) / trials.length;
      const avgDraw = trials.reduce((sum, t) => sum + t.metrics.avgDrawMs, 0) / trials.length;
      const p95Draw = trials.reduce((sum, t) => sum + t.metrics.p95DrawMs, 0) / trials.length;
      const maxDraw = Math.max(...trials.map(t => t.metrics.maxDrawMs));
      const totalDrops = trials.reduce((sum, t) => sum + t.metrics.droppedFrames, 0);
      const totalSevereDrops = trials.reduce((sum, t) => sum + t.metrics.severeDrops, 0);
      const p95RafDelta = trials.reduce((sum, t) => sum + t.metrics.p95RafDeltaMs, 0) / trials.length;

      clipResults[clip.name] = {
        avgFps,
        avgDrawMs: avgDraw,
        p95DrawMs: p95Draw,
        maxDrawMs: maxDraw,
        p95RafDeltaMs: p95RafDelta,
        totalDrops,
        totalSevereDrops,
        trials
      };

      console.log(`${clip.name} Aggregated Results:`);
      console.log(`  FPS: ${avgFps.toFixed(1)} | Avg drawImage: ${avgDraw.toFixed(3)}ms | P95 drawImage: ${p95Draw.toFixed(3)}ms | Max drawImage: ${maxDraw.toFixed(3)}ms`);
      console.log(`  P95 Frame Interval: ${p95RafDelta.toFixed(1)}ms | Janks (>25ms): ${totalDrops} | Severe Stalls (>45ms): ${totalSevereDrops}`);
    }

    // TEST 2: Network Fetch Timings per Clip from Resource Timing
    console.log('\n--- Analyzing Network Fetch Timings from Resource Timing ---');
    const fetchTimings = await evalCode(`(() => {
      const fetches = Object.values(window.__heroTelemetry.fetches);
      const byClip = { 'clip-01': [], 'clip-02': [], 'clip-03': [], 'clip-04': [] };

      for (const f of fetches) {
        for (const c of Object.keys(byClip)) {
          if (f.url.includes(c)) {
            byClip[c].push(f);
          }
        }
      }

      function clipStats(arr) {
        if (!arr.length) return null;
        const durations = arr.map(a => a.duration).sort((a,b)=>a-b);
        const ttfbs = arr.map(a => a.ttfb).sort((a,b)=>a-b);
        const downloads = arr.map(a => a.downloadTime).sort((a,b)=>a-b);
        const sizes = arr.map(a => a.transferSize).sort((a,b)=>a-b);

        return {
          count: arr.length,
          avgDuration: durations.reduce((a,b)=>a+b,0) / durations.length,
          p95Duration: durations[Math.floor(durations.length * 0.95)],
          maxDuration: durations[durations.length - 1],
          avgTtfb: ttfbs.reduce((a,b)=>a+b,0) / ttfbs.length,
          avgDownload: downloads.reduce((a,b)=>a+b,0) / downloads.length,
          avgBytes: sizes.reduce((a,b)=>a+b,0) / sizes.length
        };
      }

      return {
        'clip-01': clipStats(byClip['clip-01']),
        'clip-02': clipStats(byClip['clip-02']),
        'clip-03': clipStats(byClip['clip-03']),
        'clip-04': clipStats(byClip['clip-04'])
      };
    })()`);

    console.log('Network Fetch Timings by Clip:', JSON.stringify(fetchTimings, null, 2));

    // TEST 3: Clip Boundary Transitions: 59 -> 60, 119 -> 120, 179 -> 180
    console.log('\n--- Testing Clip Boundary Transitions (59->60, 119->120, 179->180) ---');
    const boundaries = [
      { name: 'Boundary 1->2 (59->60)', yBefore: 850, yAfter: 900 },
      { name: 'Boundary 2->3 (119->120)', yBefore: 1720, yAfter: 1780 },
      { name: 'Boundary 3->4 (179->180)', yBefore: 2590, yAfter: 2660 }
    ];

    const boundaryResults = {};
    for (const b of boundaries) {
      const boundaryCrossings = [];
      for (let run = 0; run < 5; run++) {
        await evalCode(`window.scrollTo({ top: ${b.yBefore}, behavior: 'instant' })`);
        await sleep(150);
        await evalCode('window.__heroTelemetry.draws = []; window.__heroTelemetry.rafs = [];');

        // Step through boundary
        for (let y = b.yBefore; y <= b.yAfter; y += 10) {
          await evalCode(`window.scrollTo(0, ${y})`);
          await sleep(16);
        }
        await sleep(200);

        const bData = await evalCode(`(() => {
          const deltas = window.__heroTelemetry.rafs.map(r => r.delta).filter(d => d < 500);
          const maxDelta = Math.max(...deltas, 0);
          const dropped = deltas.filter(d => d > 25).length;
          return { maxDelta, dropped, sampleCount: deltas.length };
        })()`);
        boundaryCrossings.push(bData);
      }
      const avgMaxDelta = boundaryCrossings.reduce((s, c) => s + c.maxDelta, 0) / boundaryCrossings.length;
      const totalDrops = boundaryCrossings.reduce((s, c) => s + c.dropped, 0);
      boundaryResults[b.name] = { avgMaxDelta, totalDrops, boundaryCrossings };
      console.log(`${b.name}: Avg Max RAF Interval = ${avgMaxDelta.toFixed(1)}ms, Total Janks (>25ms) = ${totalDrops}`);
    }

    const fullReport = {
      clipResults,
      fetchTimings,
      boundaryResults
    };

    const fs = require('fs');
    const path = require('path');
    fs.writeFileSync(path.join(__dirname, 'live_hero_telemetry.json'), JSON.stringify(fullReport, null, 2));
    console.log('\nSaved full telemetry to scratch/live_hero_telemetry.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
