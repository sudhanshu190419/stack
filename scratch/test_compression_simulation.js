const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'hero', 'clip-04');
const outBase = path.join(__dirname, 'compression_simulation');

const targetTiers = [
  { name: '100kb', targetKb: 100 },
  { name: '90kb', targetKb: 90 },
  { name: '80kb', targetKb: 80 }
];

async function encodeToTarget(inputPath, targetKb) {
  let minQ = 30;
  let maxQ = 95;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  for (let iter = 0; iter < 8; iter++) {
    const q = Math.round((minQ + maxQ) / 2);
    const buf = await sharp(inputPath)
      .webp({ quality: q, effort: 5 })
      .toBuffer();
    const kb = buf.length / 1024;
    const diff = Math.abs(kb - targetKb);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestBuf = buf;
      bestQ = q;
    }

    if (kb > targetKb) {
      maxQ = q - 1;
    } else {
      minQ = q + 1;
    }
    if (minQ > maxQ) break;
  }

  return { buf: bestBuf, quality: bestQ, sizeKb: bestBuf.length / 1024 };
}

async function run() {
  console.log('=== BENCHMARKING CLIP 4 COMPRESSION TIERS (ORIGINAL VS 100KB VS 90KB VS 80KB) ===');
  
  if (!fs.existsSync(outBase)) fs.mkdirSync(outBase, { recursive: true });
  for (const tier of targetTiers) {
    const tierDir = path.join(outBase, tier.name);
    if (!fs.existsSync(tierDir)) fs.mkdirSync(tierDir, { recursive: true });
  }

  // Representative frames spanning the whole clip
  const sampleFrameIndices = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  console.log(`Sampling ${sampleFrameIndices.length} representative frames across Clip 4...`);

  const compressionSummary = {
    original: [],
    '100kb': [],
    '90kb': [],
    '80kb': []
  };

  for (const idx of sampleFrameIndices) {
    const frameName = `frame-${idx.toString().padStart(4, '0')}.webp`;
    const framePath = path.join(srcDir, frameName);
    const origStat = fs.statSync(framePath);
    const origKb = origStat.size / 1024;

    compressionSummary.original.push({
      frameName,
      sizeKb: origKb,
      path: framePath
    });

    for (const tier of targetTiers) {
      const { buf, quality, sizeKb } = await encodeToTarget(framePath, tier.targetKb);
      const outPath = path.join(outBase, tier.name, frameName);
      fs.writeFileSync(outPath, buf);

      compressionSummary[tier.name].push({
        frameName,
        sizeKb,
        quality,
        path: outPath
      });
    }
  }

  console.log('Generated test buffers for 100kb, 90kb, and 80kb tiers.');

  // Now benchmark decode time in Node / browser or with sharp / createImageBitmap
  // To do true browser createImageBitmap benchmark, let's write a small evaluation payload
  fs.writeFileSync(path.join(__dirname, 'compression_simulation_summary.json'), JSON.stringify(compressionSummary, null, 2));
  console.log('Saved compression simulation manifest to scratch/compression_simulation_summary.json');
}

run().catch(console.error);
