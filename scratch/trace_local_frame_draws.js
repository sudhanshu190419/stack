const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9297;

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
  // First start the local prod server if not running
  console.log('Testing local production...');
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
    await send('Page.enable');
    await send('Network.enable');

    console.log('Navigating to http://127.0.0.1:3005 ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3005' });
    await sleep(2500);

    await send('Runtime.evaluate', {
      expression: `
        window.__frameLog = [];
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const origDrawImage = ctx.drawImage;
        
        ctx.drawImage = function(...args) {
          const hudText = document.querySelector('span[class*=\"font-mono\"]') ? document.querySelector('span[class*=\"font-mono\"]').innerText : '';
          const match = hudText.match(/^(\\d+)/);
          const currentTarget = match ? parseInt(match[1], 10) : -1;
          window.__frameLog.push({
            time: performance.now(),
            targetFrame: currentTarget,
          });
          return origDrawImage.apply(this, args);
        };
      `
    });

    console.log('Simulating normal user scroll (3500px over 3 seconds) on LOCALHOST...');
    for (let s = 100; s <= 3500; s += 100) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(85);
    }

    await sleep(500);

    const frameLog = await send('Runtime.evaluate', {
      expression: `window.__frameLog`,
      returnByValue: true
    });

    console.log('\nTotal canvas drawImage calls on LOCALHOST during 3s scroll:', frameLog.result.value.length);
    console.log('Sample of drawImage calls on LOCALHOST:');
    const log = frameLog.result.value;
    for (let i = 0; i < Math.min(log.length, 30); i++) {
      console.log(`[#${i}] time: ${log[i].time.toFixed(1)}ms, targetFrame: ${log[i].targetFrame}`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
