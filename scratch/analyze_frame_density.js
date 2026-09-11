const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function analyzeInterFrameMotion() {
  console.log('================================================================================');
  console.log('6. FRAME DENSITY & MOTION CONTINUITY ANALYSIS');
  console.log('================================================================================\n');

  const clips = ['clip-01', 'clip-02', 'clip-03', 'clip-04'];
  const clipStats = [];

  for (const clip of clips) {
    const dir = path.join(__dirname, '..', 'public', 'hero', clip);
    let totalInterFrameMAE = 0;
    let maxJump = 0;
    let maxJumpIndex = -1;
    const diffs = [];

    // Sample adjacent frames across the 60 frames
    let prevRaw = null;
    for (let f = 1; f <= 60; f++) {
      const filename = `frame-${f.toString().padStart(4, '0')}.webp`;
      const fullPath = path.join(dir, filename);
      const raw = await sharp(fullPath).raw().toBuffer();

      if (prevRaw) {
        let sumDiff = 0;
        for (let i = 0; i < raw.length; i += 3) {
          sumDiff += (Math.abs(raw[i] - prevRaw[i]) + Math.abs(raw[i+1] - prevRaw[i+1]) + Math.abs(raw[i+2] - prevRaw[i+2])) / 3;
        }
        const mae = sumDiff / (raw.length / 3);
        diffs.push(mae);
        totalInterFrameMAE += mae;
        if (mae > maxJump) {
          maxJump = mae;
          maxJumpIndex = f;
        }
      }
      prevRaw = raw;
    }

    const avgMAE = totalInterFrameMAE / diffs.length;
    diffs.sort((a, b) => a - b);
    const medianMAE = diffs[Math.floor(diffs.length / 2)];

    clipStats.push({
      clip,
      frameCount: 60,
      avgInterFrameDeltaMAE: avgMAE.toFixed(2),
      medianDeltaMAE: medianMAE.toFixed(2),
      maxJumpDeltaMAE: maxJump.toFixed(2),
      maxJumpAtFrame: `frame-${maxJumpIndex.toString().padStart(4, '0')}`,
      motionSmoothnessAssessment: avgMAE < 5.0 ? 'Extremely Smooth (Micro-step animation)' : avgMAE < 10.0 ? 'Smooth Cinematic Pacing' : 'Aggressive Motion',
    });
  }

  console.table(clipStats);

  console.log('\n--- SCROLL MAPPING METRICS ---');
  console.log('Desktop ScrollTrigger Distance: +=3500px');
  console.log('Total Desktop Frames: 240');
  console.log('Scroll Distance per Frame: (3500px / 240) = 14.58 px / frame');
  console.log('Standard Windows Mouse Wheel Step: ~100px (Scrolls ~6.86 frames per tick)');
  console.log('Trackpad Pixel Scroll (Smooth Gestures): ~15–30px per gesture tick (~1.0–2.0 frames per tick)');
}

analyzeInterFrameMotion().catch(console.error);
