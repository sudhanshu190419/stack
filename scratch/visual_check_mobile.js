const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const origBase = path.join(__dirname, 'backup_hero_mobile');
const stagedBase = path.join(__dirname, 'staged_hero_mobile');

async function compareFrame(clip, frameNum) {
  const filename = `frame-${frameNum.toString().padStart(3, '0')}.webp`;
  const origPath = path.join(origBase, clip, filename);
  const stagedPath = path.join(stagedBase, clip, filename);

  const origRaw = await sharp(origPath).raw().toBuffer({ resolveWithObject: true });
  const stagedRaw = await sharp(stagedPath).raw().toBuffer({ resolveWithObject: true });

  const { data: d1, info: i1 } = origRaw;
  const { data: d2, info: i2 } = stagedRaw;

  if (i1.width !== i2.width || i1.height !== i2.height) {
    throw new Error(`Dimension mismatch: ${i1.width}x${i1.height} vs ${i2.width}x${i2.height}`);
  }

  let sumSq = 0;
  let maxDiff = 0;
  const totalSamples = i1.width * i1.height * i1.channels;

  for (let i = 0; i < totalSamples; i++) {
    const diff = Math.abs(d1[i] - d2[i]);
    if (diff > maxDiff) maxDiff = diff;
    sumSq += diff * diff;
  }

  const mse = sumSq / totalSamples;
  const psnr = mse > 0 ? (10 * Math.log10((255 * 255) / mse)).toFixed(2) : '99.99';

  return {
    clip,
    filename,
    origKb: (fs.statSync(origPath).size / 1024).toFixed(1),
    stagedKb: (fs.statSync(stagedPath).size / 1024).toFixed(1),
    psnr,
    mse: mse.toFixed(3),
    maxDiff,
    dims: `${i1.width}x${i1.height}`
  };
}

async function run() {
  console.log('=== VISUAL FIDELITY AUDIT ON REPRESENTATIVE MOBILE FRAMES ===');
  const targetIndices = [1, 10, 20, 30, 40, 50, 70, 90, 100];
  const clips = ['clip-01', 'clip-02'];

  const results = [];
  for (const clip of clips) {
    console.log(`\n--- ${clip.toUpperCase()} INSPECTION ---`);
    for (const num of targetIndices) {
      const r = await compareFrame(clip, num);
      results.push(r);
      console.log(`  ${r.clip}/${r.filename} (${r.dims}): PSNR = ${r.psnr} dB | MSE = ${r.mse} | MaxDiff = ${r.maxDiff} | Size: ${r.origKb} KB -> ${r.stagedKb} KB`);
    }
  }

  const avgPsnr = (results.reduce((a,b)=>a+parseFloat(b.psnr),0)/results.length).toFixed(2);
  console.log(`\nOverall Average PSNR across all 18 representative frames: ${avgPsnr} dB`);

  fs.writeFileSync(path.join(__dirname, 'mobile_visual_fidelity_report.json'), JSON.stringify(results, null, 2));
}

run().catch(console.error);
