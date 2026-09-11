const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9250;

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

async function capture(mode, filename) {
  const isMobile = mode === 'mobile';
  const width = isMobile ? 390 : 1440;
  const height = isMobile ? 844 : 900;

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=${width},${height}`,
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

    if (isMobile) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true,
        hasTouch: true
      });
    }

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3500);

    // Scroll into Services section
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('services');
        if (el) {
          window.scrollTo(0, el.offsetTop + 30);
        }
      })()`
    });
    await sleep(800);

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(filename, buffer);
    console.log(`Saved screenshot to ${filename}`);
  } finally {
    chrome.kill();
  }
}

async function main() {
  const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5';
  await capture('mobile', `${artifactDir}\\services_mobile_preview.png`);
  await sleep(1500);
  await capture('desktop', `${artifactDir}\\services_desktop_preview.png`);
}

main().catch(console.error);
