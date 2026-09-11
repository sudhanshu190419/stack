const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9289;

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

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');

    await send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 60,
      downloadThroughput: 10 * 1024 * 1024 / 8,
      uploadThroughput: 3 * 1024 * 1024 / 8,
      connectionType: 'cellular4g'
    });

    console.log('Navigating to http://127.0.0.1:3005 ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3005' });
    await sleep(2500);

    const consoleLogs = [];
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
    });

    // Inspect what's happening inside HeroCanvas
    await send('Runtime.evaluate', {
      expression: `
        window.__drawEvents = [];
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const origDraw = ctx.drawImage;
        ctx.drawImage = function(img, ...args) {
          const hud = document.querySelector('span[class*=\"font-mono\"]');
          window.__drawEvents.push({
            t: performance.now().toFixed(1),
            hud: hud ? hud.innerText : ''
          });
          return origDraw.apply(this, [img, ...args]);
        };
      `
    });

    for (let s = 100; s <= 3500; s += 100) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(100);
    }
    await sleep(1000);

    const events = await send('Runtime.evaluate', {
      expression: `window.__drawEvents`,
      returnByValue: true
    });

    console.log('Draw events captured (' + events.result.value.length + ' total):');
    console.log(events.result.value);

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
