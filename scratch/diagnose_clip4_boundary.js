const https = require('https');

function fetchUrl(url, agent, delayMs = 0) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, { agent, timeout: 6000 }, (res) => {
      let bytes = 0;
      res.on('data', c => bytes += c.length);
      res.on('end', () => {
        if (delayMs > 0) {
          setTimeout(() => {
            resolve({ status: res.statusCode, bytes, duration: Date.now() - start });
          }, delayMs);
        } else {
          resolve({ status: res.statusCode, bytes, duration: Date.now() - start });
        }
      });
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

// Simulates the exact HeroCanvas + Hero ScrollTrigger interaction
async function simulateColdSession(options = {}) {
  const { networkThrottleDelayMs = 0, fastScrollSpeedPx = 1200, fastScrollDurationMs = 200 } = options;
  const agent = new https.Agent({ keepAlive: true, maxSockets: 16 });

  const totalFrames = 240;
  const warmup = 45;
  const maxWorkers = 8;
  const windowHeight = 900; // standard desktop viewport height

  const frameStatus = new Array(totalFrames).fill('unrequested');
  const queue = [];
  let activeWorkers = 0;
  let nextIdleIdx = warmup + 1;

  let currentTargetFrame = 0;
  let lastRenderedFrame = 0;
  let scrollY = 0;
  let isUserScrolling = false;

  const canvasDrawLog = [];
  let done = false;
  const startTime = Date.now();

  // Queue frame 0
  queue.push(0);

  // Scheduler worker loop matching HeroCanvas.tsx exactly
  async function worker() {
    while (!done) {
      if (queue.length === 0) {
        if (frameStatus[0] === 'ready' && !isUserScrolling && nextIdleIdx < totalFrames) {
          const b = Math.min(4, totalFrames - nextIdleIdx);
          for (let i = 0; i < b; i++) queue.push(nextIdleIdx++);
        } else {
          await new Promise(r => setTimeout(r, 10));
          continue;
        }
      }

      const idx = queue.shift();
      if (frameStatus[idx] !== 'unrequested') continue;

      frameStatus[idx] = 'loading';
      activeWorkers++;
      const res = await fetchUrl(getDesktopUrl(idx), agent, networkThrottleDelayMs);
      activeWorkers--;
      frameStatus[idx] = res.status === 200 ? 'ready' : 'error';

      if (idx === 0) {
        for (let w = 1; w <= warmup; w++) queue.push(w);
      }

      // Micro-advancement logic identical to HeroCanvas.tsx lines 504-520
      const current = currentTargetFrame;
      const lastRendered = lastRenderedFrame;
      if (idx > lastRendered && idx <= current) {
        lastRenderedFrame = idx;
        canvasDrawLog.push({
          timeMs: Date.now() - startTime,
          renderedFrame: idx,
          currentTarget: current,
          scrollY,
          pinState: scrollY < 3500 ? 'PINNED' : 'UNPINNED',
          servicesVisiblePct: Math.max(0, Math.min(100, Math.round(((scrollY - 3500) / windowHeight) * 100))),
          reason: 'micro-advancement on network arrival',
        });
      }
    }
  }

  const workers = [];
  for (let w = 0; w < maxWorkers; w++) workers.push(worker());

  // Wait for frame 0 to finish
  while (frameStatus[0] !== 'ready') {
    await new Promise(r => setTimeout(r, 10));
  }

  // Phase 1: Normal user scrolling from T=300ms through Clip 1, Clip 2 to middle of Clip 3 (scrollY = 2450px)
  // At 20 fps, 14.58px per frame -> ~300px per second
  const phase1TargetScrollY = 2450;
  const phase1DurationMs = 2800; // user spends 2.8s browsing clips 1 & 2
  const phase1Steps = 35;
  const phase1StepInterval = phase1DurationMs / phase1Steps;

  isUserScrolling = true;
  for (let s = 1; s <= phase1Steps; s++) {
    scrollY = Math.round((s / phase1Steps) * phase1TargetScrollY);
    const progress = Math.min(1, scrollY / 3500);
    currentTargetFrame = Math.min(totalFrames - 1, Math.floor(progress * (totalFrames - 0.001)));

    // Request missing frames in active runway
    for (let f = lastRenderedFrame + 1; f <= currentTargetFrame; f++) {
      if (frameStatus[f] === 'unrequested' && !queue.includes(f)) {
        queue.unshift(f);
      }
    }

    // Direct render attempt
    if (frameStatus[currentTargetFrame] === 'ready') {
      lastRenderedFrame = currentTargetFrame;
    }

    await new Promise(r => setTimeout(r, phase1StepInterval));
  }

  // Phase 2: User reaches Clip 3, pauses briefly (~250ms), then performs ONE FASTER SCROLL
  await new Promise(r => setTimeout(r, 250));

  // Fast scroll: scrollY jumps by fastScrollSpeedPx (e.g. from 2450px to 3700px = +1250px) in fastScrollDurationMs (200ms)
  const fastScrollSteps = 10;
  const fastStepInterval = fastScrollDurationMs / fastScrollSteps;
  const fastScrollTargetY = Math.min(4200, phase1TargetScrollY + fastScrollSpeedPx);

  for (let s = 1; s <= fastScrollSteps; s++) {
    scrollY = Math.round(phase1TargetScrollY + (s / fastScrollSteps) * (fastScrollTargetY - phase1TargetScrollY));
    const progress = Math.min(1, scrollY / 3500);
    currentTargetFrame = Math.min(totalFrames - 1, Math.floor(progress * (totalFrames - 0.001)));

    // Enqueue missing frames
    for (let f = lastRenderedFrame + 1; f <= currentTargetFrame; f++) {
      if (frameStatus[f] === 'unrequested' && !queue.includes(f)) {
        queue.unshift(f);
      }
    }

    if (frameStatus[currentTargetFrame] === 'ready') {
      lastRenderedFrame = currentTargetFrame;
    }

    await new Promise(r => setTimeout(r, fastStepInterval));
  }

  // Phase 3: User stops scrolling at scrollY = 3700px.
  // Now monitor what happens over the next 2000ms while user is stationary!
  isUserScrolling = false;
  const postScrollStart = Date.now();
  const snapshotAtBoundary = {
    scrollY,
    progress: (scrollY / 3500).toFixed(3),
    pinState: scrollY < 3500 ? 'PINNED' : 'UNPINNED',
    servicesVisiblePct: Math.max(0, Math.min(100, Math.round(((scrollY - 3500) / windowHeight) * 100))),
    targetFrame: currentTargetFrame,
    renderedFrameAtScrollStop: lastRenderedFrame,
    highestReadyFrameAtScrollStop: Math.max(...frameStatus.map((s, idx) => s === 'ready' ? idx : -1)),
    frame239Ready: frameStatus[239] === 'ready',
    frame235Ready: frameStatus[235] === 'ready',
    frame230Ready: frameStatus[230] === 'ready',
  };

  // Wait 2 seconds to capture asynchronous frame arrival animations while stationary
  await new Promise(r => setTimeout(r, 2000));

  done = true;
  await Promise.all(workers);
  agent.destroy();

  // Filter draws that happened AFTER scroll reached boundary (> 3500px)
  const lateDrawsWhileUnpinned = canvasDrawLog.filter(d => d.scrollY >= 3500);

  return {
    snapshotAtBoundary,
    lateDrawsWhileUnpinned,
    bugOccurred: lateDrawsWhileUnpinned.length > 0 && snapshotAtBoundary.servicesVisiblePct > 0,
    framesDrawnWhileServicesVisible: lateDrawsWhileUnpinned.map(d => d.renderedFrame),
  };
}

async function runDiagnosis() {
  console.log('================================================================================');
  console.log('3. REPRODUCING THE COLD-START DESKTOP HERO BOUNDARY RACE CONDITION');
  console.log('Target: https://stackstich.online (Live Network)');
  console.log('================================================================================\n');

  // Test 1: 10 repeated runs under live WAN conditions
  console.log('--- REPEATING COLD-START RUNS (10 Trials) ---');
  const trialResults = [];

  for (let trial = 1; trial <= 10; trial++) {
    const res = await simulateColdSession({ networkThrottleDelayMs: 0, fastScrollSpeedPx: 1250, fastScrollDurationMs: 220 });
    trialResults.push({
      trial: `#${trial}`,
      bugOccurred: res.bugOccurred ? 'YES (BUG REPRODUCED)' : 'NO',
      servicesVisible: res.snapshotAtBoundary.servicesVisiblePct + '%',
      targetFrame: res.snapshotAtBoundary.targetFrame,
      renderedAtBoundary: res.snapshotAtBoundary.renderedFrameAtScrollStop,
      highestReadyAtBoundary: res.snapshotAtBoundary.highestReadyFrameAtScrollStop,
      frame239Ready: res.snapshotAtBoundary.frame239Ready ? 'YES' : 'NO',
      lateDrawsCount: res.lateDrawsWhileUnpinned.length,
      framesDrawnAfterUnpin: res.framesDrawnWhileServicesVisible.length > 0 
        ? `${res.framesDrawnWhileServicesVisible[0]} -> ${res.framesDrawnWhileServicesVisible[res.framesDrawnWhileServicesVisible.length - 1]}` 
        : 'none',
    });
    process.stdout.write(`Trial ${trial}/10 done... `);
  }

  console.log('\n');
  console.table(trialResults);

  // Test 2: Network Throttling Analysis (No throttling, Fast 4G +50ms, Regular 4G +150ms, Slow 4G +300ms)
  console.log('\n================================================================================');
  console.log('4. NETWORK THROTTLING ANALYSIS');
  console.log('================================================================================\n');

  const throttleProfiles = [
    { name: 'No Throttling (Direct WAN)', delayMs: 0 },
    { name: 'Fast 4G (+50ms RTT latency)', delayMs: 50 },
    { name: 'Regular 4G (+150ms RTT latency)', delayMs: 150 },
    { name: 'Slow 4G (+300ms RTT latency)', delayMs: 300 },
  ];

  const throttleResults = [];

  for (const prof of throttleProfiles) {
    const res = await simulateColdSession({ networkThrottleDelayMs: prof.delayMs, fastScrollSpeedPx: 1250, fastScrollDurationMs: 220 });
    throttleResults.push({
      profile: prof.name,
      bugOccurred: res.bugOccurred ? 'YES (CONFIRMED)' : 'NO',
      servicesVisible: res.snapshotAtBoundary.servicesVisiblePct + '%',
      renderedAtBoundary: res.snapshotAtBoundary.renderedFrameAtScrollStop,
      frame239Ready: res.snapshotAtBoundary.frame239Ready ? 'YES' : 'NO',
      lateDrawsWhileServicesVisible: res.lateDrawsWhileUnpinned.length,
      framesAnimatedUnderneath: res.framesDrawnWhileServicesVisible.length > 0 
        ? `${res.framesDrawnWhileServicesVisible[0]} -> ${res.framesDrawnWhileServicesVisible[res.framesDrawnWhileServicesVisible.length - 1]}` 
        : 'none',
    });
  }

  console.table(throttleResults);
}

runDiagnosis().catch(console.error);
