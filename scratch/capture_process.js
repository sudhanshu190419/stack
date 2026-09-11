const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9270;

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

async function captureProcess() {
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

    await send('Page.navigate', { url: 'http://localhost:3000/#process' });
    await sleep(3500);

    // Scroll to #process element
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('process');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      })()`
    });
    await sleep(800);

    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\process_mobile_current_top.png', Buffer.from(shot1.data, 'base64'));

    // Scroll down a bit to see cards
    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 450)` });
    await sleep(500);
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\process_mobile_current_cards.png', Buffer.from(shot2.data, 'base64'));

    console.log('Saved process screenshots');
  } finally {
    chrome.kill();
  }
}

captureProcess().catch(console.error);
