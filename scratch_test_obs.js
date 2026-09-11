const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9241;

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
    `--window-size=1440,900`,
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

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3500);

    // Let's add console listener or evaluate Observer behavior
    const obsTest = await send('Runtime.evaluate', {
      expression: `(() => {
        let events = [];
        window.__events = events;
        // Check window.ScrollTrigger
        return {
          hasST: typeof ScrollTrigger !== 'undefined',
        };
      })()`,
      returnByValue: true
    });
    console.log('Obs test setup:', obsTest.result.value);

    // Let's inject a debug logger into the page to see what happens when we scroll to 3500
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.__logs = [];
        const origLog = console.log;
        console.log = (...args) => {
          window.__logs.push(args.join(' '));
          origLog(...args);
        };
      })()`
    });

  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
