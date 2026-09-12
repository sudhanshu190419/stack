const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9270;
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

    // ─── MOBILE (390px) ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/work' });
    await sleep(3000);

    // Check overflow
    let overflowMobile = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const docEl = document.documentElement;
          const hasOverflow = docEl.scrollWidth > window.innerWidth;
          // find elements causing overflow
          const badEls = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > window.innerWidth + 1) {
              badEls.push({
                tag: el.tagName,
                cls: el.className,
                right: r.right,
                width: r.width
              });
            }
          });
          return { hasOverflow, scrollWidth: docEl.scrollWidth, innerWidth: window.innerWidth, badCount: badEls.length, sampleBads: badEls.slice(0, 5) };
        })()
      `,
      returnByValue: true
    });
    console.log('Mobile overflow info:', JSON.stringify(overflowMobile.result.value, null, 2));

    // Capture sections
    // 1. Hero
    let scr1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'work_mobile_hero.png'), Buffer.from(scr1.data, 'base64'));

    // 2. Filter & Featured
    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 600)` });
    await sleep(600);
    let scr2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'work_mobile_featured.png'), Buffer.from(scr2.data, 'base64'));

    // 3. Grid projects
    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 700)` });
    await sleep(600);
    let scr3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'work_mobile_grid.png'), Buffer.from(scr3.data, 'base64'));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
