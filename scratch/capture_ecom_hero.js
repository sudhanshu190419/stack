const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9305;
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

    const viewports = [
      { name: 'desktop', width: 1440, height: 900, mobile: false },
      { name: 'tablet', width: 768, height: 1024, mobile: true },
      { name: 'mobile', width: 375, height: 812, mobile: true }
    ];

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.mobile
      });

      await send('Page.navigate', { url: 'http://localhost:3000/ecommerce-development' });
      await sleep(2000);

      const heroInfo = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const h1 = document.querySelector('h1');
            const p = document.querySelector('section p');
            const ctas = Array.from(document.querySelectorAll('section a')).slice(0, 3).map(a => a.textContent.trim());
            const features = Array.from(document.querySelectorAll('section div.border-t span')).map(s => s.textContent.trim());
            return {
              h1Text: h1?.innerText,
              pText: p?.textContent.trim(),
              ctas,
              features
            };
          })()
        `,
        returnByValue: true
      });

      console.log('[' + vp.name.toUpperCase() + '] Hero Info:', JSON.stringify(heroInfo.result.value, null, 2));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const imgPath = path.join(artifactDir, 'ecom_hero_' + vp.name + '.png');
      fs.writeFileSync(imgPath, Buffer.from(shot.data, 'base64'));
      console.log('Saved screenshot to ' + imgPath);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
