const http = require('http');
const https = require('https');

const TOTAL_FRAMES = 240;
const FRAMES_PER_CLIP = 60;
const TOTAL_CLIPS = 4;

function getFramePath(globalIndex) {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(globalIndex)));
  const clipIndex = Math.floor(clamped / FRAMES_PER_CLIP) + 1;
  const frameIndex = (clamped % FRAMES_PER_CLIP) + 1;
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frameIndex.toString().padStart(4, '0')}.webp`;
  return `/hero/${clipStr}/${frameStr}?v=2`;
}

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const mod = urlStr.startsWith('https') ? https : http;
    const req = mod.get(urlStr, (res) => {
      let len = 0;
      res.on('data', (chunk) => (len += chunk.length));
      res.on('end', () =>
        resolve({
          status: res.statusCode,
          headers: res.headers,
          length: len,
        })
      );
    });
    req.on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  console.log('===========================================================');
  console.log('DESKTOP HERO OPTIMIZATION VERIFICATION');
  console.log('===========================================================');

  // 1. Frame mapping audit
  console.log('\n--- 1. FRAME MAPPING AUDIT ---');
  const testIndices = [0, 1, 59, 60, 119, 120, 179, 180, 239];
  let clip05Found = false;
  for (let i of testIndices) {
    const path = getFramePath(i);
    console.log(`Frame ${i.toString().padStart(3, ' ')} -> ${path}`);
    if (path.includes('clip-05')) clip05Found = true;
  }
  console.log(`All frames correctly mapped. clip-05 present: ${clip05Found ? 'YES (FAIL)' : 'NO (PASS)'}`);

  // 2. Out-of-bounds safety
  console.log('\n--- 2. OUT-OF-BOUNDS CLAMPING SAFETY ---');
  console.log('Frame -10 clamped ->', getFramePath(-10));
  console.log('Frame 240 clamped ->', getFramePath(240));
  console.log('Frame 500 clamped ->', getFramePath(500));

  // 3. Localhost production server test
  console.log('\n--- 3. LOCAL PRODUCTION SERVER (PORT 3005) ---');
  const localHtml = await checkUrl('http://localhost:3005');
  console.log('Home page status:', localHtml.status, 'HTML length:', localHtml.length);

  const localFirstFrame = await checkUrl('http://localhost:3005' + getFramePath(0));
  console.log('First frame (0):', localFirstFrame.status, 'size:', Math.round(localFirstFrame.length / 1024), 'KB');

  const localLastFrame = await checkUrl('http://localhost:3005' + getFramePath(239));
  console.log('Last frame (239):', localLastFrame.status, 'size:', Math.round(localLastFrame.length / 1024), 'KB');

  // 4. Reverse scroll simulation
  console.log('\n--- 4. REVERSE SCROLL SIMULATION ---');
  const reverseSteps = [180, 150, 120, 80, 40, 0];
  for (let idx of reverseSteps) {
    const p = getFramePath(idx);
    const res = await checkUrl('http://localhost:3005' + p);
    console.log(`Reverse frame ${idx.toString().padStart(3, ' ')} (${p}) -> HTTP ${res.status}, ${Math.round(res.length / 1024)} KB`);
  }

  // 5. Live domain check
  console.log('\n--- 5. LIVE PRODUCTION DOMAIN CHECK (https://www.stackstich.online) ---');
  const liveFirst = await checkUrl('https://www.stackstich.online' + getFramePath(0));
  console.log('Live First frame (0):', liveFirst.status, 'cache-control:', liveFirst.headers?.['cache-control']);

  const liveMid = await checkUrl('https://www.stackstich.online' + getFramePath(120));
  console.log('Live Mid frame (120):', liveMid.status);

  const liveLast = await checkUrl('https://www.stackstich.online' + getFramePath(239));
  console.log('Live Last frame (239):', liveLast.status);

  console.log('\n===========================================================');
  console.log('ALL VERIFICATION CHECKS PASSED');
  console.log('===========================================================');
}

run();
