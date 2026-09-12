const https = require('https');

function checkLiveFrame(path) {
  return new Promise((resolve) => {
    https.get('https://www.stackstich.online' + path, (res) => {
      let bytes = 0;
      res.on('data', c => bytes += c.length);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          contentLength: res.headers['content-length'],
          bytesDownloaded: bytes,
          kb: (bytes / 1024).toFixed(1)
        });
      });
    }).on('error', (e) => resolve({ path, error: e.message }));
  });
}

async function run() {
  console.log('=== CHECKING LIVE PRODUCTION MOBILE ASSET SIZES ===');
  const samples = [
    '/hero_mobile/clip-01/frame-001.webp',
    '/hero_mobile/clip-01/frame-050.webp',
    '/hero_mobile/clip-01/frame-099.webp',
    '/hero_mobile/clip-02/frame-001.webp',
    '/hero_mobile/clip-02/frame-010.webp',
    '/hero_mobile/clip-02/frame-026.webp',
    '/hero_mobile/clip-02/frame-050.webp',
    '/hero_mobile/clip-02/frame-099.webp'
  ];

  for (const s of samples) {
    const res = await checkLiveFrame(s);
    console.log(`${s}: Status ${res.status}, Size = ${res.kb} KB (Header content-length: ${res.contentLength})`);
  }
}

run().catch(console.error);
