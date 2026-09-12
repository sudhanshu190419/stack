const fs = require('fs');
const path = require('path');

const origDir = path.join(__dirname, 'backup_clip04');
const newDir = path.join(__dirname, '..', 'public', 'hero', 'clip-04');

const files = fs.readdirSync(newDir).filter(f => f.endsWith('.webp')).sort();

const origSizes = files.map(f => fs.statSync(path.join(origDir, f)).size / 1024);
const newSizes = files.map(f => fs.statSync(path.join(newDir, f)).size / 1024);

function stats(arr) {
  const sorted = [...arr].sort((a,b)=>a-b);
  return {
    totalMb: sorted.reduce((a,b)=>a+b,0) / 1024,
    avgKb: sorted.reduce((a,b)=>a+b,0) / sorted.length,
    medianKb: sorted[Math.floor(sorted.length * 0.5)],
    p95Kb: sorted[Math.floor(sorted.length * 0.95)],
    maxKb: sorted[sorted.length - 1],
    minKb: sorted[0]
  };
}

const sOrig = stats(origSizes);
const sNew = stats(newSizes);

console.log('=== FINAL AUDIT OF DEPLOYED CLIP 4 ASSETS ===');
console.log(`Total file count: ${files.length} (Expected: 60)`);
console.log('\n| Metric | Original | Compressed | Target | Met? |');
console.log('|---|---|---|---|---|');
console.log(`| Total MB | ${sOrig.totalMb.toFixed(2)} MB | ${sNew.totalMb.toFixed(2)} MB | ≤ 4.80 MB | ${sNew.totalMb <= 4.80 ? 'YES' : 'NO'} |`);
console.log(`| Avg KB/frame | ${sOrig.avgKb.toFixed(1)} KB | ${sNew.avgKb.toFixed(1)} KB | 80–85 KB | ${sNew.avgKb >= 80.0 && sNew.avgKb <= 85.0 ? 'YES' : 'NO'} |`);
console.log(`| Median KB | ${sOrig.medianKb.toFixed(1)} KB | ${sNew.medianKb.toFixed(1)} KB | — | — |`);
console.log(`| P95 KB | ${sOrig.p95Kb.toFixed(1)} KB | ${sNew.p95Kb.toFixed(1)} KB | — | — |`);
console.log(`| Max KB/frame | ${sOrig.maxKb.toFixed(1)} KB | ${sNew.maxKb.toFixed(1)} KB | ≤ 95.0 KB | ${sNew.maxKb <= 95.0 ? 'YES' : 'NO'} |`);
console.log(`| Min KB/frame | ${sOrig.minKb.toFixed(1)} KB | ${sNew.minKb.toFixed(1)} KB | — | — |`);
console.log(`| Payload Reduction | — | -${((sOrig.totalMb - sNew.totalMb)/sOrig.totalMb * 100).toFixed(1)}% (-${(sOrig.totalMb - sNew.totalMb).toFixed(2)} MB) | — | YES |`);
