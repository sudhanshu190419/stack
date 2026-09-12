const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = path.join(__dirname, '..', 'public', 'hero_mobile');

async function auditClip(clipName) {
  const dir = path.join(baseDir, clipName);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();

  const details = [];
  for (const f of files) {
    const fPath = path.join(dir, f);
    const stat = fs.statSync(fPath);
    const meta = await sharp(fPath).metadata();
    details.push({
      filename: f,
      sizeBytes: stat.size,
      sizeKb: stat.size / 1024,
      width: meta.width,
      height: meta.height
    });
  }

  const sizes = details.map(d => d.sizeKb).sort((a,b)=>a-b);
  const totalMb = sizes.reduce((a,b)=>a+b,0) / 1024;
  const avgKb = sizes.reduce((a,b)=>a+b,0) / sizes.length;
  const medianKb = sizes[Math.floor(sizes.length * 0.5)];
  const p95Kb = sizes[Math.floor(sizes.length * 0.95)];
  const maxKb = sizes[sizes.length - 1];
  const minKb = sizes[0];

  // Top 10 heaviest
  const top10 = [...details].sort((a,b)=>b.sizeKb - a.sizeKb).slice(0, 10);

  return {
    clipName,
    count: files.length,
    totalMb,
    avgKb,
    medianKb,
    p95Kb,
    maxKb,
    minKb,
    sampleDims: `${details[0].width}x${details[0].height}`,
    top10,
    details
  };
}

async function run() {
  console.log('=== AUDITING MOBILE HERO ASSETS ===');
  const c1 = await auditClip('clip-01');
  const c2 = await auditClip('clip-02');

  const totalMb = c1.totalMb + c2.totalMb;
  const avgKb = (c1.totalMb * 1024 + c2.totalMb * 1024) / (c1.count + c2.count);

  console.log('\n--- MOBILE CLIP AUDIT TABLE ---');
  console.log('| Clip | Frame Count | Total MB | Avg KB/frame | Median KB | P95 KB | Max KB | Min KB | Dimensions |');
  console.log('|---|---|---|---|---|---|---|---|---|');
  console.log(`| **Clip 1** | ${c1.count} | ${c1.totalMb.toFixed(2)} MB | ${c1.avgKb.toFixed(1)} KB | ${c1.medianKb.toFixed(1)} KB | ${c1.p95Kb.toFixed(1)} KB | ${c1.maxKb.toFixed(1)} KB | ${c1.minKb.toFixed(1)} KB | ${c1.sampleDims} |`);
  console.log(`| **Clip 2** | ${c2.count} | ${c2.totalMb.toFixed(2)} MB | ${c2.avgKb.toFixed(1)} KB | ${c2.medianKb.toFixed(1)} KB | ${c2.p95Kb.toFixed(1)} KB | ${c2.maxKb.toFixed(1)} KB | ${c2.minKb.toFixed(1)} KB | ${c2.sampleDims} |`);
  console.log(`| **Total**  | ${c1.count + c2.count} | ${totalMb.toFixed(2)} MB | ${avgKb.toFixed(1)} KB | — | — | — | — | — |`);

  console.log('\n--- TOP 10 HEAVIEST FRAMES IN CLIP 1 ---');
  c1.top10.forEach((t, i) => console.log(`  ${i+1}. ${t.filename}: ${t.sizeKb.toFixed(1)} KB`));

  console.log('\n--- TOP 10 HEAVIEST FRAMES IN CLIP 2 ---');
  c2.top10.forEach((t, i) => console.log(`  ${i+1}. ${t.filename}: ${t.sizeKb.toFixed(1)} KB`));

  fs.writeFileSync(path.join(__dirname, 'mobile_assets_audit.json'), JSON.stringify({ c1, c2, totalMb, avgKb }, null, 2));
}

run().catch(console.error);
