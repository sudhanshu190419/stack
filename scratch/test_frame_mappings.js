const fs = require('fs');
const path = require('path');

const TOTAL_FRAMES = 240;
const FRAMES_PER_CLIP = 60;
const TOTAL_CLIPS = 4;

function getFramePath(globalIndex) {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(globalIndex)));
  const clipIndex = Math.floor(clamped / FRAMES_PER_CLIP) + 1;
  const frameIndex = (clamped % FRAMES_PER_CLIP) + 1;
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frameIndex.toString().padStart(4, '0')}.webp`;
  return `/hero/${clipStr}/${frameStr}`;
}

const MOBILE_TOTAL_FRAMES = 200;
const MOBILE_FRAMES_PER_CLIP = 100;

function getMobileFramePath(globalIndex) {
  const clamped = Math.max(0, Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor(globalIndex)));
  const clipIndex = Math.floor(clamped / MOBILE_FRAMES_PER_CLIP) + 1;
  const frameIndex = (clamped % MOBILE_FRAMES_PER_CLIP) + 1;
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frameIndex.toString().padStart(3, '0')}.webp`;
  return `/hero_mobile/${clipStr}/${frameStr}`;
}

console.log('--- TESTING DESKTOP 240 FRAMES ---');
let missingDesktop = 0;
for (let i = 0; i < TOTAL_FRAMES; i++) {
  const relPath = getFramePath(i);
  const diskPath = path.join(__dirname, '..', 'public', relPath);
  if (!fs.existsSync(diskPath)) {
    console.error(`MISSING: frame ${i} -> ${relPath} (disk: ${diskPath})`);
    missingDesktop++;
  }
}
console.log(`Desktop check complete: ${TOTAL_FRAMES} frames tested. Missing: ${missingDesktop}`);

console.log('\n--- KEY TRANSITIONS ---');
console.log('Frame 0   :', getFramePath(0));
console.log('Frame 59  :', getFramePath(59));
console.log('Frame 60  :', getFramePath(60));
console.log('Frame 119 :', getFramePath(119));
console.log('Frame 120 :', getFramePath(120));
console.log('Frame 179 :', getFramePath(179));
console.log('Frame 180 :', getFramePath(180));
console.log('Frame 239 :', getFramePath(239));

console.log('\n--- TESTING MOBILE 200 FRAMES ---');
let missingMobile = 0;
for (let i = 0; i < MOBILE_TOTAL_FRAMES; i++) {
  const relPath = getMobileFramePath(i);
  const diskPath = path.join(__dirname, '..', 'public', relPath);
  if (!fs.existsSync(diskPath)) {
    console.error(`MISSING: mobile frame ${i} -> ${relPath}`);
    missingMobile++;
  }
}
console.log(`Mobile check complete: ${MOBILE_TOTAL_FRAMES} frames tested. Missing: ${missingMobile}`);
