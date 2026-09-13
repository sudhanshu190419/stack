const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9291;
const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\.tempmediaStorage';

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
    '--window-size=1440,1100',
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
      width: 1440,
      height: 1100,
      deviceScaleFactor: 2,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3500);

    // Disable ScrollTrigger so we can scroll freely to testimonials
    await send('Runtime.evaluate', {
      expression: `(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach(st => st.disable(false));
        }
        const el = document.getElementById('testimonials');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`,
      awaitPromise: true,
    });

    await sleep(1500);

    const scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'testimonials_fixed_desktop.png'), Buffer.from(scr.data, 'base64'));
    console.log('Saved testimonials_fixed_desktop.png');

    // Mobile check
    await send('Emulation.setDeviceMetricsOverride', {
      width: 393,
      height: 852,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true,
    });
    await sleep(500);

    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('testimonials');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`,
      awaitPromise: true,
    });
    await sleep(1000);

    const mobileScr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'testimonials_fixed_mobile.png'), Buffer.from(mobileScr.data, 'base64'));
    console.log('Saved testimonials_fixed_mobile.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

main();
