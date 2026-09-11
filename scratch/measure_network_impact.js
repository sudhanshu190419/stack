const https = require('https');

const agent = new https.Agent({ keepAlive: true, maxSockets: 16 });

function fetchUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    let ttfb = 0;
    const req = https.get(url, { agent, timeout: 5000 }, (res) => {
      ttfb = Date.now() - start;
      let bytes = 0;
      res.on('data', c => bytes += c.length);
      res.on('end', () => resolve({
        status: res.statusCode,
        bytes,
        ttfb,
        duration: Date.now() - start,
        transferTime: Date.now() - start - ttfb,
      }));
    });
    req.on('error', err => resolve({ status: 500, bytes: 0, duration: Date.now() - start, error: err.message }));
  });
}

function getDesktopUrl(idx) {
  const clip = Math.floor(idx / 60) + 1;
  const frame = (idx % 60) + 1;
  const clipStr = `clip-${clip.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frame.toString().padStart(4, '0')}.webp`;
  return `https://www.stackstich.online/hero/${clipStr}/${frameStr}?v=2`;
}

async function measureLiveBandwidth() {
  console.log('Measuring live WAN network performance on stackstich.online (8 workers)...');
  
  // Sample 20 frames across clips
  const testIndices = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 61, 75, 90, 121, 150, 181, 200, 210, 225, 239];
  const results = [];

  const start = Date.now();
  const promises = testIndices.map(async (idx) => {
    const res = await fetchUrl(getDesktopUrl(idx));
    return res;
  });

  const resList = await Promise.all(promises);
  const totalElapsed = Date.now() - start;

  let totalBytes = 0;
  let totalDuration = 0;
  let totalTtfb = 0;

  for (const r of resList) {
    if (r.status === 200) {
      totalBytes += r.bytes;
      totalDuration += r.duration;
      totalTtfb += r.ttfb;
    }
  }

  const validCount = resList.filter(r => r.status === 200).length;
  const avgTtfb = totalTtfb / validCount;
  const avgDuration = totalDuration / validCount;
  const avgBytes = totalBytes / validCount;
  
  // Throughput across 8 parallel worker connections:
  const aggregateBps = (totalBytes / (totalElapsed / 1000)); // bytes per second
  const aggregateMbps = (aggregateBps * 8) / (1024 * 1024);

  console.log(`\nLive Network Measurement Summary:`);
  console.log(`Average TTFB (latency): ${avgTtfb.toFixed(1)} ms`);
  console.log(`Average Frame Download Duration: ${avgDuration.toFixed(1)} ms (${(avgBytes / 1024).toFixed(1)} KB)`);
  console.log(`Measured Parallel Throughput (8 workers): ${(aggregateMbps).toFixed(2)} Mbps (${(aggregateBps / 1024).toFixed(1)} KB/s)`);

  // Frame sizes to model
  const models = [
    { label: 'Current (135.5 KB)', avgKB: 135.5 },
    { label: 'Target A (120 KB)',  avgKB: 120.0 },
    { label: 'Target B (100 KB)',  avgKB: 100.0 },
    { label: 'Target C (80 KB)',   avgKB: 80.0 },
    { label: 'Target D (60 KB)',   avgKB: 60.0 },
  ];

  const modelRows = [];

  for (const m of models) {
    // Under 8 parallel workers:
    // Transfer time per frame = avgTtfb + (m.avgKB * 1024) / (per-worker transfer rate)
    // Aggregate frames delivered per second = aggregateBps / (m.avgKB * 1024)
    const framesPerSec = (aggregateBps / (m.avgKB * 1024));
    
    // Time to deliver N frames: initial latency + (N / framesPerSec)
    // Preload 45 frames (initial warmup)
    const timePreload45 = (45 / framesPerSec);
    // Preload 100 frames
    const timePreload100 = (100 / framesPerSec);
    // Preload all 240 frames
    const timePreload240 = (240 / framesPerSec);

    modelRows.push({
      sizeScenario: m.label,
      avgFrameSize: m.avgKB.toFixed(1) + ' KB',
      framesPerSecDelivered: framesPerSec.toFixed(1) + ' fps',
      preload45Frames: timePreload45.toFixed(2) + ' s',
      preload100Frames: timePreload100.toFixed(2) + ' s',
      preload240Frames: timePreload240.toFixed(2) + ' s',
      totalHeroPayload: ((m.avgKB * 240) / 1024).toFixed(2) + ' MB',
      reductionVsCurrent: (((135.5 - m.avgKB) / 135.5) * 100).toFixed(1) + '%',
    });
  }

  console.log('\n================================================================================');
  console.log('4. NETWORK IMPACT: DELIVERED FRAMES/SEC & PRELOAD TIME COMPARISON');
  console.log('================================================================================');
  console.table(modelRows);

  agent.destroy();
}

measureLiveBandwidth().catch(console.error);
