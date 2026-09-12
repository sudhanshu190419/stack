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
  const html = await get('https://www.stackstich.online/');
  const regex = /\/_next\/static\/chunks\/[a-zA-Z0-9_\-\.]+\.js/g;
  const matches = Array.from(new Set(html.match(regex) || []));
  console.log('Found chunk scripts:', matches.length);

  for (const scriptUrl of matches) {
    const fullUrl = 'https://www.stackstich.online' + scriptUrl;
    const content = await get(fullUrl);
    if (content.includes('hero-scroll-trigger') || content.includes('isFinalFrameRendered') || content.includes('TOTAL_FRAMES')) {
      console.log('\n--- FOUND HERO CODE IN CHUNK:', scriptUrl);
      // Look for boundary gate code
      const hasGated = content.includes('isGated') || content.includes('lockHeroBoundary') || content.includes('releaseHeroBoundary');
      console.log('Contains boundary gate keywords:', hasGated);
      // Search for snippets
      const idx = content.indexOf('hero-scroll-trigger');
      console.log('Snippet around hero-scroll-trigger:');
      console.log(content.substring(Math.max(0, idx - 200), idx + 400));
    }
  }
}

main().catch(console.error);
