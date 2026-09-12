const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const backupBase = path.join(__dirname, 'backup_hero_mobile');
const stagedBase = path.join(__dirname, 'staged_hero_mobile');

if (!fs.existsSync(stagedBase)) fs.mkdirSync(stagedBase, { recursive: true });

async function compressSingleFrame(srcDir, outDir, clipName, filename, frameNum, expectedWidth, expectedHeight) {
  const inPath = path.join(srcDir, filename);
  const outPath = path.join(outDir, filename);

  const origStat = fs.statSync(inPath);
  const origKb = origStat.size / 1024;

  let targetKb = 77;
  if (clipName === 'clip-01') {
    if (frameNum <= 20) targetKb = 78;
    else if (frameNum >= 25 && frameNum <= 65) targetKb = 73;
    else targetKb = 78;
  } else {
    // clip-02
    if (frameNum >= 10 && frameNum <= 45) {
      targetKb = 84; // Complex UI region
    } else if (frameNum >= 50 && frameNum <= 75) {
      targetKb = 74;
    } else {
      targetKb = 78;
    }
  }

  let minQ = 35;
  let maxQ = 94;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  for (let iter = 0; iter < 7; iter++) {
    const q = Math.round((minQ + maxQ) / 2);
    const buf = await sharp(inPath)
      .webp({
        quality: q,
        effort: 5,
        smartSubsample: true
      })
      .toBuffer();

    const kb = buf.length / 1024;

    // Ceiling: strictly <= 89.8 KB
    if (kb <= 89.8) {
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

  if (!bestBuf) {
    let fallbackQ = 70;
    while (fallbackQ >= 30) {
      const buf = await sharp(inPath)
        .webp({ quality: fallbackQ, effort: 5, smartSubsample: true })
        .toBuffer();
      if (buf.length / 1024 <= 89.8) {
        bestBuf = buf;
        bestQ = fallbackQ;
        break;
      }
      fallbackQ -= 3;
    }
  }

  fs.writeFileSync(outPath, bestBuf);

  const meta = await sharp(outPath).metadata();
  if (meta.width !== expectedWidth || meta.height !== expectedHeight) {
    throw new Error(`Dimension mismatch in ${clipName}/${filename}: ${meta.width}x${meta.height} vs expected ${expectedWidth}x${expectedHeight}`);
  }

  return {
    clipName,
    filename,
    origKb,
    newKb: bestBuf.length / 1024,
    quality: bestQ,
    width: meta.width,
    height: meta.height
  };
}

async function compressClip(clipName, expectedWidth, expectedHeight) {
  const srcDir = path.join(backupBase, clipName);
  const outDir = path.join(stagedBase, clipName);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.webp')).sort();
  const results = new Array(files.length);

  const CONCURRENCY = 8;
  let nextIdx = 0;
  let completed = 0;

  async function worker() {
    while (nextIdx < files.length) {
      const idx = nextIdx++;
      const filename = files[idx];
      const r = await compressSingleFrame(srcDir, outDir, clipName, filename, idx + 1, expectedWidth, expectedHeight);
      results[idx] = r;
      completed++;
      process.stdout.write(`\r[${clipName}] Compressed ${completed}/${files.length}: ${filename} -> ${r.newKb.toFixed(1)} KB (Q: ${r.quality})`);
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) workers.push(worker());
  await Promise.all(workers);
  console.log('');
  return results;
}

async function run() {
  console.log('=== STARTING HIGH-THROUGHPUT PARALLEL MOBILE COMPRESSION ===');
  const t0 = Date.now();

  const c1Results = await compressClip('clip-01', 926, 1920);
  const c2Results = await compressClip('clip-02', 910, 1920);

  const all = [...c1Results, ...c2Results];
  const durSec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\nAll 200 frames compressed in ${durSec}s. Generating audit...`);

  function clipStats(results) {
    const origSizes = results.map(r => r.origKb);
    const newSizes = results.map(r => r.newKb).sort((a,b)=>a-b);
    const totalOrigMb = origSizes.reduce((a,b)=>a+b,0) / 1024;
    const totalNewMb = newSizes.reduce((a,b)=>a+b,0) / 1024;
    return {
      count: results.length,
      totalOrigMb,
      totalNewMb,
      avgKb: newSizes.reduce((a,b)=>a+b,0) / newSizes.length,
      medianKb: newSizes[Math.floor(newSizes.length * 0.5)],
      p95Kb: newSizes[Math.floor(newSizes.length * 0.95)],
      maxKb: newSizes[newSizes.length - 1],
      minKb: newSizes[0],
      reductionPercent: ((totalOrigMb - totalNewMb) / totalOrigMb) * 100
    };
  }

  const s1 = clipStats(c1Results);
  const s2 = clipStats(c2Results);
  const sTotal = {
    count: all.length,
    totalOrigMb: s1.totalOrigMb + s2.totalOrigMb,
    totalNewMb: s1.totalNewMb + s2.totalNewMb,
    avgKb: (s1.totalNewMb * 1024 + s2.totalNewMb * 1024) / all.length,
    maxKb: Math.max(s1.maxKb, s2.maxKb),
    minKb: Math.min(s1.minKb, s2.minKb),
    reductionPercent: (( (s1.totalOrigMb + s2.totalOrigMb) - (s1.totalNewMb + s2.totalNewMb) ) / (s1.totalOrigMb + s2.totalOrigMb)) * 100
  };

  console.log('\n======================================================');
  console.log('AUDIT OF STAGED MOBILE HERO ASSETS');
  console.log('======================================================');
  console.log(`Clip 1 (926x1920): Total ${s1.totalNewMb.toFixed(2)} MB | Avg ${s1.avgKb.toFixed(1)} KB | Max ${s1.maxKb.toFixed(1)} KB | Min ${s1.minKb.toFixed(1)} KB`);
  console.log(`Clip 2 (910x1920): Total ${s2.totalNewMb.toFixed(2)} MB | Avg ${s2.avgKb.toFixed(1)} KB | Max ${s2.maxKb.toFixed(1)} KB | Min ${s2.minKb.toFixed(1)} KB`);
  console.log(`Total Mobile:      Total ${sTotal.totalNewMb.toFixed(2)} MB (Target: <=15.5 MB) | Avg ${sTotal.avgKb.toFixed(1)} KB (Target: 75-80 KB) | Max ${sTotal.maxKb.toFixed(1)} KB (Target: <=90 KB)`);
  console.log(`Total Reduction:   -${(sTotal.totalOrigMb - sTotal.totalNewMb).toFixed(2)} MB (-${sTotal.reductionPercent.toFixed(1)}%)`);

  fs.writeFileSync(path.join(__dirname, 'staged_mobile_audit.json'), JSON.stringify({ s1, s2, sTotal, c1Results, c2Results }, null, 2));
}

run().catch(console.error);
