const https = require('https');

function check() {
  https.get('https://www.stackstich.online/?cb=' + Date.now(), res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const match = data.match(/buildId&quot;:&quot;([^&]+)&quot;/);
      const scripts = [...data.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)].map(m => m[1]);
      console.log('Homepage Status:', res.statusCode);
      console.log('Scripts:', scripts.length);
      console.log('Sample chunk:', scripts[0]);

      // Check frame-0005.webp
      https.get('https://www.stackstich.online/hero/clip-01/frame-0005.webp', imgRes => {
        let b = 0;
        imgRes.on('data', c => b += c.length);
        imgRes.on('end', () => {
          console.log('frame-0005.webp size:', b, 'bytes (' + (b/1024).toFixed(1) + ' KB)');
          console.log('Cache status:', imgRes.headers['x-vercel-cache']);
        });
      });
    });
  });
}

check();
