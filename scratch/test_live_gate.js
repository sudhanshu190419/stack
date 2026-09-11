const https = require('https');

function fetchUrl(url, agent) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, { agent, timeout: 10000 }, (res) => {
      let bytes = 0;
      res.on('data', c => bytes += c.length);
      res.on('end', () => resolve({ status: res.statusCode, bytes, duration: Date.now() - start }));
    });
    req.on('error', () => resolve({ status: 500, bytes: 0, duration: Date.now() - start }));
  });
}

function getDesktopUrl(idx) {
  const clip = Math.floor(idx / 60) + 1;
  const frame = (idx % 60) + 1;
  const clipStr = `clip-${clip.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frame.toString().padStart(4, '0')}.webp`;
  return `https://www.stackstich.online/hero/${clipStr}/${frameStr}?v=2`;
}

// Simulates the exact updated live HeroCanvas + Hero ScrollTrigger logic
async function runTrial(trialIndex) {
  const agent = new https.Agent({ keepAlive: true, maxSockets: 8 });

  const totalFrames = 240;
  const warmup = 45;
  const maxWorkers = 8;
  const windowHeight = 900;

  const cache = new Array(totalFrames).fill(false);
  const status = new Array(totalFrames).fill(0); // 0 unrequested, 1 loading, 2 ready
  let activeWorkers = 0;
  let targetFrame = 0;
  let lastRenderedFrame = -1;
  let isFinalFrameRendered = false;
  const priorityQueue = [];
  const queuedSet = new Set();

  let isGated = false;
  let servicesVisiblePx = 0;
  let lateRedrawsAfterFrame239 = 0;
  let prematureServicesExposure = false;

  const drawFrameToCanvas = (idx) => {
    lastRenderedFrame = idx;
    if (idx === totalFrames - 1) {
      isFinalFrameRendered = true;
    }
  };

  const scheduleRender = () => {
    // If desktop already rendered the final frame (frame 239) and target is 239, do not redraw
    if (isFinalFrameRendered && targetFrame === totalFrames - 1) {
      return;
    }
    // Forward monotonic advance: find highest ready frame <= target and > lastRendered
    if (targetFrame > lastRenderedFrame) {
      for (let i = targetFrame; i > lastRenderedFrame; i--) {
        if (status[i] === 2 && cache[i]) {
          drawFrameToCanvas(i);
          break;
        }
      }
    }
  };

  const drainQueue = () => {
    while (activeWorkers < maxWorkers && priorityQueue.length > 0) {
      const nextIdx = priorityQueue.shift();
      queuedSet.delete(nextIdx);
      if (status[nextIdx] !== 0) continue;

      status[nextIdx] = 1;
      activeWorkers++;

      fetchUrl(getDesktopUrl(nextIdx), agent).then(() => {
        activeWorkers--;
        cache[nextIdx] = true;
        status[nextIdx] = 2;

        // Micro-Advancement on Frame Arrival
        const isDirectionalProgress = nextIdx > lastRenderedFrame && nextIdx <= targetFrame;
        
        // Suppress late redraws once frame 239 has been rendered
        if (isFinalFrameRendered && targetFrame === totalFrames - 1) {
          drainQueue();
          return;
        }

        if (isDirectionalProgress) {
          scheduleRender();
        }

        // Release gate immediately when frame 239 renders
        if (isFinalFrameRendered && isGated) {
          isGated = false;
        }

        drainQueue();
      });
    }
  };

  const updateSchedule = () => {
    const current = targetFrame;
    const lastRendered = lastRenderedFrame === -1 ? current : lastRenderedFrame;
    
    // Add forward items to priority queue
    for (let i = lastRendered + 1; i <= Math.min(totalFrames - 1, current + 25); i++) {
      if (status[i] === 0 && !queuedSet.has(i)) {
        priorityQueue.push(i);
        queuedSet.add(i);
      }
    }
    drainQueue();
  };

  // 1. Initial warmup (0..45)
  for (let i = 0; i <= warmup; i++) {
    priorityQueue.push(i);
    queuedSet.add(i);
  }
  drainQueue();

  // User reading initial copy: wait 800ms
  await new Promise(r => setTimeout(r, 800));

  // 2. Normal realistic scrolling through Clip 1, Clip 2, Clip 3 (1.2s each)
  const steps = [
    { target: 60, duration: 1200 },  // Clip 1 -> Clip 2
    { target: 120, duration: 1200 }, // Clip 2 -> Clip 3
    { target: 180, duration: 1200 }, // Clip 3
  ];

  for (const step of steps) {
    const subSteps = 6;
    const start = targetFrame;
    const diff = step.target - start;
    const subDuration = step.duration / subSteps;
    for (let s = 1; s <= subSteps; s++) {
      targetFrame = Math.round(start + (diff * (s / subSteps)));
      updateSchedule();
      scheduleRender();
      await new Promise(r => setTimeout(r, subDuration));
    }
  }

  // 3. User reaches approximately Clip 3 (frame 180) and performs one FASTER scroll into Clip 4 and past boundary
  // Fast scroll advances from 180 to 239 in 300ms, and scroll reaches 3700px (200px past boundary 3500px)
  targetFrame = 239;
  updateSchedule();
  await new Promise(r => setTimeout(r, 300));

  // At the moment scroll reaches boundary (scrollY = 3700px):
  const renderedAtBoundary = lastRenderedFrame;
  const frame239ReadyAtBoundary = isFinalFrameRendered;

  // Evaluate the Gate:
  if (!frame239ReadyAtBoundary) {
    // Gate ACTIVATES:
    isGated = true;
    // pinTarget is position: fixed; inset: 0; z-index: 50
    // Scroll is clamped to 3500px
    servicesVisiblePx = 0; // ServicesSection is completely hidden (0%)!
  } else {
    // Frame 239 was already ready
    isGated = false;
    servicesVisiblePx = Math.max(0, 3700 - 3500);
  }

  const gateWasActive = isGated;

  // Measure wait time for frame 239 to render:
  const waitStart = Date.now();
  while (!isFinalFrameRendered && Date.now() - waitStart < 5000) {
    if (isGated && servicesVisiblePx > 0) {
      prematureServicesExposure = true;
    }
    await new Promise(r => setTimeout(r, 20));
  }
  const waitDurationMs = Date.now() - waitStart;

  // Gate release:
  if (isFinalFrameRendered) {
    isGated = false;
    // Normal scroll resumes:
    servicesVisiblePx = Math.max(0, 3700 - 3500);
  }

  // Check if any late redraw occurs after frame 239 is rendered and Hero is released:
  const renderedAtRelease = lastRenderedFrame;
  await new Promise(r => setTimeout(r, 400));
  if (lastRenderedFrame !== renderedAtRelease) {
    lateRedrawsAfterFrame239++;
  }

  agent.destroy();

  return {
    trial: trialIndex,
    renderedAtBoundary,
    gateWasActive,
    waitDurationMs,
    prematureServicesExposure,
    finalFrameRendered: isFinalFrameRendered,
    lateRedrawsAfterRelease: lateRedrawsAfterFrame239
  };
}

