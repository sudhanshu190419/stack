const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9278;
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

    // 1. Desktop Test:
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    // Scroll directly to Services trigger
    await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;
        if (st) {
          window.scrollTo({ top: st.start + 50, behavior: 'instant' });
        } else {
          document.getElementById('services').scrollIntoView();
        }
      })()`
    });
    await sleep(1500);

    const desktopInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const links = Array.from(document.querySelectorAll('#services a'));
        return links.map(a => ({
          text: a.textContent.trim(),
          ariaLabel: a.getAttribute('aria-label'),
          href: a.getAttribute('href'),
          rect: a.getBoundingClientRect()
        }));
      })()`,
      returnByValue: true
    });
    console.log('Desktop Services Links found:', JSON.stringify(desktopInfo.result.value, null, 2));

    let scrDesk = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'services_desktop_arrow_verified.png'), Buffer.from(scrDesk.data, 'base64'));

    // 2. Mobile Test: Viewport 390x844
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(800);

    await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-mobile') : null;
        if (st) {
          window.scrollTo({ top: st.start + 50, behavior: 'instant' });
        } else {
          document.getElementById('services').scrollIntoView();
        }
      })()`
    });
    await sleep(1500);

    const mobileInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const links = Array.from(document.querySelectorAll('#services a'));
        return links.map(a => ({
          text: a.textContent.trim(),
          ariaLabel: a.getAttribute('aria-label'),
          href: a.getAttribute('href'),
          rect: a.getBoundingClientRect()
        }));
      })()`,
      returnByValue: true
    });
    console.log('Mobile Services Links found:', JSON.stringify(mobileInfo.result.value, null, 2));

    let scrMob = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'services_mobile_arrow_verified.png'), Buffer.from(scrMob.data, 'base64'));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
