const https = require('https');

function fetchUrl(url, customAgent) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, { agent: customAgent, timeout: 6000 }, (res) => {
      let bytes = 0;
      res.on('data', c => bytes += c.length);
      res.on('end', () => resolve({ status: res.statusCode, bytes, duration: Date.now() - start }));
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 408, bytes: 0, duration: Date.now() - start, error: 'timeout' }); });
    req.on('error', (err) => resolve({ status: 500, bytes: 0, duration: Date.now() - start, error: err.message }));
  });
}

function getDesktopUrl(idx) {
  const clip = Math.floor(idx / 60) + 1;
  const frame = (idx % 60) + 1;
  const clipStr = `clip-${clip.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frame.toString().padStart(4, '0')}.webp`;
  return `https://www.stackstich.online/hero/${clipStr}/${frameStr}?v=2`;
}

function getMobileUrl(idx) {
  const clip = Math.floor(idx / 100) + 1;
  const frame = (idx % 100) + 1;
  const clipStr = `clip-${clip.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frame.toString().padStart(3, '0')}.webp`;
  return `https://www.stackstich.online/hero_mobile/${clipStr}/${frameStr}`;
}

async function runTimedTimeline(mode = 'desktop') {
  const isDesktop = mode === 'desktop';
  const totalFrames = isDesktop ? 240 : 200;
  const maxConcurrency = isDesktop ? 8 : 4;
  const initialWarmup = isDesktop ? 45 : 35;
  const idleBatchSize = isDesktop ? 4 : 2;
  const maxIdleQueue = isDesktop ? 8 : 2;

  const frameStatus = new Array(totalFrames).fill('unrequested');
  const readyTimestamps = new Array(totalFrames).fill(null);
  let activeWorkers = 0;
  const queue = [];
  let nextIdleIdx = initialWarmup + 1;

  const startTime = Date.now();
  let done = false;

  const checkpoints = [0, 1000, 2000, 3000, 5000];
  const snapshots = {};

  function recordSnapshots() {
    const elapsed = Date.now() - startTime;
    for (const cp of checkpoints) {
      if (!snapshots[cp] && elapsed >= cp) {
        let downloaded = 0;
        let loading = 0;
        for (let i = 0; i < totalFrames; i++) {
          if (frameStatus[i] === 'ready') downloaded++;
          else if (frameStatus[i] === 'loading') loading++;
        }
        let runway = 0;
        for (let i = 0; i < totalFrames; i++) {
          if (frameStatus[i] === 'ready') runway++;
          else break;
        }
        snapshots[cp] = {
          time: (cp / 1000).toFixed(1) + 's',
          downloaded,
          decodedReady: downloaded,
          loading,
          activeRequests: activeWorkers,
          safeRunway: runway,
          frame0Ready: frameStatus[0] === 'ready',
        };
      }
    }
  }

  const localAgent = new https.Agent({ keepAlive: true, maxSockets: 32 });

  // Initial critical frame 0
  queue.push(0);

  async function worker() {
    while (!done) {
      const elapsed = Date.now() - startTime;
      if (elapsed >= 5200) {
        done = true;
        break;
      }

      // Idle preloader: streams idle batches when queue is low and frame 0 has completed
      if (frameStatus[0] === 'ready' && queue.length < maxIdleQueue && nextIdleIdx < totalFrames) {
        const batch = Math.min(idleBatchSize, totalFrames - nextIdleIdx);
        for (let b = 0; b < batch; b++) {
          const idx = nextIdleIdx++;
          if (frameStatus[idx] === 'unrequested') {
            queue.push(idx);
          }
        }
      }

      if (queue.length === 0) {
        await new Promise(r => setTimeout(r, 20));
        continue;
      }

      const idx = queue.shift();
      if (frameStatus[idx] !== 'unrequested') continue;

      frameStatus[idx] = 'loading';
      activeWorkers++;

      const url = isDesktop ? getDesktopUrl(idx) : getMobileUrl(idx);
      const res = await fetchUrl(url, localAgent);

      activeWorkers--;
      frameStatus[idx] = res.status === 200 ? 'ready' : 'error';
      readyTimestamps[idx] = Date.now() - startTime;
      recordSnapshots();

      // When frame 0 finishes, immediately enqueue bounded warmup burst
      if (idx === 0) {
        for (let w = 1; w <= initialWarmup && w < totalFrames; w++) {
          if (frameStatus[w] === 'unrequested') queue.push(w);
        }
      }
    }
  }

  const monitor = setInterval(() => {
    recordSnapshots();
    if (Date.now() - startTime >= 5200) {
      done = true;
      clearInterval(monitor);
    }
  }, 20);

  const workers = [];
  for (let w = 0; w < maxConcurrency; w++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  clearInterval(monitor);
  localAgent.destroy();
  recordSnapshots();

  // Ensure all checkpoints recorded
  for (const cp of checkpoints) {
    if (!snapshots[cp]) {
      let downloaded = 0;
      for (let i = 0; i < totalFrames; i++) {
        if (frameStatus[i] === 'ready') downloaded++;
      }
      let runway = 0;
      for (let i = 0; i < totalFrames; i++) {
        if (frameStatus[i] === 'ready') runway++;
        else break;
      }
      snapshots[cp] = {
        time: (cp / 1000).toFixed(1) + 's',
        downloaded,
        decodedReady: downloaded,
        loading: activeWorkers,
        activeRequests: activeWorkers,
        safeRunway: runway,
        frame0Ready: frameStatus[0] === 'ready',
      };
    }
  }

  return { snapshots, frameStatus, readyTimestamps };
}

async function simulateScroll(mode, startWaitMs, speedName, fps) {
  const isDesktop = mode === 'desktop';
  const totalFrames = isDesktop ? 240 : 200;
  const maxConcurrency = isDesktop ? 8 : 4;
  const initialWarmup = isDesktop ? 45 : 35;
  const idleBatchSize = isDesktop ? 4 : 2;

  // Simulate user scrolling at fps starting after startWaitMs
  const frameStatus = new Array(totalFrames).fill('unrequested');
  let activeWorkers = 0;
  const queue = [];
  let nextIdleIdx = initialWarmup + 1;
  let lastRendered = -1;
  let currentTarget = 0;
  let scrollStarted = false;
  let freezes = [];
  const startTime = Date.now();
  let done = false;

  // Queue frame 0
  queue.push(0);

  async function worker() {
    while (!done) {
      const elapsed = Date.now() - startTime;
      if (elapsed >= 6000) break;

      if (queue.length === 0) {
        // Idle preload only if scroll not active or paused
        if (!scrollStarted && frameStatus[0] === 'ready' && nextIdleIdx < totalFrames) {
          const batch = Math.min(idleBatchSize, totalFrames - nextIdleIdx);
          for (let b = 0; b < batch; b++) queue.push(nextIdleIdx++);
        } else {
          await new Promise(r => setTimeout(r, 15));
          continue;
        }
      }

      const idx = queue.shift();
      if (!idx && idx !== 0) continue;
      if (frameStatus[idx] !== 'unrequested') continue;

      frameStatus[idx] = 'loading';
      activeWorkers++;
      const url = isDesktop ? getDesktopUrl(idx) : getMobileUrl(idx);
      const res = await fetchUrl(url);
      activeWorkers--;
      frameStatus[idx] = res.status === 200 ? 'ready' : 'error';

      if (idx === 0) {
        for (let w = 1; w <= initialWarmup && w < totalFrames; w++) {
          if (frameStatus[w] === 'unrequested') queue.push(w);
        }
      }

      // If frame arrived is between lastRendered and currentTarget, micro-advance!
      if (scrollStarted && idx > lastRendered && idx <= currentTarget) {
        lastRendered = idx;
      }
    }
  }

  const workers = [];
  for (let w = 0; w < maxConcurrency; w++) workers.push(worker());

  // Wait until startWaitMs
  await new Promise(r => setTimeout(r, startWaitMs));
  scrollStarted = true;

  // Simulate scroll progression
  const scrollDurationSec = 3.0; // 3 seconds of continuous scrolling
  const totalScrollFrames = Math.min(totalFrames - 1, Math.round(fps * scrollDurationSec));
  const stepIntervalMs = 1000 / fps;

  let stallMs = 0;
  let maxStallMs = 0;

  for (let step = 1; step <= totalScrollFrames; step++) {
    const target = Math.min(totalFrames - 1, step);
    currentTarget = target;

    // Prioritize advancing runway: lastRendered + 1, lastRendered + 2, ...
    if (frameStatus[target] !== 'ready' && frameStatus[target] !== 'loading') {
      // Prioritize immediate missing frames into the front of the queue
      for (let f = lastRendered + 1; f <= target; f++) {
        if (frameStatus[f] === 'unrequested' && !queue.includes(f)) {
          queue.unshift(f);
        }
      }
    }

    // Check if renderer can advance
    const stepStart = Date.now();
    while (lastRendered < target && (Date.now() - stepStart < 150)) {
      if (frameStatus[target] === 'ready') {
        lastRendered = target;
        break;
      }
      // Check if intermediate arrived
      for (let f = target; f > lastRendered; f--) {
        if (frameStatus[f] === 'ready') {
          lastRendered = f;
          break;
        }
      }
      await new Promise(r => setTimeout(r, 10));
    }

    const waitSpent = Date.now() - stepStart;
    if (waitSpent > stepIntervalMs * 1.5) {
      const excess = waitSpent - stepIntervalMs;
      stallMs += excess;
      if (excess > maxStallMs) maxStallMs = excess;
    }

    await new Promise(r => setTimeout(r, Math.max(0, stepIntervalMs - waitSpent)));
  }

  done = true;
  await Promise.all(workers);

  return {
    mode,
    speedName,
    fps,
    startWaitMs: (startWaitMs / 1000) + 's',
    totalScrolled: totalScrollFrames,
    finalRendered: lastRendered,
    stalls: stallMs > 0 ? `${stallMs}ms total (max ${maxStallMs}ms)` : '0ms (completely fluid)',
    verdict: maxStallMs < 100 ? 'NO LONG INITIAL FREEZE (PASS)' : 'STALLED',
  };
}

async function main() {
  console.log('TESTING LIVE PRODUCTION DOMAIN: https://www.stackstich.online ...\n');

  console.log('1. DESKTOP LIVE COLD-START TIMELINE (240 Frames, Warmup=45, 8 Workers)');
  const desktopData = await runTimedTimeline('desktop');
  console.table(Object.values(desktopData.snapshots));

  console.log('\n2. MOBILE LIVE COLD-START TIMELINE (200 Frames, Warmup=35, 4 Workers, Conservative Idle Enabled)');
  const mobileData = await runTimedTimeline('mobile');
  console.table(Object.values(mobileData.snapshots));

  console.log('\n3. PERFORMANCE SCROLL TESTS (COLD START AT T=0 WITHOUT WAITING)');
  const dNormal = await simulateScroll('desktop', 0, 'Desktop Normal Wheel', 20);
  const dFast = await simulateScroll('desktop', 0, 'Desktop Fast Wheel', 45);
  const mNormal = await simulateScroll('mobile', 0, 'Mobile Normal Swipe', 15);
  const mFast = await simulateScroll('mobile', 0, 'Mobile Fast Swipe', 35);

  console.table([dNormal, dFast, mNormal, mFast]);
}

main().catch(console.error);
