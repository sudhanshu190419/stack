const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const content = await get('https://www.stackstich.online/_next/static/chunks/3kvxylrh022r1.js');
  const idx = content.indexOf('hero-scroll-trigger');
  console.log('--- Production Chunk context around hero-scroll-trigger ---');
  console.log(content.substring(idx - 600, idx + 1200));
}

main().catch(console.error);
