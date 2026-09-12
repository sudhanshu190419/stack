const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9311;
const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(p) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + p, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Spawning Chrome to inspect https://www.stackstich.online/ ...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await sleep(2500);
    const tabs = await getJson('/json');
    const tab = tabs.find(t => t.type === 'page') || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === reqId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Navigating to live site: https://www.stackstich.online/ ...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Initial DOM & Computed Styles Inspection
    const initialDomInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
        const heroSection = document.querySelector('section');
        const heroBg = heroSection ? window.getComputedStyle(heroSection).backgroundColor : 'none';
        const canvas = document.querySelector('canvas');
        const canvasW = canvas ? canvas.width : 0;
        const canvasH = canvas ? canvas.height : 0;
        const services = document.getElementById('services');
        const servicesBg = services ? window.getComputedStyle(services).backgroundColor : 'none';
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const servicesST = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;

        return {
          bodyBg,
          htmlBg,
          heroBg,
          canvasDimensions: { width: canvasW, height: canvasH },
          servicesBg,
          heroST: heroST ? { start: heroST.start, end: heroST.end, maxScroll: heroST.maxScroll } : null,
          servicesST: servicesST ? { start: servicesST.start, end: servicesST.end } : null,
        };
      })()`,
      returnByValue: true
    });
    console.log('Initial Live Site DOM Info:', JSON.stringify(initialDomInfo.result.value, null, 2));

    // Helper: Sample visual state at center of viewport
    const sampleStateExpr = `(() => {
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      const servicesST = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;
      const heroSection = document.querySelector('section');
      const canvas = document.querySelector('canvas');
      const elAtCenter = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      
      let canvasPixelHex = null;
      if (canvas) {
        try {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const p = ctx.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data;
            canvasPixelHex = \`rgb(\${p[0]}, \${p[1]}, \${p[2]})\`;
          }
        } catch(e) {
          canvasPixelHex = 'error: ' + e.message;
        }
      }

      return {
        scrollY: window.scrollY,
        heroProgress: heroST ? heroST.progress : null,
        heroScroll: heroST ? heroST.scroll() : null,
        heroEnd: heroST ? heroST.end : null,
        heroPinned: heroSection ? heroSection.style.position : null,
        heroZIndex: heroSection ? heroSection.style.zIndex : null,
        heroDisplay: heroSection ? heroSection.style.display : null,
        elAtCenterTag: elAtCenter ? elAtCenter.tagName + (elAtCenter.id ? '#' + elAtCenter.id : '') + (elAtCenter.className ? '.' + elAtCenter.className.split(' ').slice(0, 2).join('.') : '') : null,
        elAtCenterBg: elAtCenter ? window.getComputedStyle(elAtCenter).backgroundColor : null,
        canvasPixelHex
      };
    })()`;

    // Function to run a scroll trial and record telemetry + captures
    async function runTrial(name, scrollAction) {
      console.log(`\n=== RUNNING TRIAL: ${name} ===`);
      // Reset to top
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' })` });
      await sleep(1500);

      const frames = [];
      const startTime = Date.now();

      // Start action
      await scrollAction();

      // Sample rapidly for 2.5 seconds
      for (let i = 0; i < 30; i++) {
        const timeOffset = Date.now() - startTime;
        const state = await send('Runtime.evaluate', { expression: sampleStateExpr, returnByValue: true });
        frames.push({ t: timeOffset, ...state.result.value });
        await sleep(70);
      }

      // Check for blue color in frames
      const blueFrames = frames.filter(f => {
        // Look for dark blue: rgb(5, 8, 22) or similar dark blue/blue-black
        const bg = f.elAtCenterBg || '';
        const pix = f.canvasPixelHex || '';
        const isDarkBlueBg = bg.includes('5, 8, 22') || bg.includes('10, 15, 44') || bg.includes('17, 22, 68');
        const isDarkBluePix = pix.includes('5, 8, 22') || pix.includes('10, 15, 44');
        return isDarkBlueBg || isDarkBluePix || (f.heroPinned === 'fixed' && f.heroProgress >= 0.99);
      });

      console.log(`Trial [${name}] finished. Total sampled states: ${frames.length}. Suspicious/Blue states detected: ${blueFrames.length}`);
      if (blueFrames.length > 0) {
        console.log(`Blue/Gated Samples in [${name}]:`, JSON.stringify(blueFrames.slice(0, 5), null, 2));
      }

      return { name, total: frames.length, blueCount: blueFrames.length, samples: frames, blueSamples: blueFrames };
    }

    // 1. Slow Scroll
    const trial1 = await runTrial('Trial 1: Slow Scroll (step by step)', async () => {
      for (let y = 0; y <= 3600; y += 200) {
        await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })` });
        await sleep(60);
      }
    });

    // 2. Normal Scroll
    const trial2 = await runTrial('Trial 2: Normal Scroll', async () => {
      for (let y = 0; y <= 3600; y += 400) {
        await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })` });
        await sleep(30);
      }
    });

    // 3. Fast Wheel Scroll (simulating rapid wheel delta)
    const trial3 = await runTrial('Trial 3: Fast Wheel Scroll (3 large wheel bursts)', async () => {
      for (let i = 0; i < 6; i++) {
        await send('Input.dispatchMouseEvent', {
          type: 'mouseWheel',
          x: 700,
          y: 450,
          deltaX: 0,
          deltaY: 700
        });
        await sleep(40);
      }
    });

    // 4. Repeated large wheel jumps
    const trial4 = await runTrial('Trial 4: Repeated Large Wheel Jumps (1000px bursts)', async () => {
      for (let i = 0; i < 8; i++) {
        await send('Input.dispatchMouseEvent', {
          type: 'mouseWheel',
          x: 700,
          y: 450,
          deltaX: 0,
          deltaY: 1200
        });
        await sleep(30);
      }
    });

    // 5. Fast scroll from Clip 3 into Clip 4 (progress 0.70 -> 1.0)
    const trial5 = await runTrial('Trial 5: Fast Scroll Clip 3 to Clip 4', async () => {
      // jump to 2400 (Clip 3)
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 2400, behavior: 'instant' })` });
      await sleep(500);
      // rapidly scrub through Clip 4 to 3600
      for (let y = 2500; y <= 3700; y += 200) {
        await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })` });
        await sleep(20);
      }
    });

    // 6. Direct Extreme Scroll to End (0 -> 3600 in one shot)
    const trial6 = await runTrial('Trial 6: Direct Extreme Scroll to End (0 -> 3600 instant)', async () => {
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3600, behavior: 'instant' })` });
    });

    // 7. Direct Wheel Surge to End (10 rapid wheel events with deltaY 1500)
    const trial7 = await runTrial('Trial 7: Direct Wheel Surge to End', async () => {
      for (let i = 0; i < 10; i++) {
        await send('Input.dispatchMouseEvent', {
          type: 'mouseWheel',
          x: 700,
          y: 450,
          deltaX: 0,
          deltaY: 1500
        });
        await sleep(15);
      }
    });

    // 8. Scrub to 3450 (98% of Hero) then sudden wheel surge past 3500
    const trial8 = await runTrial('Trial 8: Scrub to 3450 then fast wheel past boundary', async () => {
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3450, behavior: 'instant' })` });
      await sleep(300);
      await send('Input.dispatchMouseEvent', {
        type: 'mouseWheel',
        x: 700,
        y: 450,
        deltaX: 0,
        deltaY: 800
      });
    });

    // 9. Rapid back-and-forth at boundary (3400 <-> 3600)
    const trial9 = await runTrial('Trial 9: Rapid oscillation at boundary (3400 <-> 3600)', async () => {
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3400, behavior: 'instant' })` });
      await sleep(200);
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3600, behavior: 'instant' })` });
      await sleep(100);
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3450, behavior: 'instant' })` });
      await sleep(100);
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3650, behavior: 'instant' })` });
    });

    // 10. Cold load and immediate fast flick (no wait for warmup)
    const trial10 = await runTrial('Trial 10: Fast flick immediately on fresh reload', async () => {
      await send('Page.navigate', { url: 'https://www.stackstich.online/' });
      await sleep(300); // minimal wait - frames 100-239 definitely unrequested
      await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3550, behavior: 'instant' })` });
    });

    // Write all results to a JSON file for deep analysis
    const allTrials = [trial1, trial2, trial3, trial4, trial5, trial6, trial7, trial8, trial9, trial10];
    fs.writeFileSync(
      path.join(artifactDir, 'live_site_trials_analysis.json'),
      JSON.stringify({ initialDomInfo: initialDomInfo.result.value, allTrials }, null, 2)
    );
    console.log('\nAll 10 trials completed and saved to live_site_trials_analysis.json!');

  } catch (err) {
    console.error('Error during live site inspection:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
