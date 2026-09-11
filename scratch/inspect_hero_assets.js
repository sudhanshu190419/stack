const fs = require('fs');
const path = require('path');

const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04', 'clip-05'];
const heroDir = path.join(__dirname, '..', 'public', 'hero');

function getWebpDimensions(buffer) {
  // WebP header parsing
  if (buffer.length < 30) return null;
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || webp !== 'WEBP') return null;

  const vp8 = buffer.toString('ascii', 12, 16);
  if (vp8 === 'VP8X') {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height, type: 'VP8X' };
  } else if (vp8 === 'VP8 ') {
    // Lossy
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height, type: 'VP8' };
  } else if (vp8 === 'VP8L') {
    // Lossless
    const b1 = buffer[21];
    const b2 = buffer[22];
    const b3 = buffer[23];
    const b4 = buffer[24];
    const width = 1 + (((b2 & 0x3f) << 8) | b1);
    const height = 1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
    return { width, height, type: 'VP8L' };
  }
  return null;
}

const stats = {};
let totalAllBytes = 0;
let totalAllFrames = 0;
let minAllSize = Infinity;
let maxAllSize = 0;
let minAllFile = '';
let maxAllFile = '';
const dimensionSet = new Set();

for (const clip of clips) {
  const clipPath = path.join(heroDir, clip);
  if (!fs.existsSync(clipPath)) {
    console.log(`Missing: ${clipPath}`);
    continue;
  }
  const files = fs.readdirSync(clipPath).filter(f => f.endsWith('.webp'));
  let clipBytes = 0;
  let minSize = Infinity;
  let maxSize = 0;
  let minFile = '';
  let maxFile = '';
  const clipDims = new Set();

  for (const f of files) {
    const filePath = path.join(clipPath, f);
    const st = fs.statSync(filePath);
    clipBytes += st.size;
    totalAllBytes += st.size;
    totalAllFrames++;

    if (st.size < minSize) { minSize = st.size; minFile = f; }
    if (st.size > maxSize) { maxSize = st.size; maxFile = f; }
    if (st.size < minAllSize) { minAllSize = st.size; minAllFile = `${clip}/${f}`; }
    if (st.size > maxAllSize) { maxAllSize = st.size; maxAllFile = `${clip}/${f}`; }

    // Sample dimensions of first, middle, last
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(40);
    fs.readSync(fd, buf, 0, 40, 0);
    fs.closeSync(fd);
    const dims = getWebpDimensions(buf);
    if (dims) {
      const dimKey = `${dims.width}x${dims.height} (${dims.type})`;
      clipDims.add(dimKey);
      dimensionSet.add(dimKey);
    }
  }

  stats[clip] = {
    count: files.length,
    firstFile: files[0],
    lastFile: files[files.length - 1],
    namingPattern: files[0] ? files[0].replace(/\d+/, 'XXXX') : '',
    totalBytes: clipBytes,
    totalMB: (clipBytes / (1024 * 1024)).toFixed(2),
    avgKB: files.length ? (clipBytes / files.length / 1024).toFixed(1) : 0,
    minKB: (minSize / 1024).toFixed(1),
    minFile,
    maxKB: (maxSize / 1024).toFixed(1),
    maxFile,
    dimensions: Array.from(clipDims)
  };
}

console.log(JSON.stringify({
  clips: stats,
  totalFrames: totalAllFrames,
  totalMB: (totalAllBytes / (1024 * 1024)).toFixed(2),
  avgKBPerFrame: (totalAllBytes / totalAllFrames / 1024).toFixed(1),
  minOverall: { sizeKB: (minAllSize / 1024).toFixed(1), file: minAllFile },
  maxOverall: { sizeKB: (maxAllSize / 1024).toFixed(1), file: maxAllFile },
  allDimensions: Array.from(dimensionSet)
}, null, 2));
