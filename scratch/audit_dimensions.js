const fs = require('fs');
const path = require('path');

function getWebpDimensions(buffer) {
  // Simple RIFF WebP parser
  if (buffer.length < 30) return null;
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || webp !== 'WEBP') return null;

  const chunkType = buffer.toString('ascii', 12, 16);
  if (chunkType === 'VP8 ') {
    // Lossy VP8
    const keyframe = buffer.readUInt8(23) === 0x9d && buffer.readUInt8(24) === 0x01 && buffer.readUInt8(25) === 0x2a;
    if (keyframe) {
      const width = buffer.readUInt16LE(26) & 0x3fff;
      const height = buffer.readUInt16LE(28) & 0x3fff;
      return { width, height, format: 'VP8' };
    }
  } else if (chunkType === 'VP8L') {
    // Lossless VP8L
    const b0 = buffer.readUInt8(21);
    const b1 = buffer.readUInt8(22);
    const b2 = buffer.readUInt8(23);
    const b3 = buffer.readUInt8(24);
    const width = 1 + (((b1 & 0x3f) << 8) | b0);
    const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
    return { width, height, format: 'VP8L' };
  } else if (chunkType === 'VP8X') {
    // Extended VP8X
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height, format: 'VP8X' };
  }
  return null;
}

const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04'];
const heroDir = path.join(__dirname, '..', 'public', 'hero');

const clipStats = {};
let totalBytes = 0;
let totalFrames = 0;

for (const clip of clips) {
  const dir = path.join(heroDir, clip);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();
  let clipBytes = 0;
  const dimensionsMap = new Map();

  for (const f of files) {
    const filePath = path.join(dir, f);
    const stat = fs.statSync(filePath);
    clipBytes += stat.size;
    totalBytes += stat.size;
    totalFrames++;

    const buf = fs.readFileSync(filePath);
    const dim = getWebpDimensions(buf);
    const dimStr = dim ? `${dim.width}x${dim.height} (${dim.format})` : 'unknown';
    dimensionsMap.set(dimStr, (dimensionsMap.get(dimStr) || 0) + 1);
  }

  clipStats[clip] = {
    frameCount: files.length,
    totalBytes: clipBytes,
    totalMB: (clipBytes / (1024 * 1024)).toFixed(2),
    avgKB: (clipBytes / files.length / 1024).toFixed(1),
    dimensions: Object.fromEntries(dimensionsMap)
  };
}

console.log('--- DETAILED DIMENSION AUDIT ---');
console.log(JSON.stringify(clipStats, null, 2));
console.log('\n--- TOTAL SEQUENCE STATS ---');
console.log(`Total Frames: ${totalFrames}`);
console.log(`Total Bytes: ${totalBytes} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`Average File Size: ${(totalBytes / totalFrames / 1024).toFixed(1)} KB`);
