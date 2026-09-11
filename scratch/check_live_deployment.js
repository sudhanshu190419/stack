const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://www.stackstich.online' + loc;
        return fetchText(loc).then(resolve, reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, text: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching live index from https://stackstich.online ...');
  const index = await fetchText('https://stackstich.online/?t=' + Date.now());
  console.log('Index status:', index.status);

  const jsMatches = [...index.text.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map(m => m[1]);
  console.log('Found JS bundles count:', jsMatches.length);

  let foundNewDeployment = false;
  for (const path of jsMatches) {
    const jsUrl = 'https://stackstich.online' + path;
    const jsRes = await fetchText(jsUrl);
    if (jsRes.text.includes('isFinalFrameRendered') || jsRes.text.includes('lockHeroBoundary') || jsRes.text.includes('onFinalFrameRendered')) {
      console.log('FOUND NEW CODE in bundle:', path);
      foundNewDeployment = true;
      break;
    }
  }

  console.log('>>> DEPLOYMENT STATUS: ' + (foundNewDeployment ? 'LIVE (Commit 41b4f85 is active!)' : 'STILL DEPLOYING (old bundle active)'));
}

main().catch(console.error);
