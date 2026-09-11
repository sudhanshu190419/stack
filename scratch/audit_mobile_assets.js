const fs = require('fs');
const path = require('path');

function getWebpDimensions(buffer) {
  if (buffer.length < 30) return null;
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || webp !== 'WEBP') return null;

  const chunkType = buffer.toString('ascii', 12, 16);
  if (chunkType === 'VP8 ') {
    const keyframe = buffer.readUInt8(23) === 0x9d && buffer.readUInt8(24) === 0x01 && buffer.readUInt8(25) === 0x2a;
    if (keyframe) {
      const width = buffer.readUInt16LE(26) & 0x3fff;
      const height = buffer.readUInt16LE(28) & 0x3fff;
      return { width, height, format: 'VP8' };
    }
  } else if (chunkType === 'VP8L') {
    const b0 = buffer.readUInt8(21);
    const b1 = buffer.readUInt8(22);
    const b2 = buffer.readUInt8(23);
    const b3 = buffer.readUInt8(24);
    const width = 1 + (((b1 & 0x3f) << 8) | b0);
    const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
    return { width, height, format: 'VP8L' };
  } else if (chunkType === 'VP8X') {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height, format: 'VP8X' };
  }
  return null;
}

const mobileDir = path.join(__dirname, '..', 'public', 'hero_mobile');
const clips = fs.readdirSync(mobileDir).filter(f => fs.statSync(path.join(mobileDir, f)).isDirectory());

console.log('Found clips:', clips);

const audit = {};
let grandTotalBytes = 0;
let grandTotalFrames = 0;

for (const clip of clips) {
  const cDir = path.join(mobileDir, clip);
  const files = fs.readdirSync(cDir).filter(f => f.endsWith('.webp')).sort();
  let clipBytes = 0;
  const dimCounts = {};

  for (const f of files) {
    const fPath = path.join(cDir, f);
    const stat = fs.statSync(fPath);
    clipBytes += stat.size;
    grandTotalBytes += stat.size;
    grandTotalFrames++;

    const buf = fs.readFileSync(fPath);
    const dim = getWebpDimensions(buf);
    const key = dim ? `${dim.width}x${dim.height} (${dim.format})` : 'unknown';
    dimCounts[key] = (dimCounts[key] || 0) + 1;
  }

  audit[clip] = {
    frameCount: files.length,
    firstFile: files[0],
    lastFile: files[files.length - 1],
    totalBytes: clipBytes,
    totalMB: (clipBytes / (1024 * 1024)).toFixed(2),
    avgKB: (clipBytes / files.length / 1024).toFixed(1),
    dimensions: dimCounts
  };
}

console.log('--- MOBILE HERO ASSET AUDIT ---');
console.log(JSON.stringify(audit, null, 2));
console.log(`\nGrand Total Frames: ${grandTotalFrames}`);
console.log(`Grand Total Size: ${(grandTotalBytes / (1024 * 1024)).toFixed(2)} MB (${grandTotalBytes} bytes)`);
console.log(`Average File Size: ${(grandTotalBytes / grandTotalFrames / 1024).toFixed(1)} KB`);
