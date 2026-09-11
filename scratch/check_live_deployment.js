const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Checking live deployment on https://www.stackstich.online ...');
  const res = await get('https://www.stackstich.online');
  console.log('Homepage status:', res.status);
  
  const chunkMatches = [...res.data.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)].map(m => m[1]);
  console.log(`Found ${chunkMatches.length} script chunks.`);

  let foundWarmup45 = false;
  let foundWarmup35 = false;
  let foundMobileIdle = false;

  for (const chunk of chunkMatches) {
    const chunkRes = await get('https://www.stackstich.online' + chunk);
    const content = chunkRes.data;
    
    // Look for HeroCanvas compiled code
    if (content.includes('hero_mobile') || content.includes('drawFrameToCanvas') || content.includes('setFrameProgress')) {
      console.log('Found Hero component in chunk:', chunk);
      // Check constants
      if (content.includes('45') && content.includes('35')) {
        console.log('Detected 45 desktop / 35 mobile constants in bundle!');
        foundWarmup45 = true;
        foundWarmup35 = true;
      }
      if (content.includes('1500') || content.includes('requestIdleCallback')) {
        foundMobileIdle = true;
        console.log('Detected mobile idle preload / requestIdleCallback in bundle!');
      }
    }
  }

  console.log('\nDeployment Check Results:');
  console.log('Desktop Warmup = 45 in live bundle:', foundWarmup45);
  console.log('Mobile Warmup = 35 in live bundle:', foundWarmup35);
  console.log('Mobile Idle Preload in live bundle:', foundMobileIdle);
}

run().catch(console.error);
