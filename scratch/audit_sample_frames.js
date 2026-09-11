const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function analyzeFrames() {
  const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04'];
  const samples = [5, 30, 55]; // early, middle, late

  console.log('================================================================================');
  console.log('1. SAMPLE IMAGE QUALITY AUDIT ACROSS ALL FOUR DESKTOP CLIPS');
  console.log('================================================================================\n');

  const detailedResults = [];
  let totalAllBytes = 0;
  let allFrameSizes = [];

  for (const clip of clips) {
    const dir = path.join(__dirname, '..', 'public', 'hero', clip);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();
    
    for (const f of files) {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      totalAllBytes += stat.size;
      allFrameSizes.push({ clip, file: f, bytes: stat.size });
    }

    for (const frameNum of samples) {
      const filename = `frame-${frameNum.toString().padStart(4, '0')}.webp`;
      const fullPath = path.join(dir, filename);
      const stat = fs.statSync(fullPath);
      const metadata = await sharp(fullPath).metadata();
      const stats = await sharp(fullPath).stats();

      // Estimate visual complexity using channel standard deviations & entropy
      const avgStdDev = (stats.channels[0].stdev + stats.channels[1].stdev + stats.channels[2].stdev) / 3;

      detailedResults.push({
        clip,
        frame: filename,
        position: frameNum === 5 ? 'early' : frameNum === 30 ? 'middle' : 'late',
        dimensions: `${metadata.width}x${metadata.height}`,
        sizeKB: (stat.size / 1024).toFixed(1) + ' KB',
        bytes: stat.size,
        format: metadata.format,
        hasAlpha: metadata.hasAlpha,
        space: metadata.space,
        channels: metadata.channels,
        bpp: ((stat.size * 8) / (metadata.width * metadata.height)).toFixed(3) + ' bits/px',
        stdDevComplexity: avgStdDev.toFixed(2),
      });
    }
  }

  console.table(detailedResults);

  allFrameSizes.sort((a, b) => a.bytes - b.bytes);
  const minFrame = allFrameSizes[0];
  const maxFrame = allFrameSizes[allFrameSizes.length - 1];
  const avgBytes = totalAllBytes / allFrameSizes.length;

  console.log('\n--- GLOBAL DESKTOP HERO ASSET STATS (240 Frames) ---');
  console.log(`Total Frame Count: ${allFrameSizes.length}`);
  console.log(`Total Payload Size: ${(totalAllBytes / (1024 * 1024)).toFixed(2)} MB (${totalAllBytes.toLocaleString()} bytes)`);
  console.log(`Average Frame Size: ${(avgBytes / 1024).toFixed(1)} KB`);
  console.log(`Smallest Frame: ${minFrame.clip}/${minFrame.file} (${(minFrame.bytes / 1024).toFixed(1)} KB)`);
  console.log(`Largest Frame: ${maxFrame.clip}/${maxFrame.file} (${(maxFrame.bytes / 1024).toFixed(1)} KB)`);
}

analyzeFrames().catch(console.error);
