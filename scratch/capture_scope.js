const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9250;
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

    console.log('Navigating to http://localhost:3000/web-development...');
    await send('Page.navigate', { url: 'http://localhost:3000/web-development' });
    await sleep(3500);

    // 1. MOBILE VIEW (390 x 844)
    console.log('Capturing Mobile Scope (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true
    });
    await sleep(1000);

    await send('Runtime.evaluate', {
      expression: `(() => {
        const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('Everything required to bring your digital presence to life'));
        if (h2) h2.closest('section').scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await sleep(1200);

    const shotScopeTop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'webdev_scope_mobile_top.png'), Buffer.from(shotScopeTop.data, 'base64'));

    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 450)` });
    await sleep(800);
    const shotScopeCards = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'webdev_scope_mobile_cards.png'), Buffer.from(shotScopeCards.data, 'base64'));

    // 2. DESKTOP VIEW (1440 x 900)
    console.log('Capturing Desktop Scope (1440x900)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
      hasTouch: false
    });
    await sleep(1000);

    await send('Runtime.evaluate', {
      expression: `(() => {
        const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('Everything required to bring your digital presence to life'));
        if (h2) h2.closest('section').scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await sleep(1500);

    const shotDesktopScope = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'webdev_scope_desktop.png'), Buffer.from(shotDesktopScope.data, 'base64'));

    console.log('Saved all scope screenshots.');
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

main();
