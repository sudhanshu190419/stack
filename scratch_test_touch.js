const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9242;

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

async function run() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=390,844`,
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
    await sleep(3500);

    // Let's test GSAP Observer behavior directly in browser context
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        // Create an observer on a test div
        const div = document.createElement('div');
        div.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.1)';
        document.body.appendChild(div);

        let calls = [];
        const obs = window.gsap ? window.gsap.Observer.create({
          target: div,
          type: 'wheel,touch',
          onDown: (self) => calls.push({ type: 'onDown', deltaY: self.deltaY, isDragging: self.isDragging }),
          onUp: (self) => calls.push({ type: 'onUp', deltaY: self.deltaY, isDragging: self.isDragging })
        }) : null;
        window.__testObs = { obs, calls, div };
        return { hasGsap: !!window.gsap };
      })()`,
      returnByValue: true
    });
    console.log('Test setup:', evalRes.result.value);

  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
