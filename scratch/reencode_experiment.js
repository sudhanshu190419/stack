const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Target file sizes in bytes
const TARGETS = [
  { label: 'A (120 KB)', targetBytes: 120 * 1024 },
  { label: 'B (100 KB)', targetBytes: 100 * 1024 },
  { label: 'C (80 KB)',  targetBytes: 80 * 1024 },
  { label: 'D (60 KB)',  targetBytes: 60 * 1024 },
];

// Representative test frames across different visual types
const TEST_FRAMES = [
  { clip: 'clip-01', frame: 'frame-0005.webp', desc: 'Clip 1 High-Frequency (Original 196.4 KB)' },
  { clip: 'clip-02', frame: 'frame-0005.webp', desc: 'Clip 2 Peak Complexity (Original 215.8 KB)' },
  { clip: 'clip-03', frame: 'frame-0055.webp', desc: 'Clip 3 Medium/Detailed (Original 150.1 KB)' },
  { clip: 'clip-04', frame: 'frame-0005.webp', desc: 'Clip 4 UI & Edges (Original 148.2 KB)' },
];

function calculatePSNR(buf1, buf2) {
  if (buf1.length !== buf2.length) return 0;
  let sumSquaredDiff = 0;
  for (let i = 0; i < buf1.length; i++) {
    const diff = buf1[i] - buf2[i];
    sumSquaredDiff += diff * diff;
  }
  const mse = sumSquaredDiff / buf1.length;
  if (mse === 0) return Infinity;
  const maxI = 255;
  return 10 * Math.log10((maxI * maxI) / mse);
}

function calculateMAE(buf1, buf2) {
  if (buf1.length !== buf2.length) return 0;
  let sumDiff = 0;
  for (let i = 0; i < buf1.length; i++) {
    sumDiff += Math.abs(buf1[i] - buf2[i]);
  }
  return sumDiff / buf1.length;
}

async function binarySearchQuality(sourcePath, targetBytes) {
  let low = 10;
  let high = 95;
  let bestBuffer = null;
  let bestQ = low;

  for (let iter = 0; iter < 9; iter++) {
    const mid = Math.round((low + high) / 2);
    const buf = await sharp(sourcePath)
      .webp({
        quality: mid,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();

    bestBuffer = buf;
    bestQ = mid;

    if (buf.length > targetBytes) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return { quality: bestQ, buffer: bestBuffer, sizeBytes: bestBuffer.length };
}

async function runExperiment() {
  const outputDir = path.join(__dirname, 'reencode_test');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('================================================================================');
  console.log('2. RE-ENCODING EXPERIMENT ON REPRESENTATIVE FRAMES (TARGETS: 120KB, 100KB, 80KB, 60KB)');
  console.log('================================================================================\n');

  const reportRows = [];

  for (const item of TEST_FRAMES) {
    const srcPath = path.join(__dirname, '..', 'public', 'hero', item.clip, item.frame);
    const origStat = fs.statSync(srcPath);
    const origRaw = await sharp(srcPath).raw().toBuffer();
    const origMeta = await sharp(srcPath).metadata();

    for (const t of TARGETS) {
      const { quality, buffer, sizeBytes } = await binarySearchQuality(srcPath, t.targetBytes);
      const outFilename = `${item.clip}_${item.frame.replace('.webp', '')}_${Math.round(sizeBytes/1024)}kb.webp`;
      const outPath = path.join(outputDir, outFilename);
      fs.writeFileSync(outPath, buffer);

      // Re-read decoded raw pixels to compute accurate visual difference metrics
      const newRaw = await sharp(buffer).raw().toBuffer();
      const psnr = calculatePSNR(origRaw, newRaw);
      const mae = calculateMAE(origRaw, newRaw);

      let artifactAssessment = '';
      if (psnr >= 42) {
        artifactAssessment = 'Perceptually Indistinguishable (Near-lossless fidelity)';
      } else if (psnr >= 38) {
        artifactAssessment = 'Excellent (No visible artifacts at 1x desktop viewing)';
      } else if (psnr >= 35) {
        artifactAssessment = 'Very Good (Subtle high-frequency smoothing in complex foliage)';
      } else {
        artifactAssessment = 'Noticeable Softening / Slight banding in flat gradients';
      }

      reportRows.push({
        frameDesc: item.desc,
        target: t.label,
        actualSize: (sizeBytes / 1024).toFixed(1) + ' KB',
        sizeReduction: (((origStat.size - sizeBytes) / origStat.size) * 100).toFixed(1) + '%',
        webpQuality: quality,
        PSNR_dB: psnr.toFixed(2) + ' dB',
        MAE_255: mae.toFixed(2),
        artifactAssessment,
      });
    }
  }

  console.table(reportRows);
}

runExperiment().catch(console.error);
