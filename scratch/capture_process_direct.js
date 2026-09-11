const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(port, path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + port + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function captureMode(mode, port) {
  const isMobile = mode === 'mobile';
  const width = isMobile ? 390 : 1440;
  const height = isMobile ? 844 : 900;
  const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5';

  console.log(`Starting capture for ${mode.toUpperCase()} on port ${port}...`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=${width},${height}`,
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const tabs = await getJson(port, '/json');
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
    await sleep(4000);

    // Disable all ScrollTriggers and observers so we can freely inspect #process
    await send('Runtime.evaluate', {
      expression: `(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach(st => st.disable(false));
        }
        const el = document.getElementById('process');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await sleep(1000);

    if (!isMobile) {
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_desktop_verified.png`, Buffer.from(shot.data, 'base64'));
      console.log('Saved process_desktop_verified.png');
    } else {
      const shot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_mobile_step1_top.png`, Buffer.from(shot1.data, 'base64'));
      console.log('Saved process_mobile_step1_top.png');

      await send('Runtime.evaluate', { expression: `window.scrollBy(0, 520)` });
      await sleep(600);
      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_mobile_step2_cards.png`, Buffer.from(shot2.data, 'base64'));
      console.log('Saved process_mobile_step2_cards.png');

      await send('Runtime.evaluate', { expression: `window.scrollBy(0, 520)` });
      await sleep(600);
      const shot3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_mobile_step3_bottom.png`, Buffer.from(shot3.data, 'base64'));
      console.log('Saved process_mobile_step3_bottom.png');
    }

  } finally {
    chrome.kill();
  }
}

async function main() {
  await captureMode('desktop', 9285);
  await sleep(1500);
  await captureMode('mobile', 9286);
  console.log('Finished capturing both desktop and mobile!');
}

main().catch(console.error);
