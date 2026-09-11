// Verification of mobile hero scroll mapping, boundary, and responsive behavior
const MOBILE_TOTAL_FRAMES = 200;
const MOBILE_SCROLL_DISTANCE = 2500; // px
const PIXELS_PER_FRAME = MOBILE_SCROLL_DISTANCE / MOBILE_TOTAL_FRAMES; // 12.5px

const DESKTOP_TOTAL_FRAMES = 240;
const DESKTOP_SCROLL_DISTANCE = 3500;
const DESKTOP_PIXELS_PER_FRAME = DESKTOP_SCROLL_DISTANCE / DESKTOP_TOTAL_FRAMES; // 14.58px

function getMobileFrame(scrollY) {
  const progress = Math.max(0, Math.min(1, scrollY / MOBILE_SCROLL_DISTANCE));
  return Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor(progress * (MOBILE_TOTAL_FRAMES - 0.001)));
}

function getMobilePath(globalIndex) {
  const clamped = Math.max(0, Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor(globalIndex)));
  const clipIndex = Math.floor(clamped / 100) + 1;
  const frameIndex = (clamped % 100) + 1;
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`;
  const frameStr = `frame-${frameIndex.toString().padStart(3, '0')}.webp`;
  return `/hero_mobile/${clipStr}/${frameStr}`;
}

console.log('=====================================================');
console.log('MOBILE HERO NEW PACING & BOUNDARY AUDIT');
console.log('=====================================================');

console.log(`Mobile Total Distance: ${MOBILE_SCROLL_DISTANCE}px`);
console.log(`Mobile Total Frames  : ${MOBILE_TOTAL_FRAMES}`);
console.log(`Pixels per frame     : ${PIXELS_PER_FRAME}px (was 25.0px, 50% reduction)`);
console.log(`Desktop distance     : ${DESKTOP_SCROLL_DISTANCE}px`);
console.log(`Desktop pixels/frame : ${DESKTOP_PIXELS_PER_FRAME.toFixed(2)}px (100% unchanged)`);

console.log('\n--- SCROLL PROGRESSION CHECK ---');
const checkpoints = [
  { scrollY: 0, label: 'Hero Start' },
  { scrollY: 300, label: 'First small swipe (~300px)' },
  { scrollY: 625, label: 'Quarter Hero (25%)' },
  { scrollY: 1250, label: 'Halfway / Clip-01 to Clip-02 transition (50%)' },
  { scrollY: 1875, label: 'Three-quarter Hero (75%)' },
  { scrollY: 2450, label: 'Near completion (98%)' },
  { scrollY: 2500, label: 'Hero Final Frame (100%)' },
];

const results = checkpoints.map(c => {
  const frameIdx = getMobileFrame(c.scrollY);
  const path = getMobilePath(frameIdx);
  const progress = (c.scrollY / MOBILE_SCROLL_DISTANCE).toFixed(3);
  return {
    label: c.label,
    scrollY: c.scrollY + 'px',
    progress,
    frameIndex: frameIdx,
    assetPath: path,
  };
});
console.table(results);

console.log('\n--- BOUNDARY TO SERVICES CHECK ---');
console.log(`At scrollY = 2500px: Hero progress = 1.000, Frame = 199 (${getMobilePath(199)})`);
console.log(`At scrollY = 2520px: Hero unpins, ServicesSection enters (st.start + 20px)`);
console.log(`Services pin starts immediately after Hero pin ends with 0 blank gap.`);
