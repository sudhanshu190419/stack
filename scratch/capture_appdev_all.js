const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9260;
const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5';

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

    // 1. Mobile Viewport (390 x 844)
    console.log('Testing Mobile Viewport...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Page.navigate', { url: 'http://localhost:3000/app-development' });
    await sleep(3500);

    const mobileScrollPoints = [
      { label: 'sec2_what_we_build', y: 780 },
      { label: 'sec3_capabilities', y: 1550 },
      { label: 'sec4_timeline', y: 2280 },
      { label: 'sec5_use_cases', y: 2980 },
      { label: 'sec6_tech_stack', y: 3700 },
      { label: 'sec7_comparison', y: 4400 },
      { label: 'sec8_budgeting', y: 5600 },
      { label: 'sec9_portfolio', y: 6850 },
      { label: 'sec10_faq', y: 8100 },
      { label: 'sec11_cta', y: 8900 },
    ];

    for (const pt of mobileScrollPoints) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${pt.y}, behavior: 'instant' });`
      });
      await sleep(500);
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `appdev_mobile_${pt.label}.png`), Buffer.from(ss.data, 'base64'));
      console.log(`Captured appdev_mobile_${pt.label}.png`);
    }

    // 2. Desktop Viewport (1440 x 900)
    console.log('Testing Desktop Viewport...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
      mobile: false,
    });

    await sleep(1000);

    const desktopScrollPoints = [
      { label: 'sec2_what_we_build', y: 900 },
      { label: 'sec3_capabilities', y: 1600 },
      { label: 'sec4_timeline', y: 2300 },
      { label: 'sec5_use_cases', y: 3000 },
      { label: 'sec6_tech_stack', y: 3700 },
      { label: 'sec7_comparison', y: 4400 },
      { label: 'sec8_budgeting', y: 5300 },
      { label: 'sec9_portfolio', y: 6200 },
      { label: 'sec10_faq', y: 7100 },
      { label: 'sec11_cta', y: 7800 },
    ];

    for (const pt of desktopScrollPoints) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${pt.y}, behavior: 'instant' });`
      });
      await sleep(500);
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `appdev_desktop_${pt.label}.png`), Buffer.from(ss.data, 'base64'));
      console.log(`Captured appdev_desktop_${pt.label}.png`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
  console.log('All captures complete!');
}

main().catch(console.error);
