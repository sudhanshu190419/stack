const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9265;
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
    await send('DOM.enable');

    // 1. Desktop Viewport (1440 x 900)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/app-development' });
    await sleep(3000);

    // Scroll to start of Section 2
    await send('Runtime.evaluate', {
      expression: `
        const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Mobile apps built around'));
        if (el) el.closest('section').scrollIntoView({ block: 'start', behavior: 'instant' });
      `
    });
    await sleep(500);
    let ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'sec2_desktop_view.png'), Buffer.from(ss.data, 'base64'));
    console.log('Captured sec2_desktop_view.png');

    // 2. Tablet Viewport (768 x 1024)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(1000);
    await send('Runtime.evaluate', {
      expression: `
        const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Mobile apps built around'));
        if (el) el.closest('section').scrollIntoView({ block: 'start', behavior: 'instant' });
      `
    });
    await sleep(500);
    ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'sec2_tablet_view.png'), Buffer.from(ss.data, 'base64'));
    console.log('Captured sec2_tablet_view.png');

    // Check card heights on Desktop and Tablet
    const cardMetrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const cards = Array.from(document.querySelectorAll('.group.relative.flex.flex-col.justify-between'));
          return cards.map(c => ({
            title: c.querySelector('h3') ? c.querySelector('h3').textContent.trim() : '',
            offsetHeight: c.offsetHeight,
            scrollHeight: c.scrollHeight,
            overflow: c.scrollHeight > c.offsetHeight
          }));
        })()
      `,
      returnByValue: true
    });
    console.log('Card Metrics:', JSON.stringify(cardMetrics.result.value, null, 2));

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
