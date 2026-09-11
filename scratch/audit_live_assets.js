const { fetchTimed, fetchMetadata } = require('./net_measure');

async function auditAssets() {
  console.log('=== AUDITING LIVE ASSETS FROM https://www.stackstich.online ===\n');

  // 1. Inspect live cache headers on sample frames
  const sampleUrls = [
    'https://www.stackstich.online/hero/clip-01/frame-0001.webp?v=2',
    'https://www.stackstich.online/hero/clip-01/frame-0030.webp?v=2',
    'https://www.stackstich.online/hero/clip-02/frame-0001.webp?v=2',
    'https://www.stackstich.online/hero/clip-03/frame-0001.webp?v=2',
    'https://www.stackstich.online/hero/clip-04/frame-0060.webp?v=2',
    'https://www.stackstich.online/hero_mobile/clip-01/frame-001.webp',
    'https://www.stackstich.online/hero_mobile/clip-02/frame-100.webp',
  ];

  console.log('--- 1. LIVE CACHE HEADERS AUDIT ---');
  for (const url of sampleUrls) {
    const res = await fetchTimed(url);
    console.log(`URL: ${url}`);
    console.log(`  Status: ${res.status}`);
    console.log(`  Content-Type: ${res.headers['content-type']}`);
    console.log(`  Content-Length: ${res.headers['content-length']} bytes (${Math.round(res.bytes / 1024)} KB)`);
    console.log(`  Cache-Control: ${res.headers['cache-control']}`);
    console.log(`  ETag: ${res.headers['etag']}`);
    console.log(`  Age: ${res.headers['age']}`);
    console.log(`  Server: ${res.headers['server']}`);
    console.log(`  x-vercel-cache: ${res.headers['x-vercel-cache']}`);
    console.log(`  x-vercel-id: ${res.headers['x-vercel-id']}`);
    console.log(`  TTFB: ${res.ttfb}ms, Total download: ${res.totalTime}ms\n`);
  }

  // 2. Desktop frames statistics (240 frames)
  console.log('--- 2. DESKTOP ASSETS SIZE AUDIT (240 frames) ---');
  let desktopTotalBytes = 0;
  let desktopMin = { size: Infinity, frame: '' };
  let desktopMax = { size: 0, frame: '' };

  const fs = require('fs');
  const path = require('path');

  for (let clip = 1; clip <= 4; clip++) {
    const clipDir = path.join(__dirname, '..', 'public', 'hero', `clip-${clip.toString().padStart(2, '0')}`);
    const files = fs.readdirSync(clipDir).filter(f => f.endsWith('.webp'));
    for (let f of files) {
      const stat = fs.statSync(path.join(clipDir, f));
      desktopTotalBytes += stat.size;
      if (stat.size < desktopMin.size) desktopMin = { size: stat.size, frame: `clip-0${clip}/${f}` };
      if (stat.size > desktopMax.size) desktopMax = { size: stat.size, frame: `clip-0${clip}/${f}` };
    }
  }

  const desktopAvg = desktopTotalBytes / 240;
  console.log(`Desktop Total Size   : ${(desktopTotalBytes / (1024 * 1024)).toFixed(2)} MB (${desktopTotalBytes} bytes)`);
  console.log(`Desktop Average Size : ${(desktopAvg / 1024).toFixed(1)} KB per frame`);
  console.log(`Desktop Min Frame    : ${desktopMin.frame} (${(desktopMin.size / 1024).toFixed(1)} KB)`);
  console.log(`Desktop Max Frame    : ${desktopMax.frame} (${(desktopMax.size / 1024).toFixed(1)} KB)`);

  // 3. Mobile frames statistics (200 frames)
  console.log('\n--- 3. MOBILE ASSETS SIZE AUDIT (200 frames) ---');
  let mobileTotalBytes = 0;
  let mobileMin = { size: Infinity, frame: '' };
  let mobileMax = { size: 0, frame: '' };

  for (let clip = 1; clip <= 2; clip++) {
    const clipDir = path.join(__dirname, '..', 'public', 'hero_mobile', `clip-${clip.toString().padStart(2, '0')}`);
    const files = fs.readdirSync(clipDir).filter(f => f.endsWith('.webp'));
    for (let f of files) {
      const stat = fs.statSync(path.join(clipDir, f));
      mobileTotalBytes += stat.size;
      if (stat.size < mobileMin.size) mobileMin = { size: stat.size, frame: `clip-0${clip}/${f}` };
      if (stat.size > mobileMax.size) mobileMax = { size: stat.size, frame: `clip-0${clip}/${f}` };
    }
  }

  const mobileAvg = mobileTotalBytes / 200;
  console.log(`Mobile Total Size    : ${(mobileTotalBytes / (1024 * 1024)).toFixed(2)} MB (${mobileTotalBytes} bytes)`);
  console.log(`Mobile Average Size  : ${(mobileAvg / 1024).toFixed(1)} KB per frame`);
  console.log(`Mobile Min Frame     : ${mobileMin.frame} (${(mobileMin.size / 1024).toFixed(1)} KB)`);
  console.log(`Mobile Max Frame     : ${mobileMax.frame} (${(mobileMax.size / 1024).toFixed(1)} KB)`);
}

auditAssets();
