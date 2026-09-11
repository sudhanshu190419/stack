const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9257;
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

    // ─── 1. MOBILE EXACT VIEWS ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/ecommerce-development' });
    await sleep(3500);

    // Platform section mobile
    await send('Runtime.evaluate', { expression: `document.querySelectorAll('section')[4].scrollIntoView()` });
    await sleep(600);
    let scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_mobile_platforms_exact.png'), Buffer.from(scr.data, 'base64'));

    // Portfolio section mobile
    await send('Runtime.evaluate', { expression: `document.getElementById('ecom-portfolio').scrollIntoView()` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_mobile_portfolio_exact.png'), Buffer.from(scr.data, 'base64'));

    // CTA section mobile
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, document.body.scrollHeight - 1300)` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_mobile_cta_exact.png'), Buffer.from(scr.data, 'base64'));

    // ─── 2. DESKTOP EXACT VIEWS ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/ecommerce-development' });
    await sleep(3500);

    // Desktop comparison table
    await send('Runtime.evaluate', { expression: `document.querySelectorAll('section')[10].scrollIntoView()` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_desktop_comparison_table.png'), Buffer.from(scr.data, 'base64'));

    // Desktop platform options
    await send('Runtime.evaluate', { expression: `document.querySelectorAll('section')[4].scrollIntoView()` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'ecom_desktop_platforms.png'), Buffer.from(scr.data, 'base64'));

    console.log('Targeted captures complete!');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

main();
