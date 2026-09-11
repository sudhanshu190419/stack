const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9280;

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

async function captureProcessView(mode) {
  const isMobile = mode === 'mobile';
  const width = isMobile ? 390 : 1440;
  const height = isMobile ? 844 : 900;
  const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5';

  console.log(`\nCapturing Process section for ${mode.toUpperCase()} (${width}x${height})...`);

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
    await sleep(4000);

    // Get position of #process
    const pos = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('process');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          height: rect.height
        };
      })()`,
      returnByValue: true
    });

    console.log('Process element position:', pos.result.value);

    if (!pos.result.value) {
      throw new Error('#process element not found in DOM!');
    }

    const targetY = pos.result.value.top;

    if (!isMobile) {
      // Desktop: Scroll directly to process top
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${targetY - 40})` });
      await sleep(1000);

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_desktop_verified.png`, Buffer.from(shot.data, 'base64'));
      console.log('Saved process_desktop_verified.png');
    } else {
      // Mobile: Capture multiple frames down the stepper timeline
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${targetY - 50})` });
      await sleep(1000);
      const shot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_mobile_step1_top.png`, Buffer.from(shot1.data, 'base64'));
      console.log('Saved process_mobile_step1_top.png');

      await send('Runtime.evaluate', { expression: `window.scrollBy(0, 480)` });
      await sleep(600);
      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_mobile_step2_cards.png`, Buffer.from(shot2.data, 'base64'));
      console.log('Saved process_mobile_step2_cards.png');

      await send('Runtime.evaluate', { expression: `window.scrollBy(0, 480)` });
      await sleep(600);
      const shot3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\process_mobile_step3_bottom.png`, Buffer.from(shot3.data, 'base64'));
      console.log('Saved process_mobile_step3_bottom.png');
    }

    // Verify visibility of branches
    const branchCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const desktopDiv = document.querySelector('#process .hidden.lg\\:block');
        const mobileDiv = document.querySelector('#process .block.lg\\:hidden');
        return {
          desktopDisplay: desktopDiv ? window.getComputedStyle(desktopDiv).display : 'missing',
          mobileDisplay: mobileDiv ? window.getComputedStyle(mobileDiv).display : 'missing',
        };
      })()`,
      returnByValue: true
    });
    console.log('Branch displays:', branchCheck.result.value);

  } finally {
    chrome.kill();
  }
}

async function main() {
  await captureProcessView('desktop');
  await sleep(1500);
  await captureProcessView('mobile');
}

main().catch(console.error);
