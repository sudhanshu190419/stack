const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9290;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(p, path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + p + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function capture() {
  const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844',
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const tabs = await getJson(port, '/json');
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

    // Scroll directly to testimonials
    await send('Runtime.evaluate', {
      expression: `(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach(st => st.disable(false));
        }
        const el = document.getElementById('testimonials');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await sleep(800);

    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}\\testimonials_mobile_current.png`, Buffer.from(shot1.data, 'base64'));

    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 300)` });
    await sleep(500);
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}\\testimonials_mobile_current_lower.png`, Buffer.from(shot2.data, 'base64'));

    console.log('Saved testimonials screenshots');
  } finally {
    chrome.kill();
  }
}

capture().catch(console.error);
