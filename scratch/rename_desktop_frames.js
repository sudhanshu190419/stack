const fs = require('fs');
const path = require('path');

const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04'];
const heroDir = path.join(__dirname, '..', 'public', 'hero');

console.log('Starting safe renaming of desktop hero frames...');

for (const clip of clips) {
  const clipDir = path.join(heroDir, clip);
  if (!fs.existsSync(clipDir)) {
    throw new Error(`Directory not found: ${clipDir}`);
  }

  // Get all webp files and sort them chronologically
  const files = fs.readdirSync(clipDir).filter(f => f.endsWith('.webp')).sort();
  if (files.length !== 60) {
    throw new Error(`Expected 60 files in ${clip}, but found ${files.length}`);
  }

  console.log(`\nProcessing ${clip}: ${files.length} files`);
  console.log(`  First: ${files[0]}`);
  console.log(`  Last:  ${files[files.length - 1]}`);

  // Step 1: Rename to temporary names to avoid any naming collisions
  const tempFiles = [];
  for (let i = 0; i < files.length; i++) {
    const oldPath = path.join(clipDir, files[i]);
    const tempName = `__temp_${(i + 1).toString().padStart(4, '0')}.webp`;
    const tempPath = path.join(clipDir, tempName);
    fs.renameSync(oldPath, tempPath);
    tempFiles.push(tempName);
  }

  // Step 2: Rename from temporary names to standardized target names: frame-0001.webp ... frame-0060.webp
  for (let i = 0; i < tempFiles.length; i++) {
    const tempPath = path.join(clipDir, tempFiles[i]);
    const finalName = `frame-${(i + 1).toString().padStart(4, '0')}.webp`;
    const finalPath = path.join(clipDir, finalName);
    fs.renameSync(tempPath, finalPath);
  }

  // Step 3: Verify the renamed folder
  const postFiles = fs.readdirSync(clipDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`  Renamed ${clip}: ${postFiles.length} files`);
  console.log(`  First: ${postFiles[0]}`);
  console.log(`  Last:  ${postFiles[postFiles.length - 1]}`);

  for (let i = 1; i <= 60; i++) {
    const expectedName = `frame-${i.toString().padStart(4, '0')}.webp`;
    if (!postFiles.includes(expectedName)) {
      throw new Error(`Missing expected file: ${clip}/${expectedName}`);
    }
  }
}

console.log('\nAll 4 desktop clips successfully renamed and verified!');
