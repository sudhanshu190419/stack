const https = require('https');
const http = require('http');

const frames = [
  '/hero/clip-01/frame-0001.webp',
  '/hero/clip-01/frame-0050.webp',
  '/hero/clip-02/frame-0001.webp',
  '/hero/clip-03/frame-0050.webp',
  '/hero/clip-04/frame-0050.webp',
  '/hero/clip-05/frame-0100.webp',
];

function fetchMetrics(urlStr) {
  return new Promise((resolve) => {
    const mod = urlStr.startsWith('https') ? https : http;
    const t0 = Date.now();
    mod.get(urlStr, (res) => {
      let ttfb = Date.now() - t0;
      let totalBytes = 0;
      res.on('data', c => totalBytes += c.length);
      res.on('end', () => {
        const totalTime = Date.now() - t0;
        resolve({
          url: urlStr,
          status: res.statusCode,
          ttfb,
          totalTime,
          bytes: totalBytes,
          headers: res.headers,
        });
      });
    }).on('error', (err) => {
      resolve({ url: urlStr, error: err.message });
    });
  });
}

async function main() {
  console.log('=== CHECKING REDIRECTS ON ROOT DOMAIN (https://stackstich.online) ===');
  for (const f of frames) {
    const res = await fetchMetrics('https://stackstich.online' + f);
    console.log(`${f} -> status: ${res.status}, location: ${res.headers ? res.headers.location : 'none'}, time: ${res.totalTime}ms`);
  }

  console.log('\n=== CHECKING ASSETS ON WWW DOMAIN (https://www.stackstich.online) ===');
  for (const f of frames) {
    const res = await fetchMetrics('https://www.stackstich.online' + f);
    console.log(`${f}: status=${res.status}, size=${res.bytes}, ttfb=${res.ttfb}ms, total=${res.totalTime}ms, cache=${res.headers['x-vercel-cache']}, cc=${res.headers['cache-control']}, age=${res.headers['age']}, server=${res.headers['server']}`);
  }

  console.log('\n=== CHECKING SECOND LOAD (WARM CACHE ON EDGE) ===');
  for (const f of frames) {
    const res = await fetchMetrics('https://www.stackstich.online' + f);
    console.log(`${f}: status=${res.status}, size=${res.bytes}, ttfb=${res.ttfb}ms, total=${res.totalTime}ms, cache=${res.headers['x-vercel-cache']}, age=${res.headers['age']}`);
  }
}

main().catch(console.error);
