const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9303;
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

      // Find comparison section and scroll into view
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const h2s = Array.from(document.querySelectorAll('h2'));
            const targetH2 = h2s.find(h => h.textContent.includes('Custom website or template?'));
            if (targetH2) {
              const sec = targetH2.closest('section');
              if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          })()
        `
      });
      await sleep(1000);

      const sectionInfo = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const h2s = Array.from(document.querySelectorAll('h2'));
            const targetH2 = h2s.find(h => h.textContent.includes('Custom website or template?'));
            if (!targetH2) return { error: 'Section not found' };
            const sec = targetH2.closest('section');
            const h2 = sec.querySelector('h2');
            const p = sec.querySelector('p');
            const table = sec.querySelector('table');
            let rows = [];
            if (table) {
              rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
                const tds = Array.from(tr.querySelectorAll('td'));
                return {
                  factor: tds[0] ? tds[0].textContent.trim() : '',
                  hasIcon: tds[0] ? !!tds[0].querySelector('svg') : false,
                  custom: tds[1] ? tds[1].textContent.trim() : '',
                  template: tds[2] ? tds[2].textContent.trim() : ''
                };
              });
            } else {
              const cards = Array.from(sec.querySelectorAll('h3')).map(h3 => {
                const card = h3.closest('div[class*="rounded-xl"]');
                return {
                  factor: h3.textContent.trim(),
                  hasIcon: card ? !!card.querySelector('svg') : false
                };
              });
              rows = cards;
            }
            return {
              heading: h2 ? h2.textContent.trim() : '',
              sub: p ? p.textContent.trim() : '',
              rowCount: rows.length,
              rows
            };
          })()
        `,
        returnByValue: true
      });

      console.log('[' + vp.name.toUpperCase() + '] Comparison Info:', JSON.stringify(sectionInfo.result.value, null, 2));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const imgPath = path.join(artifactDir, 'comparison_scrolled_' + vp.name + '.png');
      fs.writeFileSync(imgPath, Buffer.from(shot.data, 'base64'));
      console.log('Saved screenshot to ' + imgPath);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
