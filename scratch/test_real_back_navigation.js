const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9344;
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
  console.log('Spawning Chrome to test real back navigation on https://www.stackstich.online/ ...');
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

    const testRoutes = [
      { name: 'Services Arrow -> /web-development', selector: '#services a[aria-label*="Web Development"]', fallbackUrl: '/web-development' },
      { name: 'Navbar -> /work', selector: 'header a[href="/work"], nav a[href="/work"]', fallbackUrl: '/work' },
      { name: 'Services Arrow -> /website-design', selector: '#services a[aria-label*="Website Design"]', fallbackUrl: '/website-design' },
      { name: 'Navbar -> /contact', selector: 'header a[href="/contact"], nav a[href="/contact"]', fallbackUrl: '/contact' },
      { name: 'Services Arrow -> /ecommerce-development', selector: '#services a[aria-label*="E-Commerce"]', fallbackUrl: '/ecommerce-development' }
    ];

    const results = [];

    for (let trial = 0; trial < 10; trial++) {
      const routeInfo = testRoutes[trial % testRoutes.length];
      console.log(`\n===============================================================`);
      console.log(`TRIAL ${trial + 1} / 10: Testing ${routeInfo.name}`);
      console.log(`===============================================================`);

      // 1. Fresh load of homepage
      await send('Page.navigate', { url: 'https://www.stackstich.online/' });
      await sleep(3500);

      // 2. Scroll through Hero to What We Do
      console.log('Scrolling through Hero to reach What We Do (scrollY ~4200) ...');
      await dispatchWheel(300, 15, 20);
      await sleep(1000);

      const beforeNav = await evaluate(`() => {
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const hud = document.querySelector('span.font-mono');
        return {
          scrollY: window.scrollY,
          heroProgress: heroST ? heroST.progress : null,
          hudText: hud ? hud.innerText : null
        };
      }`);
      console.log('Position before navigation:', JSON.stringify(beforeNav));

      // 3. Click link to navigate to route
      console.log(`Clicking link for ${routeInfo.name} ...`);
      const clickSuccess = await evaluate(`(sel) => {
        const link = document.querySelector('${routeInfo.selector}') || document.querySelector('a[href="${routeInfo.fallbackUrl}"]');
        if (link) {
          link.click();
          return { clicked: true, href: link.getAttribute('href') };
        }
        window.location.href = '${routeInfo.fallbackUrl}';
        return { clicked: false, fallback: true };
      }`);
      console.log('Navigation trigger:', clickSuccess);

      // Wait for destination page to load
      await sleep(3000);
      const destUrl = await evaluate(`() => window.location.pathname`);
      console.log('Current destination URL:', destUrl);

      // 4. Press browser BACK
      console.log('Pressing browser BACK button (window.history.back()) ...');
      await evaluate(`() => window.history.back()`);
      await sleep(3000);

      // 5. Inspect homepage state immediately after Back
      const stateAfterBack = await evaluate(`() => {
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const servicesST = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;
        const hud = document.querySelector('span.font-mono');
        const canvas = document.querySelector('canvas');
        
        // Grab pixel data from canvas to determine if it is drawn or blank
        let isCanvasBlank = false;
        let samplePixels = [];
        try {
          const ctx = canvas ? canvas.getContext('2d') : null;
          if (ctx) {
            const data = ctx.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 2, 2).data;
            samplePixels = Array.from(data);
            isCanvasBlank = samplePixels.every(p => p === 0);
          }
        } catch (e) {
          samplePixels = [e.message];
        }

        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          scrollRestoration: window.history.scrollRestoration,
          heroProgress: heroST ? heroST.progress : null,
          heroStart: heroST ? heroST.start : null,
          heroEnd: heroST ? heroST.end : null,
          heroIsActive: heroST ? heroST.isActive : null,
          servicesStart: servicesST ? servicesST.start : null,
          hudText: hud ? hud.innerText : null,
          canvasWidth: canvas ? canvas.width : null,
          canvasHeight: canvas ? canvas.height : null,
          isCanvasBlank,
          samplePixels
        };
      }`);
      console.log('State immediately after Back:', JSON.stringify(stateAfterBack, null, 2));

      // 6. Scroll BACK UP toward Hero
      console.log('Scrolling BACK UP toward Hero into Clip 4, Clip 3, Clip 2 ...');
      const upwardSteps = [];
      for (let s = 0; s < 12; s++) {
        await dispatchWheel(-250, 2, 25);
        await sleep(80);

        const step = await evaluate(`() => {
          const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
          const hud = document.querySelector('span.font-mono');
          const canvas = document.querySelector('canvas');
          let centerPixel = [];
          try {
            const ctx = canvas ? canvas.getContext('2d') : null;
            if (ctx) {
              const d = ctx.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data;
              centerPixel = [d[0], d[1], d[2], d[3]];
            }
          } catch (e) {}

          return {
            scrollY: window.scrollY,
            progress: heroST ? heroST.progress : null,
            hud: hud ? hud.innerText : null,
            centerPixel
          };
        }`);
        upwardSteps.push(step);
      }

      console.log('Upward Scroll Steps Summary:');
      upwardSteps.forEach((st, idx) => {
        console.log(`  Step ${idx + 1}: scrollY=${st.scrollY}, progress=${st.progress?.toFixed(3)}, hud=${st.hud}, pixel=[${st.centerPixel.join(',')}]`);
      });

      const firstStep = upwardSteps[0];
      const lastStep = upwardSteps[upwardSteps.length - 1];
      const heroMoved = (firstStep.progress || 0) !== (lastStep.progress || 0);
      const hudChanged = firstStep.hud !== lastStep.hud;
      
      // Check pixel variance across steps
      const uniquePixels = new Set(upwardSteps.map(s => s.centerPixel.join(',')));
      const canvasStuck = uniquePixels.size <= 2 && (firstStep.progress || 0) > 0.3;

      console.log(`Trial ${trial + 1} Result: Hero Moved=${heroMoved}, HUD Changed=${hudChanged}, Unique Canvas Frames Drawn=${uniquePixels.size}, Canvas Stuck=${canvasStuck}`);

      if (trial === 0) {
        await captureScreenshot('real_back_upward_scroll_final.png');
      }

      results.push({
        trial: trial + 1,
        route: routeInfo.name,
        destUrl,
        beforeNav,
        stateAfterBack,
        canvasStuck,
        uniquePixelsCount: uniquePixels.size,
        upwardSteps
      });
    }

    fs.writeFileSync(
      path.join(artifactDir, 'real_back_navigation_telemetry.json'),
      JSON.stringify(results, null, 2)
    );

    console.log('\n===============================================================');
    console.log(`TEST COMPLETED. Stuck Trials: ${results.filter(r => r.canvasStuck).length} / ${results.length}`);
    console.log('===============================================================');

  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
