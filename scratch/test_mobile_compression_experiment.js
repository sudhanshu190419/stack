const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outBase = path.join(__dirname, 'mobile_compression_tiers');
if (!fs.existsSync(outBase)) fs.mkdirSync(outBase, { recursive: true });

const targetTiers = [
  { name: '120kb', targetKb: 120 },
  { name: '100kb', targetKb: 100 },
  { name: '90kb', targetKb: 90 },
  { name: '80kb', targetKb: 80 },
  { name: '70kb', targetKb: 70 },
  { name: '60kb', targetKb: 60 }
];

const sampleSources = [
  { clip: 'clip-01', frame: 'frame-001.webp', path: 'public/hero_mobile/clip-01/frame-001.webp' },
  { clip: 'clip-01', frame: 'frame-099.webp', path: 'public/hero_mobile/clip-01/frame-099.webp' },
  { clip: 'clip-02', frame: 'frame-010.webp', path: 'public/hero_mobile/clip-02/frame-010.webp' }, // Heaviest Clip 2 frame
  { clip: 'clip-02', frame: 'frame-026.webp', path: 'public/hero_mobile/clip-02/frame-026.webp' }, // Complex UI frame
  { clip: 'clip-02', frame: 'frame-035.webp', path: 'public/hero_mobile/clip-02/frame-035.webp' }
];

async function encodeToTarget(inPath, targetKb) {
  let minQ = 25;
  let maxQ = 95;
  let bestBuf = null;
  let bestQ = 75;
  let bestDiff = Infinity;

  for (let i = 0; i < 8; i++) {
    const q = Math.round((minQ + maxQ) / 2);
    const buf = await sharp(inPath)
      .webp({ quality: q, effort: 5, smartSubsample: true })
      .toBuffer();
    const kb = buf.length / 1024;
    const diff = Math.abs(kb - targetKb);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestBuf = buf;
      bestQ = q;
    }

    if (kb > targetKb) maxQ = q - 1;
    else minQ = q + 1;
    if (minQ > maxQ) break;
  }

  return { buf: bestBuf, quality: bestQ, sizeKb: bestBuf.length / 1024 };
}

async function computePsnr(origBuf, compBuf) {
  const origRaw = await sharp(origBuf).raw().toBuffer({ resolveWithObject: true });
  const compRaw = await sharp(compBuf).raw().toBuffer({ resolveWithObject: true });
  const { data: d1, info } = origRaw;
  const { data: d2 } = compRaw;

  let sumSq = 0;
  const total = info.width * info.height * info.channels;
  for (let i = 0; i < total; i++) {
    const diff = d1[i] - d2[i];
    sumSq += diff * diff;
  }
  const mse = sumSq / total;
  return mse > 0 ? (10 * Math.log10((255 * 255) / mse)).toFixed(2) : '99.99';
}

async function run() {
  console.log('=== BENCHMARKING MOBILE COMPRESSION TIERS (120, 100, 90, 80, 70, 60 KB) ===');

  const tierSummary = {};
  for (const tier of targetTiers) {
    tierSummary[tier.name] = {
      targetKb: tier.targetKb,
      samples: [],
      avgSizeKb: 0,
      avgPsnr: 0
    };

    const dir = path.join(outBase, tier.name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let sumKb = 0;
    let sumPsnr = 0;

    for (const src of sampleSources) {
      const origBuf = fs.readFileSync(src.path);
      const { buf, quality, sizeKb } = await encodeToTarget(src.path, tier.targetKb);
      const outPath = path.join(dir, `${src.clip}_${src.frame}`);
      fs.writeFileSync(outPath, buf);

      const psnr = await computePsnr(origBuf, buf);
      sumKb += sizeKb;
      sumPsnr += parseFloat(psnr);

      tierSummary[tier.name].samples.push({
        source: `${src.clip}/${src.frame}`,
        origKb: (origBuf.length / 1024).toFixed(1),
        newKb: sizeKb.toFixed(1),
        quality,
        psnr
      });
    }

    tierSummary[tier.name].avgSizeKb = (sumKb / sampleSources.length).toFixed(1);
    tierSummary[tier.name].avgPsnr = (sumPsnr / sampleSources.length).toFixed(2);
  }

  console.log('\n--- MOBILE COMPRESSION TIERS AUDIT TABLE ---');
  console.log('| Tier | Target KB | Actual Avg KB | Avg PSNR (dB) | Visual Quality Status | 200-Frame Total MB | 4-Worker Throughput |');
  console.log('|---|---|---|---|---|---|---|');

  for (const [tName, data] of Object.entries(tierSummary)) {
    const totalMb = (parseFloat(data.avgSizeKb) * 200) / 1024;
    // Estimate worker throughput over 15 Mbps cellular connection:
    // transfer time per frame = (avgSizeKb * 8) / 15000 s = ms
    // with 4 workers: frames/s = 4 / (transfer + 25ms decode)
    const transferMs = (parseFloat(data.avgSizeKb) * 8 / 15000) * 1000;
    const estFps = (4 / ((transferMs + 25) / 1000)).toFixed(1);

    let qualityStatus = 'Excellent (Indistinguishable)';
    if (parseFloat(data.avgPsnr) < 38) qualityStatus = 'Moderate (Edge softening on text)';
    else if (parseFloat(data.avgPsnr) < 40) qualityStatus = 'Good (Minor loss in micro-UI)';
    else if (parseFloat(data.avgPsnr) >= 42) qualityStatus = 'Pristine (Broadcast fidelity)';

    console.log(`| **${tName}** | ${data.targetKb} KB | ${data.avgSizeKb} KB | ${data.avgPsnr} dB | ${qualityStatus} | ${totalMb.toFixed(1)} MB | ~${estFps} FPS |`);
  }

  fs.writeFileSync(path.join(__dirname, 'mobile_compression_experiment_results.json'), JSON.stringify(tierSummary, null, 2));
  console.log('\nSaved compression experiment results to scratch/mobile_compression_experiment_results.json');
}

run().catch(console.error);
