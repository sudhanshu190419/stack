const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9255;

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

async function inspectMobileImages() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,844',
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

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3500);

    const st = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('services');
        const hero = document.getElementById('hero');
        return {
          servicesTop: el?.offsetTop,
          heroHeight: hero?.offsetHeight,
          scrollY: window.scrollY
        };
      })()`,
      returnByValue: true
    });
    console.log('Offsets before scroll:', st.result.value);

    // Scroll to services
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${st.result.value.servicesTop + 20})`
    });
    await sleep(800);

    const imagesInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(img => {
          const rect = img.getBoundingClientRect();
          return {
            src: img.src,
            alt: img.alt,
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            visible: rect.bottom > 0 && rect.top < window.innerHeight,
            parentClass: img.parentElement?.className,
            grandParentClass: img.parentElement?.parentElement?.className
          };
        }).filter(i => i.visible);

        // Also check if Hero canvas or hero section is visible at top
        const heroRect = document.getElementById('hero')?.getBoundingClientRect();
        const servicesRect = document.getElementById('services')?.getBoundingClientRect();

        return {
          scrollY: window.scrollY,
          heroRect,
          servicesRect,
          visibleImages: imgs
        };
      })()`,
      returnByValue: true
    });

    console.log('Mobile layout inspection:', JSON.stringify(imagesInfo.result.value, null, 2));
  } finally {
    chrome.kill();
  }
}

inspectMobileImages().catch(console.error);
