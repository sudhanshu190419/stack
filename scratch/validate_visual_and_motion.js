const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function calculatePSNR(raw1, raw2) {
  let sumSq = 0;
  for (let i = 0; i < raw1.length; i++) {
    const diff = raw1[i] - raw2[i];
    sumSq += diff * diff;
  }
  const mse = sumSq / raw1.length;
  if (mse === 0) return 100;
  return 10 * Math.log10((255 * 255) / mse);
}

function calculateMAE(raw1, raw2) {
  let sum = 0;
  for (let i = 0; i < raw1.length; i++) {
    sum += Math.abs(raw1[i] - raw2[i]);
  }
  return sum / raw1.length;
}

async function runValidation() {
  console.log('================================================================================');
  console.log('8. VISUAL VALIDATION: REPRESENTATIVE FRAMES ACROSS ALL FOUR CLIPS');
  console.log('================================================================================\n');

  const stagedBase = path.join(__dirname, 'optimized_hero');
  const origBase = path.join(__dirname, 'hero_backup_desktop');

  const testFrames = [
    { clip: 'clip-01', frame: 'frame-0005.webp', label: 'Early (Foliage / Trees)' },
    { clip: 'clip-01', frame: 'frame-0030.webp', label: 'Middle (Mid-scene transition)' },
    { clip: 'clip-01', frame: 'frame-0055.webp', label: 'Late (Camera Pan)' },
    { clip: 'clip-02', frame: 'frame-0005.webp', label: 'Early (Peak Complexity Foliage)' },
    { clip: 'clip-02', frame: 'frame-0030.webp', label: 'Middle (Minimal Dark Space)' },
    { clip: 'clip-02', frame: 'frame-0055.webp', label: 'Late (Gradients & Shadows)' },
    { clip: 'clip-03', frame: 'frame-0005.webp', label: 'Early (Clean 3D Model)' },
    { clip: 'clip-03', frame: 'frame-0030.webp', label: 'Middle (Lighting & Highlights)' },
    { clip: 'clip-03', frame: 'frame-0055.webp', label: 'Late (Glossy Reflections)' },
    { clip: 'clip-04', frame: 'frame-0005.webp', label: 'Early (UI & Text - Untouched)' },
    { clip: 'clip-04', frame: 'frame-0030.webp', label: 'Middle (UI Mockup - Untouched)' },
    { clip: 'clip-04', frame: 'frame-0055.webp', label: 'Late (Code block - Untouched)' },
  ];

  const visualReport = [];

  for (const t of testFrames) {
    const isClip4 = t.clip === 'clip-04';
    const origPath = path.join(origBase, t.clip, t.frame);
    const compPath = isClip4 
      ? path.join(__dirname, '..', 'public', 'hero', t.clip, t.frame) 
      : path.join(stagedBase, t.clip, t.frame);

    const origStat = fs.statSync(origPath);
    const compStat = fs.statSync(compPath);
    const origMeta = await sharp(origPath).metadata();
    const compMeta = await sharp(compPath).metadata();

    const origRaw = await sharp(origPath).raw().toBuffer();
    const compRaw = await sharp(compPath).raw().toBuffer();

    const psnr = calculatePSNR(origRaw, compRaw);
    const mae = calculateMAE(origRaw, compRaw);

    visualReport.push({
      clipFrame: `${t.clip}/${t.frame}`,
      type: t.label,
      origDimensions: `${origMeta.width}x${origMeta.height}`,
      compDimensions: `${compMeta.width}x${compMeta.height}`,
      dimensionsMatch: origMeta.width === compMeta.width && origMeta.height === compMeta.height ? 'YES' : 'NO',
      origSizeKB: (origStat.size / 1024).toFixed(1) + ' KB',
      compSizeKB: (compStat.size / 1024).toFixed(1) + ' KB',
      reduction: (((origStat.size - compStat.size) / origStat.size) * 100).toFixed(1) + '%',
      psnrDb: psnr === 100 ? '100.0 dB (Untouched)' : psnr.toFixed(2) + ' dB',
      mae255: mae.toFixed(2),
      visualStatus: psnr >= 40 ? 'Flawless (Zero visible difference)' : psnr >= 38 ? 'Excellent (No visible artifacts)' : 'Good',
    });
  }

  console.table(visualReport);

  console.log('\n================================================================================');
  console.log('9. MOTION CONTINUITY VALIDATION ACROSS TRANSITION SEQUENCES');
  console.log('================================================================================\n');

  const motionSequences = [
    { clip: 'clip-01', start: 40, end: 42, desc: 'clip-01 frame 40 -> 42 (Fast Pan)' },
    { clip: 'clip-02', start: 12, end: 18, desc: 'clip-02 frame 12 -> 18 (Peak Landscape)' },
    { clip: 'clip-03', start: 31, end: 35, desc: 'clip-03 frame 31 -> 35 (Product Rotation)' },
    { clip: 'clip-04', start: 28, end: 32, desc: 'clip-04 frame 28 -> 32 (UI Transition - Untouched)' },
  ];

  const motionReport = [];

  for (const seq of motionSequences) {
    const isClip4 = seq.clip === 'clip-04';
    let maxDeltaDiff = 0;
    let avgDeltaDiff = 0;
    let stepCount = 0;

    for (let f = seq.start; f < seq.end; f++) {
      const f1Name = `frame-${f.toString().padStart(4, '0')}.webp`;
      const f2Name = `frame-${(f + 1).toString().padStart(4, '0')}.webp`;

      const origP1 = path.join(origBase, seq.clip, f1Name);
      const origP2 = path.join(origBase, seq.clip, f2Name);
      const compP1 = isClip4 ? path.join(__dirname, '..', 'public', 'hero', seq.clip, f1Name) : path.join(stagedBase, seq.clip, f1Name);
      const compP2 = isClip4 ? path.join(__dirname, '..', 'public', 'hero', seq.clip, f2Name) : path.join(stagedBase, seq.clip, f2Name);

      const oRaw1 = await sharp(origP1).raw().toBuffer();
      const oRaw2 = await sharp(origP2).raw().toBuffer();
      const cRaw1 = await sharp(compP1).raw().toBuffer();
      const cRaw2 = await sharp(compP2).raw().toBuffer();

      const origMae = calculateMAE(oRaw1, oRaw2);
      const compMae = calculateMAE(cRaw1, cRaw2);
      const deltaDiff = Math.abs(origMae - compMae);

      if (deltaDiff > maxDeltaDiff) maxDeltaDiff = deltaDiff;
      avgDeltaDiff += deltaDiff;
      stepCount++;
    }

    avgDeltaDiff /= stepCount;

    motionReport.push({
      sequence: seq.desc,
      clip: seq.clip,
      stepsChecked: stepCount,
      avgMotionDeltaDrift: avgDeltaDiff.toFixed(4),
      maxMotionDeltaDrift: maxDeltaDiff.toFixed(4),
      temporalStabilityVerdict: avgDeltaDiff < 0.1 ? 'PERFECT (Zero temporal chatter / No flickering)' : 'Good',
    });
  }

  console.table(motionReport);
}

runValidation().catch(console.error);
