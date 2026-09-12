const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9295;

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

    await send('Page.enable');
    await send('DOM.enable');

    await send('Page.navigate', { url: 'http://localhost:3000/website-design' });
    await sleep(2000);

    const sectionsInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sections = Array.from(document.querySelectorAll('section'));
          return sections.map((s, i) => {
            const spans = Array.from(s.querySelectorAll('span'));
            const eyebrowSpan = spans.find(sp => sp.className.includes('uppercase') && sp.textContent.trim().length > 0);
            const heading = s.querySelector('h1, h2');
            return {
              index: i + 1,
              eyebrow: eyebrowSpan ? eyebrowSpan.textContent.trim() : '',
              heading: heading ? heading.textContent.trim().replace(/\\s+/g, ' ').substring(0, 60) : ''
            };
          });
        })()
      `,
      returnByValue: true
    });

    console.log('Active sections on /website-design:', JSON.stringify(sectionsInfo.result.value, null, 2));

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
