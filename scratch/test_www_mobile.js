const https = require('https');

function measureUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    https.get(url, (res) => {
      let bytes = 0;
      let ttfb = Date.now() - start;
      res.on('data', (chunk) => {
        bytes += chunk.length;
      });
      res.on('end', () => {
        const total = Date.now() - start;
        resolve({
          url,
          status: res.statusCode,
          ttfb,
          total,
          bytes,
          kb: (bytes / 1024).toFixed(1),
          mbps: bytes > 0 ? ((bytes * 8) / ((total || 1) / 1000) / 1000000).toFixed(2) : 0,
          cacheControl: res.headers['cache-control'] || 'none',
          xVercelCache: res.headers['x-vercel-cache'] || 'none'
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message, total: Date.now() - start });
    });
  });
}

async function testLiveMobile() {
  console.log('--- TESTING LIVE DOMAIN (https://www.stackstich.online) ---');
  const samples = [
    'https://www.stackstich.online/hero_mobile/clip-01/frame-001.webp',
    'https://www.stackstich.online/hero_mobile/clip-01/frame-025.webp',
    'https://www.stackstich.online/hero_mobile/clip-01/frame-050.webp',
    'https://www.stackstich.online/hero_mobile/clip-01/frame-075.webp',
    'https://www.stackstich.online/hero_mobile/clip-01/frame-100.webp',
    'https://www.stackstich.online/hero_mobile/clip-02/frame-001.webp',
    'https://www.stackstich.online/hero_mobile/clip-02/frame-050.webp',
    'https://www.stackstich.online/hero_mobile/clip-02/frame-100.webp',
  ];

  for (const s of samples) {
    const r = await measureUrl(s);
    console.log(`${s.split('/').slice(-2).join('/')} -> status ${r.status} | ${r.kb} KB | TTFB: ${r.ttfb}ms | Total: ${r.total}ms | Speed: ${r.mbps} Mbps | Vercel: ${r.xVercelCache} | Cache: ${r.cacheControl}`);
  }
}

testLiveMobile();
