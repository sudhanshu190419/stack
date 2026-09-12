const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9268;
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
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500);

    // Capture navbar on desktop
    let navClip = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('main-navbar');
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 };
        })()
      `,
      returnByValue: true
    });

    if (navClip.result.value) {
      let scr = await send('Page.captureScreenshot', {
        format: 'png',
        clip: navClip.result.value
      });
      fs.writeFileSync(path.join(artifactDir, 'navbar_desktop_no_testimonials.png'), Buffer.from(scr.data, 'base64'));
      console.log('Desktop navbar screenshot saved');
    }

    // ─── 2. MOBILE (390px) ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(600);
    // Click hamburger button to open mobile menu
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('button[aria-label="Toggle menu"]');
        if (btn) btn.click();
      `
    });
    await sleep(600);

    let scrMob = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'navbar_mobile_no_testimonials.png'), Buffer.from(scrMob.data, 'base64'));
    console.log('Mobile menu screenshot saved');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
