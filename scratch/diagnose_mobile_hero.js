// Simulation of the exact mobile Hero pipeline in StackStich
// Based on actual code in Hero.tsx and HeroCanvas.tsx

const MOBILE_TOTAL_FRAMES = 200;
const SCROLL_DISTANCE = 5000; // px
const PIXELS_PER_FRAME = SCROLL_DISTANCE / MOBILE_TOTAL_FRAMES; // 25px
const CONCURRENCY = 4;
const INITIAL_WARMUP = 20;

// Download times measured from real Vercel production:
// Cached edge HIT: ~85ms average
// Uncached / cellular 4G: ~350ms average

function simulateScrollSession(profileName, swipeDistance, swipeDurationMs, frameDownloadMs) {
  const fps = 60;
  const dt = 1000 / fps; // 16.67ms per frame
  const totalSteps = Math.ceil(swipeDurationMs / dt);
  
  // Status: 0=unrequested, 1=loading, 2=ready
  const status = new Array(MOBILE_TOTAL_FRAMES).fill(0);
  // Mark initial warmup as ready
  for (let i = 0; i < INITIAL_WARMUP; i++) status[i] = 2;

  let activeWorkers = 0;
  const queue = [];
  const inFlight = new Map(); // frameIdx -> completionTimeMs

  let currentScrollY = 0;
  let lastRendered = 0;
  let currentTimeMs = 0;

  let totalRafTicks = 0;
  let exactRenderCount = 0;
  let fallbackRenderCount = 0;
  let frozenTicks = 0; // target changed but no new frame was drawn
  let maxFrozenMs = 0;
  let currentFrozenMs = 0;
  let frameChanges = 0;

  const velocity = swipeDistance / swipeDurationMs; // px/ms

  for (let step = 0; step < totalSteps; step++) {
    currentTimeMs += dt;
    totalRafTicks++;

    // 1. Advance touch scroll with inertia deceleration
    currentScrollY += velocity * dt;
    const progress = Math.min(1, currentScrollY / SCROLL_DISTANCE);
    const targetFrame = Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor(progress * (MOBILE_TOTAL_FRAMES - 0.001)));

    // 2. Complete in-flight downloads
    for (const [idx, compTime] of inFlight.entries()) {
      if (currentTimeMs >= compTime) {
        status[idx] = 2; // READY
        inFlight.delete(idx);
        activeWorkers--;
      }
    }

    // 3. Scheduler queue update (same logic as HeroCanvas.tsx)
    // Priority: idx > current && idx <= current + 25 has HIGHEST score (9500)
    // idx > lastRendered && idx < current has LOWER score (8500)
    const candidates = [];
    for (let i = Math.max(0, lastRendered - 6); i <= Math.min(MOBILE_TOTAL_FRAMES - 1, targetFrame + 35); i++) {
      if (status[i] === 0) {
        let score = -1;
        if (i === targetFrame) score = 10000;
        else if (i > targetFrame && i <= targetFrame + 25) score = 9500 - (i - targetFrame) * 30;
        else if (i > lastRendered && i < targetFrame) score = 8500 - (i - lastRendered) * 10;
        else if (i > targetFrame + 25) score = 7000;
        if (score > 0) candidates.push({ idx: i, score });
      }
    }
    candidates.sort((a, b) => b.score - a.score);

    // Pump scheduler workers up to CONCURRENCY
    for (const cand of candidates) {
      if (activeWorkers < CONCURRENCY && !inFlight.has(cand.idx) && status[cand.idx] === 0) {
        status[cand.idx] = 1; // LOADING
        activeWorkers++;
        inFlight.set(cand.idx, currentTimeMs + frameDownloadMs);
      }
    }

    // 4. Render step (same logic as HeroCanvas renderFrame)
    let renderedIndex = -1;
    if (status[targetFrame] === 2) {
      renderedIndex = targetFrame;
      exactRenderCount++;
    } else {
      // Find highest ready frame <= targetFrame and > lastRendered
      for (let i = targetFrame; i > lastRendered; i--) {
        if (status[i] === 2) {
          renderedIndex = i;
          break;
        }
      }
      if (renderedIndex === -1) {
        // Fallback to lastRendered (FREEZE)
        renderedIndex = lastRendered;
      }
      fallbackRenderCount++;
    }

    if (renderedIndex !== lastRendered) {
      frameChanges++;
      lastRendered = renderedIndex;
      if (currentFrozenMs > maxFrozenMs) maxFrozenMs = currentFrozenMs;
      currentFrozenMs = 0;
    } else if (targetFrame !== lastRendered) {
      frozenTicks++;
      currentFrozenMs += dt;
    }
  }

  return {
    profileName,
    swipeDistance,
    swipeDurationMs,
    targetFrameReached: Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor((swipeDistance / SCROLL_DISTANCE) * MOBILE_TOTAL_FRAMES)),
    totalRafTicks,
    frameChanges,
    exactRenderCount,
    fallbackRenderCount,
    frozenTicks,
    frozenPercent: ((frozenTicks / totalRafTicks) * 100).toFixed(1) + '%',
    maxFrozenMs: Math.round(maxFrozenMs) + 'ms',
    effectiveFps: (frameChanges / (swipeDurationMs / 1000)).toFixed(1) + ' fps'
  };
}

console.log('====================================================');
console.log('SIMULATING MOBILE HERO UNDER DIFFERENT CONDITIONS');
console.log('====================================================');

// Test A: Normal 4G (350ms RTT+download)
console.log('\n--- 1. Cellular 4G / WAN Latency (350ms frame download) ---');
console.table([
  simulateScrollSession('Slow swipe (300px, 800ms)', 300, 800, 350),
  simulateScrollSession('Normal swipe (700px, 600ms)', 700, 600, 350),
  simulateScrollSession('Fast swipe (1500px, 500ms)', 1500, 500, 350),
  simulateScrollSession('Full scroll (5000px, 3000ms)', 5000, 3000, 350),
]);

// Test B: Fast Edge HIT (85ms frame download)
console.log('\n--- 2. Edge Cache HIT (85ms frame download) ---');
console.table([
  simulateScrollSession('Slow swipe (300px, 800ms)', 300, 800, 85),
  simulateScrollSession('Normal swipe (700px, 600ms)', 700, 600, 85),
  simulateScrollSession('Fast swipe (1500px, 500ms)', 1500, 500, 85),
  simulateScrollSession('Full scroll (5000px, 3000ms)', 5000, 3000, 85),
]);
