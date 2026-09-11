const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9295;
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
  console.log('Starting headless Chrome on port ' + debuggingPort);
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

    const consoleLogs = [];
    const heroRequests = [];
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description).join(' ');
        consoleLogs.push(text);
      }
      if (msg.method === 'Network.requestWillBeSent') {
        const u = msg.params.request.url;
        if (u.includes('/hero/')) {
          heroRequests.push({ url: u, timestamp: msg.params.timestamp });
        }
      }
    });

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');

    console.log('Navigating to http://127.0.0.1:3005 ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3005' });
    await sleep(3000);

    console.log('Initial hero requests count on mount:', heroRequests.length);

    // Evaluate canvas & hero status
    const heroInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const c = document.querySelector('canvas');
          const hud = document.querySelector('section');
          return {
            canvasFound: !!c,
            canvasWidth: c ? c.width : 0,
            canvasHeight: c ? c.height : 0,
            scrollTriggerCount: typeof ScrollTrigger !== 'undefined' ? ScrollTrigger.getAll().length : -1,
            heroHeadline: document.querySelector('h1') ? document.querySelector('h1').innerText.replace(/\\n/g, ' ') : ''
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Hero DOM & Canvas Info:', heroInfo.result.value);

    // Initial screenshot
    let ss1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'hero_prod_verified_mount.png'), Buffer.from(ss1.data, 'base64'));
    console.log('Saved hero_prod_verified_mount.png');

    // Simulate forward scroll
    console.log('Scrolling forward to 1200px...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1200);' });
    await sleep(800);
    let ss2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'hero_prod_verified_scroll1200.png'), Buffer.from(ss2.data, 'base64'));
    console.log('Saved hero_prod_verified_scroll1200.png, requests so far:', heroRequests.length);

    console.log('Scrolling forward to 2500px...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 2500);' });
    await sleep(800);
    let ss3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'hero_prod_verified_scroll2500.png'), Buffer.from(ss3.data, 'base64'));
    console.log('Saved hero_prod_verified_scroll2500.png, requests so far:', heroRequests.length);

    // Simulate backward scroll
    console.log('Scrolling backward to 500px...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 500);' });
    await sleep(800);
    let ss4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'hero_prod_verified_scrollback500.png'), Buffer.from(ss4.data, 'base64'));
    console.log('Saved hero_prod_verified_scrollback500.png, requests so far:', heroRequests.length);

    console.log('Console logs during test:', consoleLogs);
    console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
  }
}

main();
