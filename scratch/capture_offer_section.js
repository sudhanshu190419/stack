const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9268;
const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\989c6567-5bb7-4f01-b67d-4cee3fced5c4';

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
    '--window-size=1500,1050',
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1500,
      height: 1050,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(4000);

    const r = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('offer');
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            x: Math.round(rect.x),
            y: Math.round(rect.top + window.scrollY),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          };
        })()
      `,
      returnByValue: true
    });
    const measurements = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const eyebrow = document.querySelector("#offer-eyebrow");
          const h2 = document.querySelector("#offer h2");
          const btn = document.querySelector("#offer a[href='/contact']");
          const img = document.querySelector("#offer img[src*='promotion']");
          const er = eyebrow ? eyebrow.getBoundingClientRect() : null;
          const hr = h2 ? h2.getBoundingClientRect() : null;
          const br = btn ? btn.getBoundingClientRect() : null;
          const ir = img ? img.getBoundingClientRect() : null;
          return {
            btnBottom: br ? Math.round(br.bottom) : null,
            imgBottom: ir ? Math.round(ir.bottom) : null,
            diff: (br && ir) ? Math.round(ir.bottom - br.bottom) : null,
            gapEyebrowToH2: (er && hr) ? Math.round(hr.top - er.bottom) : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Alignment measurement:', measurements.result.value);

    const scr = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: r.result.value.x,
        y: r.result.value.y,
        width: r.result.value.width,
        height: r.result.value.height,
        scale: 1
      },
      captureBeyondViewport: true
    });
    const outPath = path.join(artifactDir, 'offer_section_desktop.png');
    fs.writeFileSync(outPath, Buffer.from(scr.data, 'base64'));

    console.log('Successfully captured screenshot to:', outPath);
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

main();
