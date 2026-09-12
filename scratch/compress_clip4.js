const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'backup_clip04');
const stagedDir = path.join(__dirname, 'staged_clip04');

if (!fs.existsSync(stagedDir)) fs.mkdirSync(stagedDir, { recursive: true });

async function compressFrame(filename) {
  const inPath = path.join(srcDir, filename);
  const outPath = path.join(stagedDir, filename);

  const origStat = fs.statSync(inPath);
  const origKb = origStat.size / 1024;
  const inMeta = await sharp(inPath).metadata();

  // For frames 1-25 (the heaviest cluster), target around 88-92 KB (strictly <= 94 KB)
  // For frames 26-60, target around 75-82 KB (strictly <= 92 KB)
  // This ensures the overall clip average is solidly within 80-84 KB and max <= 94 KB.
  const frameNum = parseInt(filename.replace(/\D/g, ''), 10);
  let targetKb = 79;
  if (frameNum <= 25) {
    targetKb = 86;
  } else if (frameNum >= 32 && frameNum <= 42) {
    targetKb = 73;
  } else {
    targetKb = 78;
  }

  let minQ = 40;
  let maxQ = 92;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  for (let iter = 0; iter < 10; iter++) {
    const q = Math.round((minQ + maxQ) / 2);
    const buf = await sharp(inPath)
      .webp({
        quality: q,
        effort: 6,
        smartSubsample: true
      })
      .toBuffer();

    const kb = buf.length / 1024;

    // Hard ceiling: must NOT exceed 94.0 KB
    if (kb <= 94.0) {
      const diff = Math.abs(kb - targetKb);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestBuf = buf;
        bestQ = q;
      }
    }

    if (kb > targetKb) {
      maxQ = q - 1;
    } else {
      minQ = q + 1;
    }

    if (minQ > maxQ) break;
  }

  // Safety fallback if bestBuf was not set under targetKb
  if (!bestBuf) {
    let fallbackQ = 70;
    while (fallbackQ >= 30) {
      const buf = await sharp(inPath)
        .webp({ quality: fallbackQ, effort: 6, smartSubsample: true })
        .toBuffer();
      if (buf.length / 1024 <= 94.0) {
        bestBuf = buf;
        bestQ = fallbackQ;
        break;
      }
      fallbackQ -= 5;
    }
  }

  fs.writeFileSync(outPath, bestBuf);
  const outMeta = await sharp(outPath).metadata();

  // Verify geometry preservation
  if (inMeta.width !== outMeta.width || inMeta.height !== outMeta.height) {
    throw new Error(`Geometry mismatch on ${filename}: ${inMeta.width}x${inMeta.height} vs ${outMeta.width}x${outMeta.height}`);
  }

  return {
    filename,
    origKb,
    newKb: bestBuf.length / 1024,
    quality: bestQ,
    width: outMeta.width,
    height: outMeta.height
  };
}

async function run() {
  console.log('=== ADAPTIVELY COMPRESSING ALL 60 FRAMES OF CLIP 4 ===');
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`Found ${files.length} frames in backup.`);

  const results = [];
  for (const file of files) {
    const r = await compressFrame(file);
    results.push(r);
    process.stdout.write(`\rCompressed ${results.length}/${files.length}: ${file} -> ${r.newKb.toFixed(1)} KB (Q: ${r.quality})`);
  }
  console.log('\nCompression complete. Running audit...');

  const sizes = results.map(r => r.newKb);
  const origSizes = results.map(r => r.origKb);
  const totalOrigMb = origSizes.reduce((a,b)=>a+b,0) / 1024;
  const totalNewMb = sizes.reduce((a,b)=>a+b,0) / 1024;

  const sorted = [...sizes].sort((a,b)=>a-b);
  const avg = sorted.reduce((a,b)=>a+b,0) / sorted.length;
  const median = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const max = sorted[sorted.length - 1];
  const min = sorted[0];

  const audit = {
    totalFiles: results.length,
    totalOrigMb,
    totalNewMb,
    avgKb: avg,
    medianKb: median,
    p95Kb: p95,
    maxKb: max,
    minKb: min,
    reductionPercent: ((totalOrigMb - totalNewMb) / totalOrigMb) * 100,
    results
  };

  console.log('\n--- AUDIT TABLE ---');
  console.log(`Total Files:  ${audit.totalFiles}`);
  console.log(`Total Size:   ${audit.totalOrigMb.toFixed(2)} MB -> ${audit.totalNewMb.toFixed(2)} MB (${audit.reductionPercent.toFixed(1)}% reduction)`);
  console.log(`Average Size: ${audit.avgKb.toFixed(1)} KB (Target: 80-85 KB)`);
  console.log(`Median Size:  ${audit.medianKb.toFixed(1)} KB`);
  console.log(`P95 Size:     ${audit.p95Kb.toFixed(1)} KB`);
  console.log(`Max Size:     ${audit.maxKb.toFixed(1)} KB (Ceiling: <= 95 KB)`);
  console.log(`Min Size:     ${audit.minKb.toFixed(1)} KB`);

  fs.writeFileSync(path.join(__dirname, 'staged_clip04_audit.json'), JSON.stringify(audit, null, 2));
}

run().catch(console.error);
