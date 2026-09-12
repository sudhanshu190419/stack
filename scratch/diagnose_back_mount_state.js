const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9355;
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
  console.log('Testing internal lifecycle states on http://localhost:3000 ...');
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

    // 1. Load homepage
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    // 2. Scroll to Services
    console.log('Scrolling forward through Hero to scrollY = 4200 ...');
    await dispatchWheel(400, 12, 20);
    await sleep(1000);

    const posBefore = await evaluate(`() => ({ scrollY: window.scrollY })`);
    console.log('Scroll position before nav:', posBefore);

    // 3. Click link to /web-development
    console.log('Navigating to /web-development via link click ...');
    await evaluate(`() => {
      const link = document.querySelector('a[href="/web-development"]') || document.querySelector('#services a');
      if (link) link.click();
      else window.location.href = '/web-development';
    }`);
    await sleep(2500);

    const onWebDev = await evaluate(`() => window.location.pathname`);
    console.log('Current page:', onWebDev);

    // 4. Press browser back
    console.log('Pressing browser BACK button ...');
    await evaluate(`() => window.history.back()`);
    await sleep(1000); // Check shortly after remount

    // 5. Inspect state immediately after remount
    const immediateState = await evaluate(`() => {
      const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
      return {
        scrollY: window.scrollY,
        stProgress: heroST ? heroST.progress : null,
        stStart: heroST ? heroST.start : null,
        stEnd: heroST ? heroST.end : null
      };
    }`);
    console.log('Immediate State after Back:', immediateState);

    // 6. Inspect what happens during initial upward scroll
    console.log('Beginning upward scroll from scrollY ~4200 into Hero ...');
    const scrollLog = [];
    for (let step = 0; step < 10; step++) {
      await dispatchWheel(-200, 2, 25);
      await sleep(100);

      const status = await evaluate(`() => {
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const hud = document.querySelector('span.font-mono');
        return {
          scrollY: window.scrollY,
          progress: heroST ? heroST.progress : null,
          hud: hud ? hud.innerText : null
        };
      }`);
      scrollLog.push(status);
      console.log(`Step ${step + 1}: scrollY=${status.scrollY}, progress=${status.progress?.toFixed(3)}, hud=${status.hud}`);
    }

    fs.writeFileSync(
      path.join(artifactDir, 'diagnose_back_mount_state.json'),
      JSON.stringify({ posBefore, onWebDev, immediateState, scrollLog }, null, 2)
    );

  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
