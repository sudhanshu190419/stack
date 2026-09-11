const https = require('https');
const http = require('http');

function measureUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;

    client.get(url, (res) => {
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
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message, total: Date.now() - start });
    });
  });
}

async function testLiveMobile() {
  console.log('--- TESTING LIVE DOMAIN MOBILE FRAMES (https://stackstich.online) ---');
  const samples = [
    'https://stackstich.online/hero_mobile/clip-01/frame-001.webp',
    'https://stackstich.online/hero_mobile/clip-01/frame-025.webp',
    'https://stackstich.online/hero_mobile/clip-01/frame-050.webp',
    'https://stackstich.online/hero_mobile/clip-01/frame-075.webp',
    'https://stackstich.online/hero_mobile/clip-01/frame-100.webp',
    'https://stackstich.online/hero_mobile/clip-02/frame-001.webp',
    'https://stackstich.online/hero_mobile/clip-02/frame-050.webp',
    'https://stackstich.online/hero_mobile/clip-02/frame-100.webp',
  ];

  for (const s of samples) {
    const r = await measureUrl(s);
    console.log(`${s.split('/').slice(-2).join('/')} -> status ${r.status} | ${r.kb} KB | TTFB: ${r.ttfb}ms | Total: ${r.total}ms | Speed: ${r.mbps} Mbps | Cache: ${r.cacheControl}`);
  }
}

testLiveMobile();
