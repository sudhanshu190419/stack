const fs = require('fs');
const path = require('path');
const https = require('https');

function getStats(arr) {
  arr.sort((a, b) => a - b);
  const totalBytes = arr.reduce((sum, v) => sum + v, 0);
  const totalMB = totalBytes / (1024 * 1024);
  const avgKB = (totalBytes / arr.length) / 1024;
  const medianKB = arr[Math.floor(arr.length / 2)] / 1024;
  const p95KB = arr[Math.floor(arr.length * 0.95)] / 1024;
  const maxKB = arr[arr.length - 1] / 1024;
  const minKB = arr[0] / 1024;
  return { totalMB, avgKB, medianKB, p95KB, maxKB, minKB, count: arr.length };
}

async function auditLocal() {
  console.log('=== LOCAL HERO ASSETS AUDIT ===');
  const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04'];
  const results = {};

  for (let c = 0; c < clips.length; c++) {
    const clipName = clips[c];
    const dir = path.join(__dirname, '..', 'public', 'hero', clipName);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
    const sizes = [];
    const frameDetails = [];

    for (const f of files) {
      const p = path.join(dir, f);
      const stat = fs.statSync(p);
      sizes.push(stat.size);
      frameDetails.push({ file: f, size: stat.size, kb: stat.size / 1024 });
    }

    results[clipName] = {
      stats: getStats(sizes),
      frames: frameDetails
    };
  }

  console.log('| Clip | Total MB | Avg KB | Median KB | P95 KB | Max KB | Min KB |');
  console.log('|------|----------|--------|-----------|--------|--------|--------|');
  for (const [name, data] of Object.entries(results)) {
    const s = data.stats;
    console.log(`| ${name} | ${s.totalMB.toFixed(2)} MB | ${s.avgKB.toFixed(1)} KB | ${s.medianKB.toFixed(1)} KB | ${s.p95KB.toFixed(1)} KB | ${s.maxKB.toFixed(1)} KB | ${s.minKB.toFixed(1)} KB |`);
  }

  fs.writeFileSync(path.join(__dirname, 'clip_sizes_audit.json'), JSON.stringify(results, null, 2));
  return results;
}

// Also verify live headers for sample frames from each clip
function checkLiveHeaders(url) {
  return new Promise((resolve, reject) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        status: res.statusCode,
        contentLength: res.headers['content-length'] ? parseInt(res.headers['content-length'], 10) : null,
        contentType: res.headers['content-type'],
        cacheControl: res.headers['cache-control'],
        contentEncoding: res.headers['content-encoding'],
        server: res.headers['server']
      });
    }).on('error', reject).end();
  });
}

async function verifyLive() {
  console.log('\n=== CHECKING LIVE PRODUCTION HEADERS ===');
  const samples = [
    'https://www.stackstich.online/hero/clip-01/frame-0001.webp?v=2',
    'https://www.stackstich.online/hero/clip-01/frame-0030.webp?v=2',
    'https://www.stackstich.online/hero/clip-02/frame-0030.webp?v=2',
    'https://www.stackstich.online/hero/clip-03/frame-0030.webp?v=2',
    'https://www.stackstich.online/hero/clip-04/frame-0001.webp?v=2',
    'https://www.stackstich.online/hero/clip-04/frame-0030.webp?v=2',
    'https://www.stackstich.online/hero/clip-04/frame-0060.webp?v=2'
  ];

  for (const s of samples) {
    try {
      const h = await checkLiveHeaders(s);
      console.log(s, '-> Status:', h.status, 'Content-Length:', (h.contentLength / 1024).toFixed(1) + ' KB', 'Cache-Control:', h.cacheControl);
    } catch (e) {
      console.error(s, '-> Error:', e.message);
    }
  }
}

async function main() {
  await auditLocal();
  await verifyLive();
}

main().catch(console.error);