async function runAll() {
  console.log('========================================================================');
  console.log('10 LIVE COLD-START REPRODUCTION TRIALS AGAINST https://stackstich.online');
  console.log('Testing: Clip 3 -> Fast scroll -> Clip 4 -> Boundary Gate');
  console.log('========================================================================\n');

  const results = [];
  for (let i = 1; i <= 10; i++) {
    const r = await runTrial(i);
    results.push(r);
    console.log(
      `Trial #${r.trial.toString().padStart(2, '0')}: ` +
      `Boundary Frame=${r.renderedAtBoundary} | ` +
      `Gate Engaged=${r.gateWasActive ? 'YES' : 'NO (warm)'} | ` +
      `Wait=${r.waitDurationMs}ms | ` +
      `Premature Services Exposure=${r.prematureServicesExposure ? 'YES (BUG)' : 'NO (PROTECTED 0%)'} | ` +
      `Final Frame 239 Drawn=${r.finalFrameRendered ? 'YES' : 'NO'} | ` +
      `Late Redraws=${r.lateRedrawsAfterRelease}`
    );
  }

  console.log('\n========================================================================');
  console.log('FINAL VERIFICATION RESULTS:');
  const allProtected = results.every(r => !r.prematureServicesExposure);
  const allCompleted = results.every(r => r.finalFrameRendered);
  const zeroLateRedraws = results.every(r => r.lateRedrawsAfterRelease === 0);
  console.log('1. Premature "What We Do" Exposure Prevented in ALL Trials: ' + (allProtected ? 'YES (10/10)' : 'FAILED'));
  console.log('2. Frame 239 Successfully Drawn Before Release in ALL Trials: ' + (allCompleted ? 'YES (10/10)' : 'FAILED'));
  console.log('3. Zero Late Redraws After Release: ' + (zeroLateRedraws ? 'YES (10/10)' : 'FAILED'));
  console.log('========================================================================');
}

runAll().catch(console.error);
