const { chromium } = require('playwright');

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  
  console.log('==================================================');
  console.log('1. TESTING DESKTOP HERO RUNTIME (1920x1080)');
  console.log('==================================================');
  
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();
  
  const desktopRequests = [];
  const desktopErrors = [];
  
  desktopPage.on('request', req => {
    const url = req.url();
    if (url.includes('/hero/') || url.includes('/hero_mobile/')) {
      desktopRequests.push(url);
    }
  });

  desktopPage.on('pageerror', err => {
    desktopErrors.push(err.toString());
  });
  
  await desktopPage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  
  // Inspect initial warmup
  const initialDesktopUrls = [...desktopRequests];
  console.log(`Initial desktop requests count: ${initialDesktopUrls.length}`);
  console.log('First 5 requests:', initialDesktopUrls.slice(0, 5));
  
  // Check initial HUD text
  const initialHud = await desktopPage.evaluate(() => {
    const counter = document.querySelector('span.font-mono.tracking-wider');
    return counter ? counter.innerText : null;
  });
  console.log('Initial HUD counter text:', initialHud);

  // Scroll through desktop sequence in steps to hit clip transitions:
  // ScrollTrigger desktop distance is 3500px
  // 240 frames total:
  // Frame 0: scroll 0px
  // Frame 59 (end of clip-01): 59/239 * 3500 ≈ 864px
  // Frame 60 (start of clip-02): 60/239 * 3500 ≈ 878px
  // Frame 119 (end of clip-02): 119/239 * 3500 ≈ 1742px
  // Frame 120 (start of clip-03): 120/239 * 3500 ≈ 1757px
  // Frame 179 (end of clip-03): 179/239 * 3500 ≈ 2621px
  // Frame 180 (start of clip-04): 180/239 * 3500 ≈ 2635px
  // Frame 239 (end of clip-04): 3500px
  
  const scrollSteps = [
    { y: 0, label: 'Start (Frame 0, clip-01)' },
    { y: 864, label: 'Boundary 1: End of clip-01 (Frame ~59)' },
    { y: 920, label: 'Boundary 1: Start of clip-02 (Frame ~63)' },
    { y: 1742, label: 'Boundary 2: End of clip-02 (Frame ~119)' },
    { y: 1800, label: 'Boundary 2: Start of clip-03 (Frame ~123)' },
    { y: 2621, label: 'Boundary 3: End of clip-03 (Frame ~179)' },
    { y: 2700, label: 'Boundary 3: Start of clip-04 (Frame ~185)' },
    { y: 3500, label: 'End of Hero: (Frame 239, clip-04)' },
  ];

  const chapterTransitions = [];
  for (const step of scrollSteps) {
    await desktopPage.evaluate((targetY) => {
      window.scrollTo({ top: targetY, behavior: 'instant' });
    }, step.y);
    await desktopPage.waitForTimeout(400);

    const hudState = await desktopPage.evaluate(() => {
      // Find chapter and counter text
      const spans = Array.from(document.querySelectorAll('span'));
      const counterSpan = spans.find(s => s.innerText && s.innerText.includes('/'));
      const chapterSpan = spans.find(s => s.innerText && /0[1-4] · /.test(s.innerText));
      return {
        counter: counterSpan ? counterSpan.innerText.trim() : null,
        chapter: chapterSpan ? chapterSpan.innerText.trim() : null,
      };
    });
    chapterTransitions.push({ step: step.label, y: step.y, ...hudState });
  }

  console.log('\n--- DESKTOP SCROLL STEP AUDIT ---');
  console.table(chapterTransitions);

  // Now scrub all the way through smoothly to trigger all frames
  for (let y = 0; y <= 3500; y += 150) {
    await desktopPage.evaluate(top => window.scrollTo(0, top), y);
    await desktopPage.waitForTimeout(40);
  }
  await desktopPage.waitForTimeout(1000);

  // Analyze all requested desktop URLs
  const uniqueDesktopUrls = [...new Set(desktopRequests)];
  const clip05Requests = uniqueDesktopUrls.filter(u => u.includes('clip-05'));
  const beyond240Requests = uniqueDesktopUrls.filter(u => {
    const match = u.match(/frame-(\d+)\.webp/);
    if (match) {
      const num = parseInt(match[1], 10);
      return num > 60;
    }
    return false;
  });
  const mobileOnDesktopRequests = uniqueDesktopUrls.filter(u => u.includes('/hero_mobile/'));

  console.log('\n--- DESKTOP ASSET INTEGRITY REPORT ---');
  console.log(`Total unique desktop assets requested: ${uniqueDesktopUrls.length}`);
  console.log(`Requests to clip-05: ${clip05Requests.length}`);
  console.log(`Requests beyond frame 60 per clip: ${beyond240Requests.length}`);
  console.log(`Mobile assets leaked to desktop: ${mobileOnDesktopRequests.length}`);
  console.log(`Desktop page errors: ${desktopErrors.length}`);

  await desktopContext.close();

  console.log('\n==================================================');
  console.log('2. TESTING MOBILE HERO REGRESSION (390x844)');
  console.log('==================================================');

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  
  const mobileRequests = [];
  const mobileErrors = [];

  mobilePage.on('request', req => {
    const url = req.url();
    if (url.includes('/hero/') || url.includes('/hero_mobile/')) {
      mobileRequests.push(url);
    }
  });

  mobilePage.on('pageerror', err => {
    mobileErrors.push(err.toString());
  });

  await mobilePage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const initialMobileHud = await mobilePage.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('span'));
    const counterSpan = spans.find(s => s.innerText && s.innerText.includes('/'));
    return counterSpan ? counterSpan.innerText.trim() : null;
  });
  console.log('Initial mobile HUD counter text:', initialMobileHud);

  // Scroll through mobile sequence
  for (let y = 0; y <= 5000; y += 300) {
    await mobilePage.evaluate(top => window.scrollTo(0, top), y);
    await mobilePage.waitForTimeout(50);
  }
  await mobilePage.waitForTimeout(1000);

  const uniqueMobileUrls = [...new Set(mobileRequests)];
  const desktopOnMobileRequests = uniqueMobileUrls.filter(u => u.includes('/hero/clip-'));
  const mobileOnlyRequests = uniqueMobileUrls.filter(u => u.includes('/hero_mobile/'));

  console.log('\n--- MOBILE REGRESSION AUDIT ---');
  console.log(`Total mobile requests: ${mobileRequests.length}`);
  console.log(`Unique mobile assets requested: ${uniqueMobileUrls.length}`);
  console.log(`Requests to /hero_mobile/: ${mobileOnlyRequests.length}`);
  console.log(`Desktop assets leaked to mobile: ${desktopOnMobileRequests.length}`);
  console.log(`Mobile page errors: ${mobileErrors.length}`);

  await mobileContext.close();
  await browser.close();

  console.log('\n==================================================');
  console.log('RUNTIME VERIFICATION FINISHED SUCCESSFULLY');
  console.log('==================================================');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
