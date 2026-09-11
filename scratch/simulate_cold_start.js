const https = require('https');

// Measure live HTTPS download
function fetchFrame(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    https.get(url, (res) => {
      let bytes = 0;
      res.on('data', c => bytes += c.length);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          bytes,
          duration: Date.now() - start,
        });
      });
    }).on('error', err => resolve({ url, error: err.message, duration: Date.now() - start }));
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

// Bounded concurrent queue runner simulating the exact HeroCanvas scheduler over real network
async function runSimulator(mode = 'desktop') {
  const isDesktop = mode === 'desktop';
  const totalFrames = isDesktop ? 240 : 200;
  const maxConcurrency = isDesktop ? 8 : 4;
  const initialWarmup = isDesktop ? 30 : 20;

  console.log(`\n============================================================`);
  console.log(`RUNNING COLD-START LIVE NETWORK TEST: ${mode.toUpperCase()}`);
  console.log(`Max Concurrency: ${maxConcurrency}, Initial Warmup: ${initialWarmup} frames`);
  console.log(`============================================================`);

  const startTime = Date.now();
  const frameStatus = new Array(totalFrames).fill('unrequested'); // unrequested, loading, ready, error
  const frameTimings = new Array(totalFrames).fill(null);
  const queue = [];
  let activeWorkers = 0;
  let nextIdleIdx = initialWarmup + 1;

  // Snapshot checkpoints
  const checkpoints = [0, 500, 1000, 2000, 3000, 5000, 10000]; // ms
  const timelineSnapshots = {};

  function takeSnapshot(elapsed) {
    let downloaded = 0;
    let loading = 0;
    let runway = 0;

    for (let i = 0; i < totalFrames; i++) {
      if (frameStatus[i] === 'ready') downloaded++;
      else if (frameStatus[i] === 'loading') loading++;
    }

    // Safe runway = consecutive ready frames starting from 0
    for (let i = 0; i < totalFrames; i++) {
      if (frameStatus[i] === 'ready') runway++;
      else break;
    }

    return {
      elapsedSec: (elapsed / 1000).toFixed(1) + 's',
      downloaded,
      ready: downloaded,
      loading,
      activeRequests: activeWorkers,
      safeRunway: runway,
      frame0Ready: frameStatus[0] === 'ready',
      latestReadyIdx: downloaded > 0 ? Math.max(...frameStatus.map((s, idx) => s === 'ready' ? idx : -1)) : -1,
    };
  }

  // Snapshot poller
  const snapshotTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    for (const cp of checkpoints) {
      if (!timelineSnapshots[cp] && elapsed >= cp) {
        timelineSnapshots[cp] = takeSnapshot(cp);
      }
    }
  }, 50);

  // Pump scheduler
  return new Promise((resolve) => {
    function pump() {
      const elapsed = Date.now() - startTime;
      if (elapsed >= 10500) {
        // Stop after 10.5 seconds
        clearInterval(snapshotTimer);
        for (const cp of checkpoints) {
          if (!timelineSnapshots[cp]) {
            timelineSnapshots[cp] = takeSnapshot(cp);
          }
        }
        resolve({ mode, timelineSnapshots, frameTimings, totalDownloaded: frameStatus.filter(s => s === 'ready').length });
        return;
      }

      // Check if we can feed idle frames on desktop
      if (isDesktop && queue.length < maxConcurrency && nextIdleIdx < totalFrames) {
        // Feed up to 4 frames
        const batch = Math.min(4, totalFrames - nextIdleIdx);
        for (let b = 0; b < batch; b++) {
          const idx = nextIdleIdx++;
          if (frameStatus[idx] === 'unrequested') {
            queue.push(idx);
          }
        }
      }

      while (activeWorkers < maxConcurrency && queue.length > 0) {
        const idx = queue.shift();
        if (frameStatus[idx] !== 'unrequested') continue;

        frameStatus[idx] = 'loading';
        activeWorkers++;
        const url = isDesktop ? getDesktopUrl(idx) : getMobileUrl(idx);
        const reqStart = Date.now() - startTime;

        fetchFrame(url).then(res => {
          activeWorkers--;
          const reqEnd = Date.now() - startTime;
          frameStatus[idx] = res.status === 200 ? 'ready' : 'error';
          frameTimings[idx] = { start: reqStart, end: reqEnd, duration: res.duration, bytes: res.bytes };

          // When frame 0 finishes, enqueue initial warmup burst
          if (idx === 0) {
            for (let w = 1; w <= initialWarmup && w < totalFrames; w++) {
              if (frameStatus[w] === 'unrequested') {
                queue.push(w);
              }
            }
          }

          pump();
        });
      }
    }

    // Step 1: Request frame 0
    frameStatus[0] = 'unrequested';
    queue.push(0);
    pump();
  });
}

