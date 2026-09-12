const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9262;

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
  window.__deliveryTelemetry = {
    records: [],
    frameRenderEvents: [],
    activeTarget: 0,
    activeRendered: -1,
    missCount: 0,
    hitCount: 0,
    stalls: [],
    isRecording: false
  };

  // Intercept drawImage to catch the exact frame drawn
  const origDraw = CanvasRenderingContext2D.prototype.drawImage;
  let lastDrawTime = performance.now();
  let lastDrawnFrameIndex = -1;

  CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    const now = performance.now();
    const res = origDraw.apply(this, args);
    const drawDur = performance.now() - now;

    if (window.__deliveryTelemetry.isRecording) {
      const deltaFromLastDraw = now - lastDrawTime;
      lastDrawTime = now;
      
      const target = window.__deliveryTelemetry.activeTarget;
      const currentRendered = window.__heroLastRendered != null ? window.__heroLastRendered : -1;

      window.__deliveryTelemetry.frameRenderEvents.push({
        time: now,
        delta: deltaFromLastDraw,
        targetFrame: target,
        renderedFrame: currentRendered,
        drawDur: drawDur
      });
    }
    return res;
  };

  // Sample target vs rendered in RAF loop
  function sampleLoop() {
    if (window.__deliveryTelemetry.isRecording) {
      const now = performance.now();
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      const progress = heroST ? heroST.progress : Math.max(0, Math.min(1, window.scrollY / 3500));
      const targetFrame = Math.min(239, Math.floor(progress * (240 - 0.001)));
      window.__deliveryTelemetry.activeTarget = targetFrame;

      // Check current rendered frame if accessible
      const rendered = window.__heroLastRendered != null ? window.__heroLastRendered : -1;
      
      window.__deliveryTelemetry.records.push({
        time: now,
        scrollY: window.scrollY,
        progress: progress,
        targetFrame: targetFrame,
        renderedFrame: rendered
      });
    }
    requestAnimationFrame(sampleLoop);
  }
  requestAnimationFrame(sampleLoop);
})();
`;

async function run() {
  console.log('=== RUNNING FRAME DELIVERY & STUCKINESS INVESTIGATION ON LIVE SITE ===');
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

    console.log('Navigating to https://www.stackstich.online/ ...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Expose internal React state / lastRenderedFrame from React fiber or DOM
    await evalCode(`(() => {
      // Find the Hero canvas element
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      // Look up React fiber to read internal refs
      const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
      if (fiberKey) {
        let fiber = canvas[fiberKey];
        while (fiber) {
          if (fiber.memoizedState) {
            // Traverse hooks
            let hook = fiber.memoizedState;
            while (hook) {
              if (hook.memoizedState && typeof hook.memoizedState === 'object') {
                if ('current' in hook.memoizedState) {
                  const val = hook.memoizedState.current;
                  // Check if this is lastRenderedFrameRef (number)
                  // Or desktopStatus Uint8Array
                  if (val instanceof Uint8Array && val.length === 240) {
                    window.__heroDesktopStatus = val;
                  }
                  if (Array.isArray(val) && val.length === 240) {
                    window.__heroDesktopCache = val;
                  }
                }
              }
              hook = hook.next;
            }
          }
          fiber = fiber.return;
        }
      }
    })()`);

    const hasStatus = await evalCode(`!!window.__heroDesktopStatus`);
    const hasCache = await evalCode(`!!window.__heroDesktopCache`);
    console.log(`Internal status hooked: ${hasStatus}, internal cache hooked: ${hasCache}`);

    // If fiber traversal found the cache and status, let's also hook the lastRendered tracking
    await evalCode(`(() => {
      if (window.__heroDesktopCache && window.__heroDesktopStatus) {
        // Poll lastRendered based on canvas updates or status
        let lastKnown = 0;
        const origDraw = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function(img, ...rest) {
          if (window.__heroDesktopCache) {
            const idx = window.__heroDesktopCache.indexOf(img);
            if (idx !== -1) {
              window.__heroLastRendered = idx;
            }
          }
          return origDraw.apply(this, [img, ...rest]);
        };
      }
    })()`);

    // Define test scroll profiles:
    // We will test Clips 1, 2, 3, 4 under:
    // A. COLD state (scroll immediately)
    // B. WARM state (preload the clip completely, then scroll)
    //
    // Clip 1: scrollY 0 -> 875 (frames 0-59)
    // Clip 2: scrollY 875 -> 1750 (frames 60-119)
    // Clip 3: scrollY 1750 -> 2625 (frames 120-179)
    // Clip 4: scrollY 2625 -> 3500 (frames 180-239)

    const clips = [
      { name: 'Clip 1', startFrame: 0, endFrame: 59, startY: 0, endY: 875 },
      { name: 'Clip 2', startFrame: 60, endFrame: 119, startY: 875, endY: 1750 },
      { name: 'Clip 3', startFrame: 120, endFrame: 179, startY: 1750, endY: 2625 },
      { name: 'Clip 4', startFrame: 180, endFrame: 239, startY: 2625, endY: 3500 }
    ];

    const results = {
      coldScrub: {},
      warmScrub: {},
      speedProfiles: {},
      directionOscillations: {}
    };

    // Helper to run a controlled scroll test across a clip
    async function testClipScroll(clip, speedMode = 'normal', isWarm = false) {
      // Step size & sleep per step
      // 'slow': 5px per 16ms (~310px/s -> takes ~2.8s per clip)
      // 'normal': 20px per 16ms (~1250px/s -> takes ~0.7s per clip)
      // 'fast': 60px per 16ms (~3750px/s -> takes ~0.23s per clip)
      // 'rapid': 120px per 16ms (~7500px/s -> takes ~0.12s per clip)
      const stepConfig = {
        slow: { step: 6, delay: 16 },
        normal: { step: 20, delay: 16 },
        fast: { step: 50, delay: 16 },
        rapid: { step: 100, delay: 16 }
      }[speedMode];

      // Jump to startY
      await evalCode(`window.scrollTo({ top: ${clip.startY}, behavior: 'instant' })`);
      await sleep(150);

      // Start recording
      await evalCode(`
        window.__deliveryTelemetry.isRecording = true;
        window.__deliveryTelemetry.records = [];
        window.__deliveryTelemetry.frameRenderEvents = [];
      `);

      let y = clip.startY;
      while (y < clip.endY) {
        y = Math.min(clip.endY, y + stepConfig.step);
        await evalCode(`window.scrollTo(0, ${y})`);
        await sleep(stepConfig.delay);
      }
      await sleep(250);

      // Stop recording and gather
      await evalCode(`window.__deliveryTelemetry.isRecording = false;`);

      const trialData = await evalCode(`(() => {
        const renders = window.__deliveryTelemetry.frameRenderEvents;
        const records = window.__deliveryTelemetry.records;
        
        // Compute unique frames rendered
        const uniqueRenderedFrames = new Set(renders.map(r => r.renderedFrame).filter(f => f >= 0));
        
        // Compute frame-to-frame intervals
        const intervals = renders.map(r => r.delta).filter(d => d > 0 && d < 1000);
        intervals.sort((a,b) => a - b);
        
        const avgInterval = intervals.length ? (intervals.reduce((a,b)=>a+b,0)/intervals.length) : 0;
        const p95Interval = intervals.length ? intervals[Math.floor(intervals.length * 0.95)] : 0;
        const maxInterval = intervals.length ? intervals[intervals.length - 1] : 0;
        
        // Stalls / Freezes: an interval where no new frame was rendered for > 40ms (equivalent to < 25fps)
        const frameStalls40ms = intervals.filter(d => d > 40).length;
        const frameStalls100ms = intervals.filter(d => d > 100).length;
        
        // Target vs rendered lag
        const lags = records.map(r => Math.max(0, r.targetFrame - (r.renderedFrame >= 0 ? r.renderedFrame : r.targetFrame)));
        lags.sort((a,b) => a - b);
        const avgLag = lags.length ? (lags.reduce((a,b)=>a+b,0)/lags.length) : 0;
        const p95Lag = lags.length ? lags[Math.floor(lags.length * 0.95)] : 0;
        const maxLag = lags.length ? lags[lags.length - 1] : 0;

        // Effective frame delivery rate (frames delivered per second)
        const totalDuration = records.length > 1 ? (records[records.length - 1].time - records[0].time) : 1;
        const deliveredFps = (uniqueRenderedFrames.size / (totalDuration / 1000));

        // Draw times
        const drawDurs = renders.map(r => r.drawDur);
        const avgDraw = drawDurs.length ? (drawDurs.reduce((a,b)=>a+b,0)/drawDurs.length) : 0;
        const p95Draw = drawDurs.length ? drawDurs.sort((a,b)=>a-b)[Math.floor(drawDurs.length*0.95)] : 0;

        // Skipped target frames: total target frames in clip minus unique delivered
        const expectedFrames = ${clip.endFrame - clip.startFrame + 1};
        const droppedTargetFrames = Math.max(0, expectedFrames - uniqueRenderedFrames.size);

        return {
          totalRenders: renders.length,
          uniqueFramesCount: uniqueRenderedFrames.size,
          expectedFrames,
          droppedTargetFrames,
          deliveredFps,
          avgIntervalMs: avgInterval,
          p95IntervalMs: p95Interval,
          maxIntervalMs: maxInterval,
          frameStalls40ms,
          frameStalls100ms,
          avgLagFrames: avgLag,
          p95LagFrames: p95Lag,
          maxLagFrames: maxLag,
          avgDrawMs: avgDraw,
          p95DrawMs: p95Draw,
          totalDurationMs: totalDuration,
          firstRendered: renders.length ? renders[0].renderedFrame : -1,
          lastRendered: renders.length ? renders[renders.length - 1].renderedFrame : -1
        };
      })()`);

      return trialData;
    }

    // Helper to pre-warm all frames in a clip
    async function prewarmClip(clip) {
      console.log(`Prewarming all frames in ${clip.name} (frames ${clip.startFrame} to ${clip.endFrame})...`);
      await evalCode(`(async () => {
        const promises = [];
        for (let i = ${clip.startFrame}; i <= ${clip.endFrame}; i++) {
          const clipIdx = Math.floor(i / 60) + 1;
          const frameIdx = (i % 60) + 1;
          const clipStr = 'clip-' + clipIdx.toString().padStart(2, '0');
          const frameStr = 'frame-' + frameIdx.toString().padStart(4, '0') + '.webp?v=2';
          const url = '/hero/' + clipStr + '/' + frameStr;
          
          promises.push(
            fetch(url)
              .then(r => r.blob())
              .then(b => createImageBitmap(b))
              .then(bitmap => {
                if (window.__heroDesktopCache && window.__heroDesktopStatus) {
                  window.__heroDesktopCache[i] = bitmap;
                  window.__heroDesktopStatus[i] = 2; // STATUS_READY
                }
              })
              .catch(e => console.error(e))
          );
        }
        await Promise.all(promises);
      })()`);
      await sleep(1000);
    }

    // =========================================================================
    // PART 1: WARM VS COLD SCENARIOS FOR CLIP 4 (and comparisons with Clip 1, 2, 3)
    // =========================================================================
    console.log('\n======================================================');
    console.log('PART 1: TESTING COLD SCRUB VS WARM SCRUB ACROSS CLIPS');
    console.log('======================================================');

    // Test COLD across all clips
    // For cold Clip 4, let's first reload the page to ensure cold start
    for (const clip of clips) {
      console.log(`\nTesting COLD scrub on ${clip.name} (speed: normal)...`);
      // Scroll to clip start and run
      const data = await testClipScroll(clip, 'normal', false);
      results.coldScrub[clip.name] = data;
      console.log(`  Unique Frames: ${data.uniqueFramesCount}/${data.expectedFrames} | Delivered FPS: ${data.deliveredFps.toFixed(1)}`);
      console.log(`  Interval: Avg ${data.avgIntervalMs.toFixed(1)}ms, P95 ${data.p95IntervalMs.toFixed(1)}ms, Max ${data.maxIntervalMs.toFixed(1)}ms`);
      console.log(`  Stalls: >40ms: ${data.frameStalls40ms}, >100ms: ${data.frameStalls100ms}`);
      console.log(`  Lag: Avg ${data.avgLagFrames.toFixed(1)} frames, Max ${data.maxLagFrames} frames`);
    }

    // Now Prewarm all clips and test WARM scrub
    console.log('\n--- PREWARMING ALL CLIPS FOR WARM COMPARISON ---');
    for (const clip of clips) {
      await prewarmClip(clip);
    }

    for (const clip of clips) {
      console.log(`\nTesting WARM scrub on ${clip.name} (speed: normal)...`);
      const data = await testClipScroll(clip, 'normal', true);
      results.warmScrub[clip.name] = data;
      console.log(`  Unique Frames: ${data.uniqueFramesCount}/${data.expectedFrames} | Delivered FPS: ${data.deliveredFps.toFixed(1)}`);
      console.log(`  Interval: Avg ${data.avgIntervalMs.toFixed(1)}ms, P95 ${data.p95IntervalMs.toFixed(1)}ms, Max ${data.maxIntervalMs.toFixed(1)}ms`);
      console.log(`  Stalls: >40ms: ${data.frameStalls40ms}, >100ms: ${data.frameStalls100ms}`);
      console.log(`  Lag: Avg ${data.avgLagFrames.toFixed(1)} frames, Max ${data.maxLagFrames} frames`);
    }

    // =========================================================================
    // PART 2: SPEED PROFILES ON CLIP 4 VS CLIP 3 (SLOW, NORMAL, FAST, RAPID)
    // =========================================================================
    console.log('\n======================================================');
    console.log('PART 2: SPEED PROFILES (SLOW, NORMAL, FAST, RAPID)');
    console.log('======================================================');

    results.speedProfiles = { 'Clip 3': {}, 'Clip 4': {} };
    for (const speed of ['slow', 'normal', 'fast', 'rapid']) {
      console.log(`\nTesting Speed: ${speed.toUpperCase()} on Clip 3...`);
      results.speedProfiles['Clip 3'][speed] = await testClipScroll(clips[2], speed, true);
      console.log(`  Clip 3 (${speed}): Delivered FPS: ${results.speedProfiles['Clip 3'][speed].deliveredFps.toFixed(1)}, P95 Interval: ${results.speedProfiles['Clip 3'][speed].p95IntervalMs.toFixed(1)}ms, Max Interval: ${results.speedProfiles['Clip 3'][speed].maxIntervalMs.toFixed(1)}ms, Stalls >40ms: ${results.speedProfiles['Clip 3'][speed].frameStalls40ms}`);

      console.log(`Testing Speed: ${speed.toUpperCase()} on Clip 4...`);
      results.speedProfiles['Clip 4'][speed] = await testClipScroll(clips[3], speed, true);
      console.log(`  Clip 4 (${speed}): Delivered FPS: ${results.speedProfiles['Clip 4'][speed].deliveredFps.toFixed(1)}, P95 Interval: ${results.speedProfiles['Clip 4'][speed].p95IntervalMs.toFixed(1)}ms, Max Interval: ${results.speedProfiles['Clip 4'][speed].maxIntervalMs.toFixed(1)}ms, Stalls >40ms: ${results.speedProfiles['Clip 4'][speed].frameStalls40ms}`);
    }

    // =========================================================================
    // PART 3: OSCILLATING DIRECTION CHANGES (FORWARD <-> BACKWARD) IN CLIP 4
    // =========================================================================
    console.log('\n======================================================');
    console.log('PART 3: DIRECTION OSCILLATIONS (REPEATED REVERSALS)');
    console.log('======================================================');

    for (const testClip of [clips[2], clips[3]]) {
      const midY = (testClip.startY + testClip.endY) / 2;
      await evalCode(`window.scrollTo({ top: ${midY}, behavior: 'instant' })`);
      await sleep(150);

      await evalCode(`
        window.__deliveryTelemetry.isRecording = true;
        window.__deliveryTelemetry.records = [];
        window.__deliveryTelemetry.frameRenderEvents = [];
      `);

      for (let i = 0; i < 20; i++) {
        const targetY = i % 2 === 0 ? midY + 150 : midY - 150;
        await evalCode(`window.scrollTo(0, ${targetY})`);
        await sleep(35);
      }
      await sleep(200);

      await evalCode(`window.__deliveryTelemetry.isRecording = false;`);

      const oscData = await evalCode(`(() => {
        const renders = window.__deliveryTelemetry.frameRenderEvents;
        const intervals = renders.map(r => r.delta).filter(d => d > 0 && d < 1000).sort((a,b)=>a-b);
        return {
          totalRenders: renders.length,
          avgIntervalMs: intervals.length ? intervals.reduce((a,b)=>a+b,0)/intervals.length : 0,
          p95IntervalMs: intervals.length ? intervals[Math.floor(intervals.length*0.95)] : 0,
          maxIntervalMs: intervals.length ? intervals[intervals.length-1] : 0,
          stalls40ms: intervals.filter(d => d > 40).length
        };
      })()`);

      results.directionOscillations[testClip.name] = oscData;
      console.log(`${testClip.name} Oscillations: Renders: ${oscData.totalRenders}, P95 Interval: ${oscData.p95IntervalMs.toFixed(1)}ms, Max Interval: ${oscData.maxIntervalMs.toFixed(1)}ms, Stalls >40ms: ${oscData.stalls40ms}`);
    }

    // Save results
    fs.writeFileSync(path.join(__dirname, 'frame_delivery_results.json'), JSON.stringify(results, null, 2));
    console.log('\nSaved all frame delivery results to scratch/frame_delivery_results.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
