const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const backupDir = 'scratch/hero_backup_mobile';
const outDir = 'scratch/representative_samples';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function getAdaptiveTarget(origKB) {
  if (origKB <= 85) {
    return Math.max(68, Math.round(origKB * 0.88));
  } else if (origKB <= 140) {
    return Math.round(73 + (origKB - 85) * 0.30);
  } else if (origKB <= 180) {
    return Math.round(89 + (origKB - 140) * 0.23);
  } else {
    return Math.round(98 + (origKB - 180) * 0.20);
  }
}

const testList = [
  'clip-01/frame-001.webp',
  'clip-01/frame-048.webp',
  'clip-01/frame-099.webp',
  'clip-02/frame-001.webp',
  'clip-02/frame-026.webp',
  'clip-02/frame-045.webp',
  'clip-02/frame-061.webp',
  'clip-02/frame-100.webp'
];

async function compare(origPath, testBuf) {
  const origRaw = await sharp(origPath).raw().toBuffer({ resolveWithObject: true });
  const testRaw = await sharp(testBuf).raw().toBuffer({ resolveWithObject: true });

  const buf1 = origRaw.data;
  const buf2 = testRaw.data;
  const len = buf1.length;

  let sumSqDiff = 0;
  let maxDiff = 0;

  for (let i = 0; i < len; i++) {
    const diff = Math.abs(buf1[i] - buf2[i]);
    sumSqDiff += diff * diff;
    if (diff > maxDiff) maxDiff = diff;
  }

  const mse = sumSqDiff / len;
  const rmse = Math.sqrt(mse);
  const psnr = mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse);

  return { psnr: psnr.toFixed(2), rmse: rmse.toFixed(2), maxDiff };
}

async function encodeAdaptive(relPath) {
  const srcPath = path.join(backupDir, relPath);
  const origBytes = fs.statSync(srcPath).size;
  const origKB = origBytes / 1024;
  const targetKB = getAdaptiveTarget(origKB);

  let minQ = 30;
  let maxQ = 96;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  // Search for the quality setting that matches targetKB
  for (let iter = 0; iter < 10; iter++) {
    const q = Math.round((minQ + maxQ) / 2);
    const buf = await sharp(srcPath)
      .webp({ quality: q, effort: 6, smartSubsample: true })
      .toBuffer();
    const kb = buf.length / 1024;
    const diff = Math.abs(kb - targetKB);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestBuf = buf;
      bestQ = q;
    }

    if (kb > targetKB) {
      maxQ = q - 1;
    } else {
      minQ = q + 1;
    }
  }

  const outPath = path.join(outDir, relPath.replace('/', '_'));
  fs.writeFileSync(outPath, bestBuf);

  const metrics = await compare(srcPath, bestBuf);
  const origMeta = await sharp(srcPath).metadata();
  const newMeta = await sharp(bestBuf).metadata();

  return {
    frame: relPath,
    origKB: origKB.toFixed(1),
    targetKB: targetKB,
    actualKB: (bestBuf.length / 1024).toFixed(1),
    quality: bestQ,
    psnr_dB: metrics.psnr,
    rmse: metrics.rmse,
    dimsMatch: (origMeta.width === newMeta.width && origMeta.height === newMeta.height),
    dims: newMeta.width + 'x' + newMeta.height,
    psnrPass: parseFloat(metrics.psnr) >= 38.0
  };
}

async function run() {
  console.log('Encoding and validating 8 representative difficult frames...');
  const table = [];
  for (const f of testList) {
    const res = await encodeAdaptive(f);
    table.push(res);
  }
  console.table(table);
  const allPsnrPass = table.every(t => t.psnrPass);
  const allDimsMatch = table.every(t => t.dimsMatch);
  console.log('All PSNR >= 38 dB:', allPsnrPass ? 'YES' : 'NO');
  console.log('All Dimensions Preserved:', allDimsMatch ? 'YES' : 'NO');
}

run().catch(console.error);
