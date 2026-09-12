const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'decode_and_network_benchmark.json'), 'utf8'));

console.log('=== CLIP 4 SUBRANGES ANALYSIS ===');
Object.entries(data.clip4Subranges).forEach(([subrange, frames]) => {
  const sizes = frames.map(f => f.sizeKb);
  const fetches = frames.map(f => f.fetchDurMs);
  const decodes = frames.map(f => f.decodeDurMs);
  const totals = frames.map(f => f.totalDurMs);

  function s(arr) {
    const sorted = [...arr].sort((a,b)=>a-b);
    return {
      avg: (sorted.reduce((a,b)=>a+b,0) / sorted.length).toFixed(1),
      median: sorted[Math.floor(sorted.length * 0.5)].toFixed(1),
      max: sorted[sorted.length - 1].toFixed(1)
    };
  }

  const sSize = s(sizes);
  const sFetch = s(fetches);
  const sDecode = s(decodes);
  const sTotal = s(totals);

  console.log(`Subrange ${subrange} (${frames.length} frames):`);
  console.log(`  Size: Avg ${sSize.avg} KB (Max ${sSize.max} KB)`);
  console.log(`  Fetch: Avg ${sFetch.avg} ms (Max ${sFetch.max} ms)`);
  console.log(`  Decode: Avg ${sDecode.avg} ms (Max ${sDecode.max} ms)`);
  console.log(`  Total: Avg ${sTotal.avg} ms (Max ${sTotal.max} ms)`);
});

console.log('\n=== CONTROL CLIP 3 SUBRANGES ANALYSIS ===');
Object.entries(data.controlClip3Subrange).forEach(([subrange, frames]) => {
  const sizes = frames.map(f => f.sizeKb);
  const fetches = frames.map(f => f.fetchDurMs);
  const decodes = frames.map(f => f.decodeDurMs);
  const totals = frames.map(f => f.totalDurMs);

  function s(arr) {
    const sorted = [...arr].sort((a,b)=>a-b);
    return {
      avg: (sorted.reduce((a,b)=>a+b,0) / sorted.length).toFixed(1),
      median: sorted[Math.floor(sorted.length * 0.5)].toFixed(1),
      max: sorted[sorted.length - 1].toFixed(1)
    };
  }

  const sSize = s(sizes);
  const sFetch = s(fetches);
  const sDecode = s(decodes);
  const sTotal = s(totals);

  console.log(`Control Subrange ${subrange} (${frames.length} frames):`);
  console.log(`  Size: Avg ${sSize.avg} KB (Max ${sSize.max} KB)`);
  console.log(`  Fetch: Avg ${sFetch.avg} ms (Max ${sFetch.max} ms)`);
  console.log(`  Decode: Avg ${sDecode.avg} ms (Max ${sDecode.max} ms)`);
  console.log(`  Total: Avg ${sTotal.avg} ms (Max ${sTotal.max} ms)`);
});
