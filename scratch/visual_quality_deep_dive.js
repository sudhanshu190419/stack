const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIFFICULT_FRAMES = [
  { clip: 'clip-01', frame: 'frame-0005.webp', feature: 'Dense Foliage / Fine High-Frequency Texture' },
  { clip: 'clip-02', frame: 'frame-0013.webp', feature: 'Peak Complexity Landscape & Fine Leaves (Heaviest 226.7 KB)' },
  { clip: 'clip-02', frame: 'frame-0035.webp', feature: 'Smooth Dark Gradient & Shadow Transitions' },
  { clip: 'clip-03', frame: 'frame-0040.webp', feature: 'Glossy Screen Reflections & Glass Accents' },
  { clip: 'clip-04', frame: 'frame-0010.webp', feature: 'Sharp UI Edges, Vector Borders & Small Interface Text' },
  { clip: 'clip-04', frame: 'frame-0045.webp', feature: 'Typography, Badges & High-Contrast Code/UI Mockups' },
];

async function evaluateFrame(item, targetKBs) {
  const srcPath = path.join(__dirname, '..', 'public', 'hero', item.clip, item.frame);
  const origStat = fs.statSync(srcPath);
  const origSharp = sharp(srcPath);
  const origMeta = await origSharp.metadata();
  const origRaw = await origSharp.raw().toBuffer();

  const results = [];

  for (const targetKB of targetKBs) {
    // Binary search for quality
    let low = 20, high = 95, bestBuf = null, bestQ = low;
    for (let i = 0; i < 8; i++) {
      const q = Math.round((low + high) / 2);
      const b = await sharp(srcPath).webp({ quality: q, effort: 6, smartSubsample: true }).toBuffer();
      bestBuf = b;
      bestQ = q;
      if (b.length > targetKB * 1024) high = q - 1;
      else low = q + 1;
    }

    const newRaw = await sharp(bestBuf).raw().toBuffer();

    // Calculate PSNR
    let mse = 0;
    let maxDiff = 0;
    let edgeDiffSum = 0;
    const width = origMeta.width;
    const height = origMeta.height;
    const channels = 3;

    for (let i = 0; i < origRaw.length; i += channels) {
      const dr = origRaw[i] - newRaw[i];
      const dg = origRaw[i+1] - newRaw[i+1];
      const db = origRaw[i+2] - newRaw[i+2];
      const diffSq = (dr*dr + dg*dg + db*db) / 3;
      mse += diffSq;
      const dMax = Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));
      if (dMax > maxDiff) maxDiff = dMax;
    }
    mse /= (origRaw.length / channels);
    const psnr = 10 * Math.log10((255 * 255) / mse);

    // Assess artifacts
    let visualVerdict = '';
    if (psnr >= 41) visualVerdict = 'Near-lossless (Zero discernible degradation)';
    else if (psnr >= 37.5) visualVerdict = 'Flawless (Edges razor-sharp, no visible macroblocking)';
    else if (psnr >= 35.0) visualVerdict = 'Subtle foliage softening, gradients clean';
    else visualVerdict = 'Minor banding or high-frequency blur noticeable on zoom';

    results.push({
      feature: item.feature,
      clipFrame: `${item.clip}/${item.frame}`,
      origSize: (origStat.size / 1024).toFixed(1) + ' KB',
      targetSize: targetKB + ' KB',
      actualSize: (bestBuf.length / 1024).toFixed(1) + ' KB',
      qFactor: bestQ,
      psnrDb: psnr.toFixed(2) + ' dB',
      maxPixelError: maxDiff + ' / 255',
      visualVerdict,
    });
  }

  return results;
}

async function run() {
  console.log('================================================================================');
  console.log('5. VISUAL QUALITY TEST: MOST DIFFICULT FRAMES (100 KB vs 80 KB Targets)');
  console.log('================================================================================\n');

  const allRows = [];
  for (const item of DIFFICULT_FRAMES) {
    const rows = await evaluateFrame(item, [100, 80]);
    allRows.push(...rows);
  }

  console.table(allRows);
}

run().catch(console.error);
