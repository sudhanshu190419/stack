const fs = require('fs');
const path = require('path');

function getWebpDimensions(buffer) {
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
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height, type: 'VP8' };
  } else if (vp8 === 'VP8L') {
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

const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04'];
const heroDir = path.join(__dirname, '..', 'public', 'hero');

const summary = {};
let grandTotalBytes = 0;
let grandTotalFrames = 0;

for (const clip of clips) {
  const clipDir = path.join(heroDir, clip);
  const files = fs.readdirSync(clipDir).filter(f => f.endsWith('.webp')).sort();
  
  let clipBytes = 0;
  const dims = new Set();
  
  for (const f of files) {
    const fp = path.join(clipDir, f);
    const st = fs.statSync(fp);
    clipBytes += st.size;
    grandTotalBytes += st.size;
    grandTotalFrames++;

    const fd = fs.openSync(fp, 'r');
    const buf = Buffer.alloc(40);
    fs.readSync(fd, buf, 0, 40, 0);
    fs.closeSync(fd);
    const d = getWebpDimensions(buf);
    if (d) dims.add(`${d.width}x${d.height} (${d.type})`);
  }

  summary[clip] = {
    count: files.length,
    firstFile: files[0],
    lastFile: files[files.length - 1],
    totalMB: (clipBytes / (1024 * 1024)).toFixed(2),
    avgKB: (clipBytes / files.length / 1024).toFixed(1),
    dimensions: Array.from(dims)
  };
}

console.log(JSON.stringify({
  clips: summary,
  grandTotalFrames,
  grandTotalMB: (grandTotalBytes / (1024 * 1024)).toFixed(2),
  grandAvgKB: (grandTotalBytes / grandTotalFrames / 1024).toFixed(1)
}, null, 2));
