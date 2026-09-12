const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9377;
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
  console.log('Testing Back navigation from all 5 routes with scroll position at Services ...');
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

    const routes = [
      { name: 'TEST A: /web-development', url: '/web-development' },
      { name: 'TEST B: /work', url: '/work' },
      { name: 'TEST C: /website-design', url: '/website-design' },
      { name: 'TEST D: /contact', url: '/contact' },
      { name: 'TEST E: /ecommerce-development', url: '/ecommerce-development' },
    ];

    const results = [];

    for (let r = 0; r < routes.length; r++) {
      const route = routes[r];
      console.log(`\n-------------------------------------------------`);
      console.log(`Testing ${route.name}`);
      console.log(`-------------------------------------------------`);

      // 1. Load homepage and scroll to Services
      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await sleep(2500);

      // Scroll to Services (scrollY = 4228)
      await evaluate(`() => {
        sessionStorage.setItem('stack_return_to_services', 'true');
        sessionStorage.setItem('stack_return_service_idx', '0');
        window.scrollTo({ top: 4228, behavior: 'instant' });
      }`);
      await sleep(600);

      // 2. Navigate away
      console.log(`Navigating to ${route.url} ...`);
      await evaluate(`() => {
        sessionStorage.setItem('stack_return_to_services', 'true');
        sessionStorage.setItem('stack_return_service_idx', '0');
        const link = document.querySelector('a[href="${route.url}"]');
        if (link) link.click();
        else window.location.href = '${route.url}';
      }`);
      await sleep(2000);

      // 3. Press browser Back
      console.log('Pressing browser Back ...');
      await evaluate(`() => window.history.back()`);
      await sleep(2500);

      const immediateState = await evaluate(`() => {
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
      console.log('Immediate State after Back:', immediateState);

      // 4. Scroll upward through Hero
      const upwardSteps = [];
      for (let s = 0; s < 12; s++) {
        await dispatchWheel(-250, 2, 25);
        await sleep(60);

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

      const uniquePixels = new Set(upwardSteps.map(u => u.pixel.join(',')));
      const isStuck = uniquePixels.size <= 1;

      console.log(`Steps for ${route.name}:`);
      upwardSteps.slice(0, 6).forEach((u, i) => {
        console.log(`  Step ${i + 1}: scrollY=${u.scrollY}, progress=${u.progress?.toFixed(3)}, hud=${u.hud}, pixel=[${u.pixel.join(',')}]`);
      });

      console.log(`Result: Unique Frames Drawn=${uniquePixels.size}, Canvas Stuck=${isStuck}`);

      results.push({
        route: route.name,
        scrollYAfterBack: immediateState.scrollY,
        progressAfterBack: immediateState.progress,
        uniquePixels: uniquePixels.size,
        isStuck
      });
    }

    console.log('\n=================================================');
    console.log('ALL 5 TESTS FINISHED:');
    results.forEach(r => {
      console.log(`  ${r.route}: scrollY=${r.scrollYAfterBack}, uniqueFrames=${r.uniquePixels}, stuck=${r.isStuck}`);
    });
    console.log('=================================================');

  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
