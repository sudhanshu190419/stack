const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9265;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function captureProperly() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844',
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(4000);

    const info = await send('Runtime.evaluate', {
      expression: `(() => {
        const allST = window.ScrollTrigger ? window.ScrollTrigger.getAll() : [];
        const mobileST = window.ScrollTrigger?.getById('services-scroll-trigger-mobile');
        return {
          mobileST: mobileST ? { start: mobileST.start, end: mobileST.end } : null,
          allTriggers: allST.map(t => ({ id: t.vars?.id, start: t.start, end: t.end }))
        };
      })()`,
      returnByValue: true
    });

    console.log('ScrollTrigger info:', JSON.stringify(info.result.value, null, 2));

    const start = info.result.value.mobileST ? info.result.value.mobileST.start : 2500;
    console.log(`Scrolling to exact mobile ST start: ${start + 25}px`);
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${start + 25})`
    });
    await sleep(1200);

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\services_mobile_proper.png', buffer);
    console.log('Saved services_mobile_proper.png');

  } finally {
    chrome.kill();
  }
}

captureProperly().catch(console.error);
