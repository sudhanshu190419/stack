const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  const root = await get('https://stackstich.online');
  console.log('Apex redirect status:', root.status, 'location:', root.headers.location);

  const www = await get('https://www.stackstich.online');
  console.log('WWW status:', www.status);
  console.log('Server:', www.headers.server);
  console.log('x-vercel-id:', www.headers['x-vercel-id']);
  console.log('x-vercel-cache:', www.headers['x-vercel-cache']);
  console.log('Age:', www.headers['age']);
  console.log('Cache-Control:', www.headers['cache-control']);

  const scriptRegex = /<script[^>]+src="([^"]+)"/g;
  let match;
  const scripts = [];
  while ((match = scriptRegex.exec(www.body)) !== null) {
    scripts.push(match[1]);
  }
  console.log('Scripts found:', scripts.length);
  for (let s of scripts) {
    console.log('Script:', s);
  }

  // Check if any bundle contains our keywords (e.g. idlePreloadNextIdx, DESKTOP_MAX_CONCURRENT, etc.)
  for (let s of scripts) {
    const scriptUrl = s.startsWith('http') ? s : 'https://www.stackstich.online' + s;
    const res = await get(scriptUrl);
    const hasIdlePreload = res.body.includes('requestIdleCallback') || res.body.includes('triggerIdlePreload') || res.body.includes('idlePreload');
    const has240Frames = res.body.includes('240');
    const hasHero = res.body.includes('hero');
    console.log(`Script ${s} (length ${res.body.length}): hasHero=${hasHero}, has240=${has240Frames}, hasIdlePreload=${hasIdlePreload}`);
  }
}
run();
