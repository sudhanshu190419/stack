const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9243;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=390,844`,
    'about:blank'
  ]);

  try {
    await sleep(2000);
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
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true
    });

    const fileUrl = 'file:///C:/Projects/stack/test_obs.html';
    await send('Page.navigate', { url: fileUrl });
    await sleep(2000);

    console.log('Sending touch scroll gesture...');
    await send('Input.synthesizeScrollGesture', {
      x: 150,
      y: 600,
      yDistance: -300, // scroll down = drag up
      gestureSourceType: 'touch'
    });
    await sleep(1000);

    const logText = await send('Runtime.evaluate', {
      expression: `document.getElementById('log').innerText`,
      returnByValue: true
    });
    console.log('LOG OUTPUT:\n' + logText.result.value);

  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