async function main() {
  const desktopResult = await runSimulator('desktop');
  const mobileResult = await runSimulator('mobile');

  console.log('\n============================================================');
  console.log('DESKTOP TIMED FRAME-READINESS TABLE');
  console.log('============================================================');
  console.table(Object.values(desktopResult.timelineSnapshots));

  console.log('\n============================================================');
  console.log('MOBILE TIMED FRAME-READINESS TABLE');
  console.log('============================================================');
  console.table(Object.values(mobileResult.timelineSnapshots));

  // Analyze scroll simulations
  console.log('\n============================================================');
  console.log('SCROLL SIMULATION ANALYSIS (DESKTOP)');
  console.log('============================================================');
  
  const scrollSpeeds = [
    { name: 'Normal Scroll', fps: 21 }, // 21 frames/sec = ~300px/s (~3 mouse wheel clicks/sec)
    { name: 'Fast Scroll', fps: 45 },   // 45 frames/sec = ~650px/s (vigorous scroll)
  ];

  const waitTimes = [0, 1000, 3000, 5000, 10000]; // ms

  for (let speed of scrollSpeeds) {
    console.log(`\n--- ${speed.name} (${speed.fps} frames/sec) ---`);
    for (let wait of waitTimes) {
      const snap = desktopResult.timelineSnapshots[wait];
      const initialRunway = snap ? snap.safeRunway : 0;
      const initialDownloaded = snap ? snap.downloaded : 0;

      // Calculate time until user catches up to runway
      // At speed.fps, user consumes frames at speed.fps per sec.
      // Frames are being delivered at ~35 frames/sec (measured).
      const deliveryRate = 35; // frames per sec under 8 workers
      const netDeficit = speed.fps - deliveryRate;

      let freezeFrame = -1;
      let freezeDurationMs = 0;
      let status = '';

      if (initialRunway >= 240) {
        status = '100% PERFECT: Entire sequence already ready in memory/cache.';
      } else if (speed.fps <= deliveryRate) {
        if (initialRunway > 10) {
          status = `SMOOTH: Initial runway (${initialRunway} frames) buffers network; delivery (${deliveryRate} fps) keeps pace with scroll (${speed.fps} fps).`;
        } else {
          status = `BRIEF HESITATION at frame ${initialRunway}: initial runway is too thin on cold start.`;
        }
      } else {
        // User scrolls faster than delivery
        // Time to exhaust runway: initialRunway / netDeficit
        const timeToExhaustSec = initialRunway / netDeficit;
        freezeFrame = Math.min(239, Math.round(initialRunway + timeToExhaustSec * deliveryRate));
        freezeDurationMs = Math.round((70 * (speed.fps / deliveryRate)));
        status = `FREEZES around frame ${freezeFrame}: user scroll (${speed.fps} fps) outpaces network delivery (${deliveryRate} fps). Runway exhausted in ${timeToExhaustSec.toFixed(1)}s.`;
      }

      console.log(`Wait ${wait / 1000}s before scroll | Runway: ${initialRunway.toString().padStart(3, ' ')} frames | Total Loaded: ${initialDownloaded.toString().padStart(3, ' ')}/240 | ${status}`);
    }
  }
}

main();
