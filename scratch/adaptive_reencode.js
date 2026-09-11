const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function calculatePSNR(raw1, raw2) {
  if (raw1.length !== raw2.length) return 0;
  let sumSq = 0;
  for (let i = 0; i < raw1.length; i++) {
    const diff = raw1[i] - raw2[i];
    sumSq += diff * diff;
  }
  const mse = sumSq / raw1.length;
  if (mse === 0) return 100; // identical
  return 10 * Math.log10((255 * 255) / mse);
}

function calculateMAE(raw1, raw2) {
  if (raw1.length !== raw2.length) return 0;
  let sum = 0;
  for (let i = 0; i < raw1.length; i++) {
    sum += Math.abs(raw1[i] - raw2[i]);
  }
  return sum / raw1.length;
}

async function optimizeSingleFrame(srcPath, outPath) {
  const origStat = fs.statSync(srcPath);
  const origBytes = origStat.size;
  const origRaw = await sharp(srcPath).raw().toBuffer();
  const origMeta = await sharp(srcPath).metadata();

  // If already very compact (< 70 KB, e.g. dark minimal frames in clip-02),
  // preserve high fidelity (Q=90-94). Do NOT over-compress.
  if (origBytes < 70 * 1024) {
    const candidateBuf = await sharp(srcPath)
      .webp({ quality: 90, effort: 6, smartSubsample: true })
      .toBuffer();
    const candRaw = await sharp(candidateBuf).raw().toBuffer();
    const candPsnr = calculatePSNR(origRaw, candRaw);

    // If re-encoded is larger or PSNR < 45dB, keep original
    if (candidateBuf.length >= origBytes || candPsnr < 45.0) {
      fs.copyFileSync(srcPath, outPath);
      return {
        sizeBefore: origBytes,
        sizeAfter: origBytes,
        psnr: 100,
        mae: 0,
        quality: 'original',
        keptOriginal: true,
      };
    } else {
      fs.writeFileSync(outPath, candidateBuf);
      return {
        sizeBefore: origBytes,
        sizeAfter: candidateBuf.length,
        psnr: candPsnr,
        mae: calculateMAE(origRaw, candRaw),
        quality: 90,
        keptOriginal: false,
      };
    }
  }

  // Determine target size & minimum PSNR floor based on original complexity
  let targetBytes;
  let minPsnr;
  let minQ, maxQ;

  if (origBytes >= 180 * 1024) {
    // High complexity (e.g. dense foliage/detail in clip-01/02)
    targetBytes = 108 * 1024; // ~105-110 KB
    minPsnr = 37.5;
    minQ = 72;
    maxQ = 84;
  } else if (origBytes >= 120 * 1024) {
    // Medium-high complexity
    targetBytes = 94 * 1024; // ~90-95 KB
    minPsnr = 39.0;
    minQ = 76;
    maxQ = 86;
  } else {
    // Medium complexity (70KB - 120KB)
    targetBytes = 78 * 1024; // ~75-80 KB
    minPsnr = 40.5;
    minQ = 80;
    maxQ = 89;
  }

  // Binary search for highest quality that stays near targetBytes with PSNR >= minPsnr
  let low = minQ;
  let high = maxQ;
  let bestBuf = null;
  let bestQ = low;
  let bestPsnr = 0;
  let bestMae = 0;

  for (let iter = 0; iter < 7; iter++) {
    const mid = Math.round((low + high) / 2);
    const buf = await sharp(srcPath)
      .webp({ quality: mid, effort: 6, smartSubsample: true })
      .toBuffer();

    const raw = await sharp(buf).raw().toBuffer();
    const psnr = calculatePSNR(origRaw, raw);
    const mae = calculateMAE(origRaw, raw);

    if (buf.length <= targetBytes && psnr >= minPsnr) {
      bestBuf = buf;
      bestQ = mid;
      bestPsnr = psnr;
      bestMae = mae;
      low = mid + 1; // Try higher quality
    } else if (buf.length > targetBytes) {
      high = mid - 1; // Need smaller size
    } else {
      low = mid + 1; // Need higher PSNR
    }
  }

  // Fallback if binary search didn't land on a candidate
  if (!bestBuf) {
    bestQ = minQ;
    bestBuf = await sharp(srcPath)
      .webp({ quality: minQ, effort: 6, smartSubsample: true })
      .toBuffer();
    const raw = await sharp(bestBuf).raw().toBuffer();
    bestPsnr = calculatePSNR(origRaw, raw);
    bestMae = calculateMAE(origRaw, raw);
  }

  // Safety check: ensure size is actually reduced
  if (bestBuf.length >= origBytes) {
    fs.copyFileSync(srcPath, outPath);
    return {
      sizeBefore: origBytes,
      sizeAfter: origBytes,
      psnr: 100,
      mae: 0,
      quality: 'original',
      keptOriginal: true,
    };
  }

  fs.writeFileSync(outPath, bestBuf);
  return {
    sizeBefore: origBytes,
    sizeAfter: bestBuf.length,
    psnr: bestPsnr,
    mae: bestMae,
    quality: bestQ,
    keptOriginal: false,
  };
}

