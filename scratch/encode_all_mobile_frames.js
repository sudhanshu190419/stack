const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcBase = 'scratch/hero_backup_mobile';
const stagingBase = 'scratch/optimized_mobile_staging';

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

async function encodeFrame(srcPath, dstPath) {
  const origBytes = fs.statSync(srcPath).size;
  const origKB = origBytes / 1024;
  const targetKB = getAdaptiveTarget(origKB);

  let minQ = 30;
  let maxQ = 96;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  for (let iter = 0; iter < 8; iter++) {
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

  fs.writeFileSync(dstPath, bestBuf);
  return {
    origBytes,
    newBytes: bestBuf.length,
    bestQ
  };
}

async function processClip(clipName) {
  const srcDir = path.join(srcBase, clipName);
  const dstDir = path.join(stagingBase, clipName);
  if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`Starting ${clipName} (${files.length} frames)...`);

  const concurrency = 6;
  let index = 0;
  let totalOrig = 0;
  let totalNew = 0;
  const results = [];

  const worker = async () => {
    while (index < files.length) {
      const f = files[index++];
      const srcPath = path.join(srcDir, f);
      const dstPath = path.join(dstDir, f);
      const res = await encodeFrame(srcPath, dstPath);
      totalOrig += res.origBytes;
      totalNew += res.newBytes;
      results.push({ file: f, ...res });
      if (results.length % 20 === 0 || results.length === files.length) {
        console.log(`  [${clipName}] Processed ${results.length}/${files.length} frames...`);
      }
    }
  };

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  return {
    clipName,
    count: files.length,
    origMB: (totalOrig / (1024 * 1024)).toFixed(2),
    newMB: (totalNew / (1024 * 1024)).toFixed(2),
    origAvgKB: (totalOrig / files.length / 1024).toFixed(1),
    newAvgKB: (totalNew / files.length / 1024).toFixed(1),
    results
  };
}

async function main() {
  const start = Date.now();
  console.log('====================================================');
  console.log('RE-ENCODING ALL 200 MOBILE FRAMES (ADAPTIVE WEBP)');
  console.log('====================================================');

  const c1 = await processClip('clip-01');
  const c2 = await processClip('clip-02');

  const totalOrigMB = (parseFloat(c1.origMB) + parseFloat(c2.origMB)).toFixed(2);
  const totalNewMB = (parseFloat(c1.newMB) + parseFloat(c2.newMB)).toFixed(2);
  const savedMB = (totalOrigMB - totalNewMB).toFixed(2);
  const pctSaved = (((totalOrigMB - totalNewMB) / totalOrigMB) * 100).toFixed(1);
  const totalAvgKB = ((parseFloat(totalNewMB) * 1024) / 200).toFixed(1);

  console.log('\n====================================================');
  console.log('ENCODING COMPLETE:');
  console.log('  Clip-01: ' + c1.count + ' frames | ' + c1.origMB + ' MB -> ' + c1.newMB + ' MB (avg ' + c1.newAvgKB + ' KB)');
  console.log('  Clip-02: ' + c2.count + ' frames | ' + c2.origMB + ' MB -> ' + c2.newMB + ' MB (avg ' + c2.newAvgKB + ' KB)');
  console.log('  TOTAL: 200 frames | ' + totalOrigMB + ' MB -> ' + totalNewMB + ' MB (avg ' + totalAvgKB + ' KB)');
  console.log('  SAVINGS: ' + savedMB + ' MB (' + pctSaved + '% reduction)');
  console.log('  Duration: ' + ((Date.now() - start) / 1000).toFixed(1) + 's');
  console.log('====================================================');

  fs.writeFileSync('scratch/mobile_encode_summary.json', JSON.stringify({ c1, c2, totalOrigMB, totalNewMB, savedMB, pctSaved, totalAvgKB }, null, 2));
}

main().catch(console.error);
