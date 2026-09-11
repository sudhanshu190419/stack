const https = require('https');

const agent = new https.Agent({ keepAlive: true, maxSockets: 16 });

function fetchUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, { agent, timeout: 6000 }, (res) => {
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
  const initialWarmup = isDesktop ? 30 : 20;

  const frameStatus = new Array(totalFrames).fill('unrequested');
  const readyTimestamps = new Array(totalFrames).fill(null);
  let activeWorkers = 0;
  const queue = [];
  let nextIdleIdx = initialWarmup + 1;

  const startTime = Date.now();
  let done = false;

  const checkpoints = [0, 500, 1000, 2000, 3000, 5000, 10000];
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

  // Queue initial frame 0
  queue.push(0);

  async function worker() {
    while (!done) {
      const elapsed = Date.now() - startTime;
      if (elapsed >= 10200) {
        done = true;
        break;
      }

      // Check if idle frames should be queued
      if (isDesktop && queue.length < maxConcurrency && nextIdleIdx < totalFrames) {
        const batch = Math.min(4, totalFrames - nextIdleIdx);
        for (let b = 0; b < batch; b++) {
          queue.push(nextIdleIdx++);
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
      const res = await fetchUrl(url);

      activeWorkers--;
      frameStatus[idx] = res.status === 200 ? 'ready' : 'error';
      readyTimestamps[idx] = Date.now() - startTime;
      recordSnapshots();

      if (idx === 0) {
        for (let w = 1; w <= initialWarmup && w < totalFrames; w++) {
          if (frameStatus[w] === 'unrequested') queue.push(w);
        }
      }
    }
  }

  // Monitor timer
  const monitor = setInterval(() => {
    recordSnapshots();
    if (Date.now() - startTime >= 10500) {
      done = true;
      clearInterval(monitor);
    }
  }, 25);

  // Spawn pool
  const workers = [];
  for (let w = 0; w < maxConcurrency; w++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  clearInterval(monitor);
  recordSnapshots();

  return snapshots;
}

async function main() {
  console.log('MEASURING LIVE DESKTOP & MOBILE TIMELINE...');
  const desktopSnapshots = await runTimedTimeline('desktop');
  const mobileSnapshots = await runTimedTimeline('mobile');

  console.log('\n--- DESKTOP TIMED FRAME READINESS (240 Frames) ---');
  console.table(Object.values(desktopSnapshots));

  console.log('\n--- MOBILE TIMED FRAME READINESS (200 Frames) ---');
  console.table(Object.values(mobileSnapshots));
}

main();
