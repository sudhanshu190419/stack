const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9366;
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
  console.log('Testing Back navigation fix LOCALLY on http://localhost:3000 ...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,804',
    'about:blank'
  ]);

  try {
    await sleep(2000);
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

    async function evaluate(fnStr) {
      const res = await send('Runtime.evaluate', {
        expression: `(${fnStr})()`,
        returnByValue: true,
        awaitPromise: true
      });
      return res.result?.value;
    }

    async function dispatchWheel(deltaY, count = 1, interval = 20) {
      for (let i = 0; i < count; i++) {
        await send('Input.dispatchMouseEvent', {
          type: 'mouseWheel',
          x: 640,
          y: 400,
          deltaX: 0,
          deltaY: deltaY
        });
        if (interval > 0) await sleep(interval);
      }
    }

    async function captureScreenshot(filename) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = path.join(artifactDir, filename);
      fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
      return outPath;
    }

    // TEST 1: Fresh Visit Verification
    console.log('\n===============================================================');
    console.log('TEST 1: Fresh Visit Baseline (Starts at Frame 0, scrolls smoothly)');
    console.log('===============================================================');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    const freshVisitState = await evaluate(`() => {
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      const hud = document.querySelector('span.font-mono');
      return {
        scrollY: window.scrollY,
        progress: heroST ? heroST.progress : null,
        hud: hud ? hud.innerText : null
      };
    }`);
    console.log('Fresh visit state on mount:', freshVisitState);

    // Scroll forward
    await dispatchWheel(400, 10, 20);
    await sleep(500);
    const scrolledState = await evaluate(`() => {
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      const hud = document.querySelector('span.font-mono');
      return {
        scrollY: window.scrollY,
        progress: heroST ? heroST.progress : null,
        hud: hud ? hud.innerText : null
      };
    }`);
    console.log('Scrolled state forward:', scrolledState);

    // TEST 2: Tests A through E (Back navigation from 5 routes)
    const testRoutes = [
      { name: 'TEST A: /web-development', url: '/web-development', scrollPos: 4228 },
      { name: 'TEST B: /work', url: '/work', scrollPos: 4228 },
      { name: 'TEST C: /website-design', url: '/website-design', scrollPos: 4228 },
      { name: 'TEST D: /contact', url: '/contact', scrollPos: 4228 },
      { name: 'TEST E: /ecommerce-development', url: '/ecommerce-development', scrollPos: 4228 },
      // Multiple restored positions:
      { name: 'TEST F (Pos ~200): /work', url: '/work', scrollPos: 2900 },
      { name: 'TEST G (Pos ~150): /contact', url: '/contact', scrollPos: 2200 },
      { name: 'TEST H (Pos ~100): /web-development', url: '/web-development', scrollPos: 1500 }
    ];

    const suiteResults = [];

    for (let t = 0; t < testRoutes.length; t++) {
      const routeTest = testRoutes[t];
      console.log(`\n===============================================================`);
      console.log(`RUNNING: ${routeTest.name} at scrollPos ${routeTest.scrollPos}`);
      console.log(`===============================================================`);

      // 1. Start at homepage
      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await sleep(2500);

      // 2. Scroll to target position
      await evaluate(`(targetY) => window.scrollTo({ top: ${routeTest.scrollPos}, behavior: 'instant' })`);
      await sleep(800);

      const beforeNav = await evaluate(`() => {
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const hud = document.querySelector('span.font-mono');
        return {
          scrollY: window.scrollY,
          progress: heroST ? heroST.progress : null,
          hud: hud ? hud.innerText : null
        };
      }`);
      console.log('Position before navigation:', beforeNav);

      // 3. Navigate away
      console.log(`Navigating to ${routeTest.url} ...`);
      await evaluate(`() => {
        const link = document.querySelector('a[href="${routeTest.url}"]');
        if (link) link.click();
        else window.location.href = '${routeTest.url}';
      }`);
      await sleep(2000);

      const onDest = await evaluate(`() => window.location.pathname`);
      console.log('On destination:', onDest);

      // 4. Press browser Back
      console.log('Pressing browser BACK ...');
      await evaluate(`() => window.history.back()`);
      await sleep(2500);

      // 5. Inspect immediate mount state
      const afterBack = await evaluate(`() => {
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const hud = document.querySelector('span.font-mono');
        const canvas = document.querySelector('canvas');
        let pixel = [];
        try {
          const ctx = canvas ? canvas.getContext('2d') : null;
          if (ctx) {
            const d = ctx.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data;
            pixel = [d[0], d[1], d[2], d[3]];
          }
        } catch (e) {}

        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          progress: heroST ? heroST.progress : null,
          hud: hud ? hud.innerText : null,
          pixel
        };
      }`);
      console.log('Immediate state after Back:', afterBack);

      // 6. Scroll upward through Hero
      console.log('Scrolling upward through Hero (12 steps of dy = -250) ...');
      const upwardSteps = [];
      for (let s = 0; s < 12; s++) {
        await dispatchWheel(-250, 2, 25);
        await sleep(70);

        const stepData = await evaluate(`() => {
          const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
          const hud = document.querySelector('span.font-mono');
          const canvas = document.querySelector('canvas');
          let pixel = [];
          try {
            const ctx = canvas ? canvas.getContext('2d') : null;
            if (ctx) {
              const d = ctx.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data;
              pixel = [d[0], d[1], d[2], d[3]];
            }
          } catch (e) {}

          return {
            scrollY: window.scrollY,
            progress: heroST ? heroST.progress : null,
            hud: hud ? hud.innerText : null,
            pixel
          };
        }`);
        upwardSteps.push(stepData);
      }

      console.log('Upward Steps:');
      upwardSteps.forEach((u, idx) => {
        console.log(`  Step ${idx + 1}: scrollY=${u.scrollY}, progress=${u.progress?.toFixed(3)}, hud=${u.hud}, pixel=[${u.pixel.join(',')}]`);
      });

      const uniquePixels = new Set(upwardSteps.map(u => u.pixel.join(',')));
      const isStuck = uniquePixels.size <= 2 && upwardSteps[0].scrollY > 1000;

      console.log(`RESULT for ${routeTest.name}: Unique Frames Drawn=${uniquePixels.size}, Canvas Stuck=${isStuck}`);

      if (t === 0) {
        await captureScreenshot('local_test_a_upward_success.png');
      }

      suiteResults.push({
        name: routeTest.name,
        targetPos: routeTest.scrollPos,
        afterBack,
        uniquePixels: uniquePixels.size,
        isStuck,
        success: !isStuck && uniquePixels.size >= 4
      });
    }

    fs.writeFileSync(
      path.join(artifactDir, 'local_back_navigation_results.json'),
      JSON.stringify(suiteResults, null, 2)
    );

    console.log('\n===============================================================');
    console.log('SUITE EXECUTION FINISHED');
    console.log(`Successful Trials: ${suiteResults.filter(r => r.success).length} / ${suiteResults.length}`);
    console.log(`Stuck Trials: ${suiteResults.filter(r => r.isStuck).length} / ${suiteResults.length}`);
    console.log('===============================================================');

  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
