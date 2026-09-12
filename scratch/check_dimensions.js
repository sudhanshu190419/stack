const sharp = require('sharp');

async function check() {
  const m2 = await sharp('public/hero/clip-02/frame-0001.webp').metadata();
  console.log('Clip 2 Frame 1:', m2.width, 'x', m2.height);
  const m3 = await sharp('public/hero/clip-03/frame-0001.webp').metadata();
  console.log('Clip 3 Frame 1:', m3.width, 'x', m3.height);
}

check().catch(console.error);
