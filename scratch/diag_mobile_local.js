const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9280;

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

async function run() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844',
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

    async function evalCode(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res?.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
      hasTouch: true
    });

    console.log('Navigating to http://127.0.0.1:3000/ ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
    await sleep(4000);

    const diag = await evalCode(`(() => {
      const canvasList = Array.from(document.querySelectorAll('canvas'));
      const st = window.ScrollTrigger ? Object.keys(window.ScrollTrigger.getAll()) : 'no ST';
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = window.scrollY;
      const bodyH = document.body.scrollHeight;
      
      const fibers = canvasList.map(c => {
        const keys = Object.keys(c).filter(k => k.startsWith('__react'));
        return {
          id: c.id,
          className: c.className,
          width: c.width,
          height: c.height,
          keys
        };
      });

      return { w, h, scrollY, bodyH, canvasCount: canvasList.length, fibers, st };
    })()`);

    console.log('Diagnostic result:', JSON.stringify(diag, null, 2));
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
