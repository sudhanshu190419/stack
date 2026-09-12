const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const origDir = path.join(__dirname, 'backup_clip04');
const compDir = path.join(__dirname, 'staged_clip04');

async function compareFrames(filename) {
  const origPath = path.join(origDir, filename);
  const compPath = path.join(compDir, filename);

  const origRaw = await sharp(origPath).raw().toBuffer({ resolveWithObject: true });
  const compRaw = await sharp(compPath).raw().toBuffer({ resolveWithObject: true });

  const { data: dOrig, info } = origRaw;
  const { data: dComp } = compRaw;

  let sumSqDiff = 0;
  let maxDiff = 0;
  const totalPixels = info.width * info.height;
  const totalChannels = info.channels;
  const totalSamples = totalPixels * totalChannels;

  for (let i = 0; i < totalSamples; i++) {
    const diff = Math.abs(dOrig[i] - dComp[i]);
    if (diff > maxDiff) maxDiff = diff;
    sumSqDiff += diff * diff;
  }

  const mse = sumSqDiff / totalSamples;
  const psnr = mse > 0 ? 10 * Math.log10((255 * 255) / mse) : 999;

  return {
    filename,
    width: info.width,
    height: info.height,
    channels: info.channels,
    mse: mse.toFixed(3),
    psnr: psnr.toFixed(2),
    maxDiff,
    origKb: (fs.statSync(origPath).size / 1024).toFixed(1),
    compKb: (fs.statSync(compPath).size / 1024).toFixed(1)
  };
}

async function run() {
  console.log('=== VISUAL FIDELITY AUDIT: ORIGINAL VS COMPRESSED CLIP 4 ===');
  const inspectList = [
    'frame-0001.webp',
    'frame-0005.webp',
    'frame-0010.webp',
    'frame-0015.webp',
    'frame-0020.webp',
    'frame-0025.webp',
    'frame-0030.webp',
    'frame-0040.webp',
    'frame-0050.webp',
    'frame-0060.webp'
  ];

  const results = [];
  for (const file of inspectList) {
    const res = await compareFrames(file);
    results.push(res);
    console.log(`${res.filename}: PSNR = ${res.psnr} dB | MSE = ${res.mse} | MaxDiff = ${res.maxDiff} | Size: ${res.origKb} KB -> ${res.compKb} KB`);
  }

  const avgPsnr = (results.reduce((a,b)=>a+parseFloat(b.psnr),0) / results.length).toFixed(2);
  console.log(`\nAverage PSNR across key frames: ${avgPsnr} dB (Typical high-fidelity broadcast standard is > 38-40 dB)`);
  fs.writeFileSync(path.join(__dirname, 'visual_fidelity_audit.json'), JSON.stringify(results, null, 2));
}

run().catch(console.error);
