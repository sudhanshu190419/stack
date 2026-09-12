const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9302;
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

    const viewports = [
      { name: 'desktop', width: 1440, height: 900, mobile: false },
      { name: 'tablet', width: 768, height: 1024, mobile: true },
      { name: 'mobile', width: 375, height: 812, mobile: true }
    ];

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.mobile
      });

      await send('Page.navigate', { url: 'http://localhost:3000/website-design' });
      await sleep(2000);

      // Scroll Section 3 into view
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sections = Array.from(document.querySelectorAll('section'));
            if (sections[2]) sections[2].scrollIntoView({ behavior: 'instant', block: 'start' });
          })()
        `
      });
      await sleep(1000);

      const sec3Info = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sections = Array.from(document.querySelectorAll('section'));
            const sec3 = sections[2];
            if (!sec3) return { error: 'Section 3 not found' };
            const h2 = sec3.querySelector('h2');
            const cards = Array.from(sec3.querySelectorAll('h3')).map(h3 => {
              const card = h3.closest('div[class*="rounded-xl"]') || h3.parentElement;
              const label = card ? card.querySelector('span[class*="font-mono"]') : null;
              return {
                label: label ? label.textContent.trim() : '',
                title: h3.textContent.trim(),
                desc: card && card.querySelector('p') ? card.querySelector('p').textContent.trim() : ''
              };
            });
            return {
              heading: h2 ? h2.textContent.trim() : '',
              cardsCount: cards.length,
              cards
            };
          })()
        `,
        returnByValue: true
      });

      console.log('[' + vp.name.toUpperCase() + '] Section 3 Info:', JSON.stringify(sec3Info.result.value, null, 2));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const imgPath = path.join(artifactDir, 'sec3_scrolled_' + vp.name + '.png');
      fs.writeFileSync(imgPath, Buffer.from(shot.data, 'base64'));
      console.log('Saved screenshot to ' + imgPath);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
