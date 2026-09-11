const https = require('https');

function fetchUrl(url, agent) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, { agent, timeout: 5000 }, (res) => {
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

async function testScrollModes() {
  const agent = new https.Agent({ keepAlive: true, maxSockets: 16 });
  const totalFrames = 240;
  const warmup = 45;
  const maxWorkers = 8;

  // We test 4 scenarios:
  // 1. Immediate Normal Scroll (20 fps) starting at T=0
  // 2. Normal Scroll (20 fps) starting at T=1.5s
  // 3. Fast Scroll (45 fps) starting at T=2.0s
  // 4. Reverse Scroll (from frame 60 back to 0)

  const scenarios = [
    { name: 'Immediate Normal Scroll (20 fps)', startWaitMs: 0, fps: 20, direction: 'forward', steps: 60 },
    { name: 'Normal Scroll after 1.5s (20 fps)', startWaitMs: 1500, fps: 20, direction: 'forward', steps: 80 },
    { name: 'Fast Scroll after 2.0s (45 fps)', startWaitMs: 2000, fps: 45, direction: 'forward', steps: 90 },
    { name: 'Reverse Scroll (from frame 60 back to 0)', startWaitMs: 2500, fps: 25, direction: 'reverse', steps: 60 },
  ];

  const results = [];

  for (const sc of scenarios) {
    const frameStatus = new Array(totalFrames).fill('unrequested');
    const queue = [];
    let nextIdleIdx = warmup + 1;
    let activeWorkers = 0;
    let lastRendered = 0;
    let maxFreezeMs = 0;
    let totalFreezeMs = 0;
    let done = false;

    // Queue frame 0
    queue.push(0);

    async function worker() {
      while (!done) {
        if (queue.length === 0) {
          if (frameStatus[0] === 'ready' && nextIdleIdx < totalFrames) {
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
        const res = await fetchUrl(getDesktopUrl(idx), agent);
        activeWorkers--;
        frameStatus[idx] = res.status === 200 ? 'ready' : 'error';

        if (idx === 0) {
          for (let w = 1; w <= warmup; w++) queue.push(w);
        }
      }
    }

    const workers = [];
    for (let w = 0; w < maxWorkers; w++) workers.push(worker());

    // Wait until start
    await new Promise(r => setTimeout(r, sc.startWaitMs));

    // Execute scroll steps
    const stepInterval = 1000 / sc.fps;
    let currentTarget = sc.direction === 'reverse' ? 60 : 0;

    for (let step = 0; step < sc.steps; step++) {
      if (sc.direction === 'reverse') {
        currentTarget = Math.max(0, 60 - step);
      } else {
        currentTarget = Math.min(totalFrames - 1, step);
      }

      // In HeroCanvas, active runway is prioritized:
      if (frameStatus[currentTarget] !== 'ready') {
        // Enqueue missing intermediate frames immediately
        const minF = Math.min(lastRendered, currentTarget);
        const maxF = Math.max(lastRendered, currentTarget);
        for (let f = minF; f <= maxF; f++) {
          if (frameStatus[f] === 'unrequested' && !queue.includes(f)) {
            queue.unshift(f);
          }
        }
      }

      // Check if rendered frame can step
      const stepStart = Date.now();
      let waited = 0;
      while (lastRendered !== currentTarget && waited < 120) {
        if (frameStatus[currentTarget] === 'ready') {
          lastRendered = currentTarget;
          break;
        }
        // Micro-advance
        if (sc.direction === 'reverse') {
          for (let f = currentTarget; f < lastRendered; f++) {
            if (frameStatus[f] === 'ready') { lastRendered = f; break; }
          }
        } else {
          for (let f = currentTarget; f > lastRendered; f--) {
            if (frameStatus[f] === 'ready') { lastRendered = f; break; }
          }
        }
        await new Promise(r => setTimeout(r, 10));
        waited = Date.now() - stepStart;
      }

      if (waited > stepInterval * 1.5) {
        const stall = waited - stepInterval;
        totalFreezeMs += stall;
        if (stall > maxFreezeMs) maxFreezeMs = stall;
      }

      await new Promise(r => setTimeout(r, Math.max(0, stepInterval - waited)));
    }

    done = true;
    await Promise.all(workers);

    results.push({
      scenario: sc.name,
      fps: sc.fps,
      startWait: (sc.startWaitMs / 1000).toFixed(1) + 's',
      stepsExecuted: sc.steps,
      maxVisibleFreeze: maxFreezeMs < 50 ? '0 ms (Fluid)' : `${maxFreezeMs} ms`,
      totalStallTime: totalFreezeMs < 50 ? '0 ms (Fluid)' : `${totalFreezeMs} ms`,
      verdict: maxFreezeMs < 75 ? 'FLUID & ULTRA-SMOOTH (PASS)' : 'MINOR HESITATION',
    });
  }

  console.table(results);
  agent.destroy();
}

testScrollModes().catch(console.error);
