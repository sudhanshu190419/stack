const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9265;
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
    console.log('Testing Mobile Viewport on /website-design...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Page.navigate', { url: 'http://localhost:3000/website-design' });
    await sleep(3500);

    const mobileScrollPoints = [
      { label: 'sec1_hero', y: 0 },
      { label: 'sec2_what_it_means', y: 800 },
      { label: 'sec3_services', y: 1550 },
      { label: 'sec4_process', y: 2280 },
      { label: 'sec5_goals', y: 2980 },
      { label: 'sec6_responsive', y: 3700 },
      { label: 'sec7_design_system', y: 4700 },
      { label: 'sec8_redesign', y: 5600 },
      { label: 'sec9_comparison', y: 6300 },
      { label: 'sec10_cost_factors', y: 7300 },
      { label: 'sec11_clients', y: 8050 },
      { label: 'sec12_portfolio', y: 8850 },
      { label: 'sec13_handoff', y: 10400 },
      { label: 'sec14_faq', y: 11200 },
      { label: 'sec15_cta', y: 12000 },
    ];

    for (const pt of mobileScrollPoints) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${pt.y}, behavior: 'instant' });`
      });
      await sleep(500);
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `webdesign_mobile_${pt.label}.png`), Buffer.from(ss.data, 'base64'));
      console.log(`Captured webdesign_mobile_${pt.label}.png`);
    }

    // 2. Desktop Viewport (1440 x 900)
    console.log('Testing Desktop Viewport on /website-design...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
      mobile: false,
    });

    await sleep(1000);

    const desktopScrollPoints = [
      { label: 'sec1_hero', y: 0 },
      { label: 'sec2_what_it_means', y: 850 },
      { label: 'sec3_services', y: 1550 },
      { label: 'sec4_process', y: 2250 },
      { label: 'sec6_responsive', y: 3600 },
      { label: 'sec9_comparison', y: 5500 },
      { label: 'sec12_portfolio', y: 7200 },
      { label: 'sec14_faq', y: 8500 },
    ];

    for (const pt of desktopScrollPoints) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${pt.y}, behavior: 'instant' });`
      });
      await sleep(500);
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `webdesign_desktop_${pt.label}.png`), Buffer.from(ss.data, 'base64'));
      console.log(`Captured webdesign_desktop_${pt.label}.png`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
  console.log('All captures complete!');
}

main().catch(console.error);
