const https = require('https');
const fs = require('fs');

function fetchText(urlStr) {
  return new Promise((resolve, reject) => {
    https.get(urlStr, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching live homepage HTML...');
  const page = await fetchText('https://www.stackstich.online/');
  console.log('Homepage status:', page.status);
  console.log('Homepage x-vercel-cache:', page.headers['x-vercel-cache']);
  console.log('Homepage x-vercel-id:', page.headers['x-vercel-id']);
  console.log('Homepage date:', page.headers['date']);

  const regex = /src=["'](\/_next\/static\/[^"']+)["']/g;
  let match;
  const scriptUrls = [];
  while ((match = regex.exec(page.data)) !== null) {
    scriptUrls.push(match[1]);
  }
  console.log(`Found ${scriptUrls.length} script tags:`, scriptUrls);

  // Search each script for HeroCanvas keywords
  for (const scriptPath of scriptUrls) {
    const fullUrl = 'https://www.stackstich.online' + scriptPath;
    const s = await fetchText(fullUrl);
    const hasCreateImageBitmap = s.data.includes('createImageBitmap');
    const hasMaxConcurrent = s.data.includes('MAX_CONCURRENT_DOWNLOADS') || s.data.includes('warmupBurst');
    const hasPrioritizeFramesAround = s.data.includes('prioritizeFramesAround');
    const hasStartStreaming = s.data.includes('startStreaming');
    const hasFetchAndDecode = s.data.includes('fetchAndDecodeFrame');

    console.log(`Script ${scriptPath}: len=${s.data.length}, createImageBitmap=${hasCreateImageBitmap}, fetchAndDecode=${hasFetchAndDecode}, prioritizeFramesAround=${hasPrioritizeFramesAround}, startStreaming=${hasStartStreaming}`);
  }
}

main().catch(console.error);
