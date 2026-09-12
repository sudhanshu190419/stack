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

    // ─── 1. DESKTOP (1440px) ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/ecommerce-development' });
    await sleep(3000);

    // Scroll to section 2 (Platform section)
    await send('Runtime.evaluate', {
      expression: `
        const sec = document.querySelectorAll('section')[2];
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await sleep(800);
    let scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_platform_desktop.png'), Buffer.from(scr.data, 'base64'));

    let overflowDesktop = await send('Runtime.evaluate', {
      expression: `document.documentElement.scrollWidth > document.documentElement.clientWidth`
    });
    console.log('Desktop overflow:', overflowDesktop.result.value);

    // ─── 2. TABLET (768px) ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(800);
    await send('Runtime.evaluate', {
      expression: `
        const sec = document.querySelectorAll('section')[2];
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await sleep(800);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_platform_tablet.png'), Buffer.from(scr.data, 'base64'));

    // ─── 3. MOBILE (375px) ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(800);
    await send('Runtime.evaluate', {
      expression: `
        const sec = document.querySelectorAll('section')[2];
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await sleep(800);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_platform_mobile_top.png'), Buffer.from(scr.data, 'base64'));

    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 450)` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_platform_mobile_bottom.png'), Buffer.from(scr.data, 'base64'));

    let overflowMobile = await send('Runtime.evaluate', {
      expression: `document.documentElement.scrollWidth > document.documentElement.clientWidth`
    });
    console.log('Mobile overflow:', overflowMobile.result.value);

    console.log('PLATFORM SCREENSHOTS CAPTURED SUCCESSFULLY');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
