const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9366;

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
            resolve(msg);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    console.log('Loading live site...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(3500);

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        try {
          const sec = document.querySelector('section');
          const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;

          window.scrollTo({ top: 3500, behavior: 'instant' });
          if (heroST) heroST.update();

          const serializeRect = r => ({ top: r.top, bottom: r.bottom, height: r.height, left: r.left });

          const step1 = {
            desc: '1. At 3500 with GSAP update',
            position: sec.style.position,
            transform: sec.style.transform,
            rect: serializeRect(sec.getBoundingClientRect())
          };

          sec.style.position = 'fixed';
          sec.style.top = '0px';
          sec.style.left = '0px';
          sec.style.width = '100%';
          sec.style.height = '100%';
          sec.style.zIndex = '50';

          const step2 = {
            desc: '2. After lockHeroBoundary()',
            position: sec.style.position,
            transform: sec.style.transform,
            rect: serializeRect(sec.getBoundingClientRect()),
            centerEl: document.elementFromPoint(720, 450)?.className
          };

          sec.style.position = '';
          sec.style.top = '';
          sec.style.left = '';
          sec.style.width = '';
          sec.style.height = '';
          sec.style.zIndex = '';
          if (heroST) heroST.update();

          const step3 = {
            desc: '3. After releaseHeroBoundary()',
            position: sec.style.position,
            transform: sec.style.transform,
            rect: serializeRect(sec.getBoundingClientRect()),
            centerEl: document.elementFromPoint(720, 450)?.tagName
          };

          return JSON.stringify({ step1, step2, step3 });
        } catch(e) {
          return 'ERROR: ' + e.message + ' stack: ' + e.stack;
        }
      })()`,
      returnByValue: true
    });

    console.log('Result:', res.result?.result?.value);

  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
