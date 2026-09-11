const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const testFrames = [
  'clip-01/frame-0001.webp',
  'clip-01/frame-0050.webp',
  'clip-01/frame-0100.webp',
  'clip-02/frame-0001.webp',
  'clip-02/frame-0050.webp',
  'clip-02/frame-0100.webp',
  'clip-03/frame-0001.webp',
  'clip-03/frame-0050.webp',
  'clip-03/frame-0100.webp',
  'clip-04/frame-0001.webp',
  'clip-04/frame-0050.webp',
  'clip-04/frame-0100.webp',
  'clip-05/frame-0001.webp',
  'clip-05/frame-0050.webp',
  'clip-05/frame-0100.webp',
];

function downloadFrame(f) {
  return new Promise((resolve) => {
    https.get('https://www.stackstich.online/hero/' + f, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({
          frame: f,
          status: res.statusCode,
          size: buf.length,
          hash: crypto.createHash('sha256').update(buf).digest('hex')
        });
      });
    }).on('error', (err) => resolve({ frame: f, error: err.message }));
  });
}

async function main() {
  console.log('Comparing local repository assets with live domain assets...');
  let allMatch = true;

  for (const f of testFrames) {
    const localPath = path.join(__dirname, '..', 'public', 'hero', f);
    const localBuf = fs.readFileSync(localPath);
    const localHash = crypto.createHash('sha256').update(localBuf).digest('hex');
    const localSize = localBuf.length;

    const remote = await downloadFrame(f);
    const match = localHash === remote.hash && localSize === remote.size;
    if (!match) allMatch = false;

    console.log(`[${f}] Match: ${match} | Local: ${localSize}B (${localHash.slice(0,8)}) | Remote: ${remote.size}B (${remote.hash ? remote.hash.slice(0,8) : 'ERR'})`);
  }

  console.log('\nAll checked assets byte-for-byte identical:', allMatch);
}

main().catch(console.error);
