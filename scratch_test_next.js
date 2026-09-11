const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9251;

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

    // Scroll to 4304
    console.log('Scrolling to 4304px...');
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 4304)` });
    await sleep(1500); // Wait 1.5s for any transition cooldown to finish

    const stateAt1500 = await send('Runtime.evaluate', {
      expression: `(() => {
        const debug = window.__servicesDebug;
        return {
          scrollY: window.scrollY,
          isLocked: debug?.isLockedRef?.current,
          isTransitioning: debug?.isTransitioningRef?.current,
          activeIndex: debug?.activeIndexRef?.current,
          obsEnabled: debug?.obs?.isEnabled
        };
      })()`,
      returnByValue: true
    });
    console.log('State at 1.5s after arriving at 4304:', stateAt1500.result.value);

    // Now call goToIndex(1)
    console.log('Calling goToIndex(1)...');
    await send('Runtime.evaluate', {
      expression: `window.__servicesDebug?.goToIndex(1)`
    });
    await sleep(1000);

    const afterGoTo1 = await send('Runtime.evaluate', {
      expression: `(() => {
        const debug = window.__servicesDebug;
        const activeText = document.querySelector('#services .font-mono')?.innerText;
        return {
          scrollY: window.scrollY,
          isTransitioning: debug?.isTransitioningRef?.current,
          activeIndex: debug?.activeIndexRef?.current,
          activeText
        };
      })()`,
      returnByValue: true
    });
    console.log('After goToIndex(1):', afterGoTo1.result.value);

    // Now call goToIndex(2)
    console.log('Calling goToIndex(2)...');
    await send('Runtime.evaluate', {
      expression: `window.__servicesDebug?.goToIndex(2)`
    });
    await sleep(1000);

    const afterGoTo2 = await send('Runtime.evaluate', {
      expression: `(() => {
        const debug = window.__servicesDebug;
        const activeText = document.querySelector('#services .font-mono')?.innerText;
        return {
          scrollY: window.scrollY,
          activeIndex: debug?.activeIndexRef?.current,
          activeText
        };
      })()`,
      returnByValue: true
    });
    console.log('After goToIndex(2):', afterGoTo2.result.value);

  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
