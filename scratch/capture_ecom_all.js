const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9256;
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

    // ─── 1. CAPTURE MOBILE VIEW (390 x 844) ───
    console.log('Navigating to Mobile (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/ecommerce-development' });
    await sleep(4000);

    const mobileSections = [
      { name: 'ecom_mobile_sec1_hero', y: 0 },
      { name: 'ecom_mobile_sec2_offerings', y: 780 },
      { name: 'ecom_mobile_sec3_principles', y: 1650 },
      { name: 'ecom_mobile_sec4_capabilities', y: 2450 },
      { name: 'ecom_mobile_sec5_platforms', y: 3400 },
      { name: 'ecom_mobile_sec6_process', y: 4450 },
      { name: 'ecom_mobile_sec7_conversion', y: 5250 },
      { name: 'ecom_mobile_sec8_mobile', y: 5950 },
      { name: 'ecom_mobile_sec9_seo', y: 6750 },
      { name: 'ecom_mobile_sec10_cost', y: 7450 },
      { name: 'ecom_mobile_sec11_comparison', y: 8300 },
      { name: 'ecom_mobile_sec12_portfolio', y: 9400 },
      { name: 'ecom_mobile_sec13_faq', y: 10400 },
      { name: 'ecom_mobile_sec14_cta', y: 11300 },
    ];

    for (const sec of mobileSections) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${sec.y})` });
      await sleep(500);
      const scr = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `${sec.name}.png`), Buffer.from(scr.data, 'base64'));
      console.log(`Saved ${sec.name}.png`);
    }

    // ─── 2. CAPTURE DESKTOP VIEW (1440 x 900) ───
    console.log('Navigating to Desktop (1440x900)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/ecommerce-development' });
    await sleep(3500);

    const desktopSections = [
      { name: 'ecom_desktop_sec1_hero', y: 0 },
      { name: 'ecom_desktop_sec2_offerings', y: 900 },
      { name: 'ecom_desktop_sec3_principles', y: 1750 },
      { name: 'ecom_desktop_sec4_capabilities', y: 2550 },
      { name: 'ecom_desktop_sec5_platforms', y: 3450 },
      { name: 'ecom_desktop_sec11_comparison', y: 4600 },
      { name: 'ecom_desktop_sec12_portfolio', y: 5650 },
      { name: 'ecom_desktop_sec13_faq', y: 6650 },
    ];

    for (const sec of desktopSections) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${sec.y})` });
      await sleep(500);
      const scr = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `${sec.name}.png`), Buffer.from(scr.data, 'base64'));
      console.log(`Saved ${sec.name}.png`);
    }

    console.log('All e-commerce screenshots captured successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

main();
