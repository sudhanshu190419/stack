const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = 'scratch/mobile_test_encodes';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const targets = [120, 100, 90, 80, 70, 60];

const testSources = [
  { name: 'c1_f001', path: 'public/hero_mobile/clip-01/frame-001.webp', origKB: 148.1 },
  { name: 'c1_f099', path: 'public/hero_mobile/clip-01/frame-099.webp', origKB: 177.6 },
  { name: 'c2_f026', path: 'public/hero_mobile/clip-02/frame-026.webp', origKB: 222.3 },
  { name: 'c2_f100', path: 'public/hero_mobile/clip-02/frame-100.webp', origKB: 140.3 }
];

async function encodeToTarget(sourcePath, targetKB, baseName) {
  let minQ = 20;
  let maxQ = 96;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  for (let iter = 0; iter < 10; iter++) {
    const q = Math.round((minQ + maxQ) / 2);
    const buf = await sharp(sourcePath)
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

  const outPath = path.join(outDir, baseName + '_target' + targetKB + 'kb_q' + bestQ + '.webp');
  fs.writeFileSync(outPath, bestBuf);
  return {
    outPath,
    quality: bestQ,
    actualKB: (bestBuf.length / 1024).toFixed(1),
    actualBytes: bestBuf.length
  };
}

async function run() {
  const results = {};
  for (const src of testSources) {
    results[src.name] = [];
    console.log('Processing ' + src.name + ' (orig ' + src.origKB + ' KB)...');
    for (const target of targets) {
      const enc = await encodeToTarget(src.path, target, src.name);
      results[src.name].push({ targetKB: target, ...enc });
      console.log('  Target: ' + target + ' KB -> Actual: ' + enc.actualKB + ' KB (q=' + enc.quality + ')');
    }
  }
  fs.writeFileSync('scratch/mobile_test_results.json', JSON.stringify(results, null, 2));
  console.log('All test encodes written to scratch/mobile_test_encodes/');
}

run().catch(console.error);
