const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9266;

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
  console.log('=== INSPECTING SCHEDULER & CACHE BEHAVIOR AROUND CLIP 4 (175->239) ===');
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

    console.log('Navigating to live production site...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Instrument scheduler inside React fiber
    const instrumentResult = await evalCode(`(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { error: 'No canvas' };

      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
      if (!fiberKey) return { error: 'No fiber' };

      let fiber = canvas[fiberKey];
      let hookRefs = {};
      while (fiber) {
        if (fiber.memoizedState) {
          let hook = fiber.memoizedState;
          while (hook) {
            if (hook.memoizedState && typeof hook.memoizedState === 'object' && 'current' in hook.memoizedState) {
              const val = hook.memoizedState.current;
              if (val instanceof Uint8Array && val.length === 240) hookRefs.desktopStatus = val;
              if (Array.isArray(val) && val.length === 240) hookRefs.desktopCache = val;
              if (Array.isArray(val) && val !== hookRefs.desktopCache) hookRefs.priorityQueue = hook.memoizedState;
              if (val instanceof Set) hookRefs.queuedSet = hook.memoizedState;
            }
            hook = hook.next;
          }
        }
        fiber = fiber.return;
      }

      window.__schedulerTracker = {
        hookRefs,
        samples: [],
        evictions: [],
        draws: []
      };

      // Track draws
      const origDraw = CanvasRenderingContext2D.prototype.drawImage;
      CanvasRenderingContext2D.prototype.drawImage = function(img, ...args) {
        const now = performance.now();
        let idx = -1;
        if (hookRefs.desktopCache) {
          idx = hookRefs.desktopCache.indexOf(img);
        }
        window.__schedulerTracker.draws.push({ time: now, frameIdx: idx, scrollY: window.scrollY });
        return origDraw.apply(this, [img, ...args]);
      };

      return {
        hasStatus: !!hookRefs.desktopStatus,
        hasCache: !!hookRefs.desktopCache,
        hasQueue: !!hookRefs.priorityQueue
      };
    })()`);

    console.log('Instrumentation status:', instrumentResult);

    // Now test specific segments:
    // 175 -> 185
    // 185 -> 200
    // 200 -> 220
    // 220 -> 239
    // In pixels: y = (frame / 240) * 3500
    const segments = [
      { name: '175 -> 185', startFrame: 175, endFrame: 185 },
      { name: '185 -> 200', startFrame: 185, endFrame: 200 },
      { name: '200 -> 220', startFrame: 200, endFrame: 220 },
      { name: '220 -> 239', startFrame: 220, endFrame: 239 }
    ];

    const segmentMetrics = {};

    // Continuous scroll from 160 through 239 to observe natural scheduler pipeline
    console.log('\nRunning continuous scroll through 160 -> 239 to measure scheduler and cache state...');
    
    // Position at frame 160 first
    const startY = Math.round((160 / 240) * 3500);
    const endY = 3500;
    await evalCode(`window.scrollTo({ top: ${startY}, behavior: 'instant' })`);
    await sleep(200);

    // Clear trackers
    await evalCode(`window.__schedulerTracker.draws = []; window.__schedulerTracker.samples = [];`);

    // Scroll smoothly at normal rate (30px per 16ms)
    let curY = startY;
    const intervalMs = 16;
    const stepPx = 25;

    while (curY < endY) {
      curY = Math.min(endY, curY + stepPx);
      await evalCode(`window.scrollTo(0, ${curY})`);
      
      // Sample status
      await evalCode(`(() => {
        const st = window.__schedulerTracker;
        const status = st.hookRefs.desktopStatus;
        const cache = st.hookRefs.desktopCache;
        const queue = st.hookRefs.priorityQueue ? st.hookRefs.priorityQueue.current : [];
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const progress = heroST ? heroST.progress : Math.max(0, Math.min(1, window.scrollY / 3500));
        const targetFrame = Math.min(239, Math.floor(progress * (240 - 0.001)));

        let readyCount = 0;
        let loadingCount = 0;
        let unreqCount = 0;
        if (status) {
          for (let i = 0; i < 240; i++) {
            if (status[i] === 2) readyCount++;
            else if (status[i] === 1) loadingCount++;
            else if (status[i] === 0) unreqCount++;
          }
        }

        const isTargetReady = status ? (status[targetFrame] === 2) : false;

        st.samples.push({
          time: performance.now(),
          scrollY: window.scrollY,
          targetFrame,
          isTargetReady,
          readyCount,
          loadingCount,
          unreqCount,
          queueLength: queue.length
        });
      })()`);

      await sleep(intervalMs);
    }

    await sleep(300);

    // Evaluate segment metrics
    const analysis = await evalCode(`(() => {
      const samples = window.__schedulerTracker.samples;
      const draws = window.__schedulerTracker.draws;

      function analyzeSegment(startF, endF) {
        const segSamples = samples.filter(s => s.targetFrame >= startF && s.targetFrame <= endF);
        const segDraws = draws.filter(d => d.frameIdx >= startF && d.frameIdx <= endF);
        
        // Cache hit rate = ratio of samples where targetFrame was already ready
        const hits = segSamples.filter(s => s.isTargetReady).length;
        const total = segSamples.length;
        const hitRate = total > 0 ? (hits / total) : 0;
        const missRate = 1 - hitRate;

        // Draw intervals
        const intervals = [];
        for (let i = 1; i < segDraws.length; i++) {
          intervals.push(segDraws[i].time - segDraws[i-1].time);
        }
        intervals.sort((a,b)=>a-b);

        const avgInterval = intervals.length ? intervals.reduce((a,b)=>a+b,0)/intervals.length : 0;
        const p95Interval = intervals.length ? intervals[Math.floor(intervals.length * 0.95)] : 0;
        const maxInterval = intervals.length ? intervals[intervals.length - 1] : 0;
        const stalls40ms = intervals.filter(d => d > 40).length;

        const avgQueue = segSamples.length ? segSamples.reduce((a,b)=>a+b.queueLength,0)/segSamples.length : 0;
        const avgWorkersInFlight = segSamples.length ? segSamples.reduce((a,b)=>a+b.loadingCount,0)/segSamples.length : 0;

        return {
          totalSamples: total,
          hitRate,
          missRate,
          uniqueDraws: new Set(segDraws.map(d => d.frameIdx)).size,
          expectedFrames: endF - startF + 1,
          avgIntervalMs: avgInterval,
          p95IntervalMs: p95Interval,
          maxIntervalMs: maxInterval,
          stalls40ms,
          avgQueueLength: avgQueue,
          avgActiveWorkers: avgWorkersInFlight
        };
      }

      return {
        '175->185': analyzeSegment(175, 185),
        '185->200': analyzeSegment(185, 200),
        '200->220': analyzeSegment(200, 220),
        '220->239': analyzeSegment(220, 239)
      };
    })()`);

    console.log('\n--- SCHEDULER & CACHE METRICS PER SEGMENT ---');
    console.log(JSON.stringify(analysis, null, 2));

    fs.writeFileSync(path.join(__dirname, 'scheduler_inspection_results.json'), JSON.stringify(analysis, null, 2));
    console.log('\nSaved scheduler analysis to scratch/scheduler_inspection_results.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