async function runAdaptiveReencode() {
  console.log('================================================================================');
  console.log('ADAPTIVE RE-ENCODING: CLIPS 1, 2, 3 (CLIP 4 UNTOUCHED)');
  console.log('================================================================================\n');

  const stagingDir = path.join(__dirname, 'optimized_hero');
  const clipsToOptimize = ['clip-01', 'clip-02', 'clip-03'];

  const statsByClip = {};

  for (const clip of clipsToOptimize) {
    console.log(`Processing ${clip} (60 frames)...`);
    const srcDir = path.join(__dirname, '..', 'public', 'hero', clip);
    const destDir = path.join(stagingDir, clip);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    let clipBefore = 0;
    let clipAfter = 0;
    let minPsnr = 100;
    let totalPsnr = 0;
    let frameResults = [];

    for (let f = 1; f <= 60; f++) {
      const filename = `frame-${f.toString().padStart(4, '0')}.webp`;
      const srcPath = path.join(srcDir, filename);
      const destPath = path.join(destDir, filename);

      const res = await optimizeSingleFrame(srcPath, destPath);
      clipBefore += res.sizeBefore;
      clipAfter += res.sizeAfter;
      totalPsnr += (res.psnr === 100 ? 50 : res.psnr); // cap identical at 50 for avg
      if (res.psnr < minPsnr) minPsnr = res.psnr;

      frameResults.push({
        frame: filename,
        ...res,
      });

      if (f % 15 === 0) {
        console.log(`  Processed ${f}/60 frames (current avg: ${(clipAfter / f / 1024).toFixed(1)} KB)...`);
      }
    }

    statsByClip[clip] = {
      frames: 60,
      sizeBeforeMB: (clipBefore / (1024 * 1024)).toFixed(2) + ' MB',
      sizeAfterMB: (clipAfter / (1024 * 1024)).toFixed(2) + ' MB',
      reductionPct: (((clipBefore - clipAfter) / clipBefore) * 100).toFixed(1) + '%',
      avgBeforeKB: (clipBefore / 60 / 1024).toFixed(1) + ' KB',
      avgAfterKB: (clipAfter / 60 / 1024).toFixed(1) + ' KB',
      minPsnrDb: minPsnr.toFixed(2) + ' dB',
      avgPsnrDb: (totalPsnr / 60).toFixed(2) + ' dB',
    };
  }

  // Clip 4 stats (untouched)
  const clip4Dir = path.join(__dirname, '..', 'public', 'hero', 'clip-04');
  let clip4Total = 0;
  for (let f = 1; f <= 60; f++) {
    const filename = `frame-${f.toString().padStart(4, '0')}.webp`;
    clip4Total += fs.statSync(path.join(clip4Dir, filename)).size;
  }
  statsByClip['clip-04 (untouched)'] = {
    frames: 60,
    sizeBeforeMB: (clip4Total / (1024 * 1024)).toFixed(2) + ' MB',
    sizeAfterMB: (clip4Total / (1024 * 1024)).toFixed(2) + ' MB',
    reductionPct: '0.0%',
    avgBeforeKB: (clip4Total / 60 / 1024).toFixed(1) + ' KB',
    avgAfterKB: (clip4Total / 60 / 1024).toFixed(1) + ' KB',
    minPsnrDb: '100.0 dB (Original)',
    avgPsnrDb: '100.0 dB (Original)',
  };

  console.log('\n================================================================================');
  console.log('RE-ENCODING SUMMARY BY CLIP');
  console.log('================================================================================');
  console.table(statsByClip);

  // Overall 240-frame totals
  const totalBefore = Object.values(statsByClip).reduce((sum, s) => sum + parseFloat(s.sizeBeforeMB), 0);
  const totalAfter = Object.values(statsByClip).reduce((sum, s) => sum + parseFloat(s.sizeAfterMB), 0);
  console.log('\n--- OVERALL 240-FRAME DESKTOP HERO METRICS ---');
  console.log(`Total Payload Before: ${totalBefore.toFixed(2)} MB`);
  console.log(`Total Payload After:  ${totalAfter.toFixed(2)} MB`);
  console.log(`Total Net Data Saved: ${(totalBefore - totalAfter).toFixed(2)} MB (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);
  console.log(`Average Frame Size:   ${((totalAfter * 1024) / 240).toFixed(1)} KB / frame`);
}

runAdaptiveReencode().catch(console.error);
