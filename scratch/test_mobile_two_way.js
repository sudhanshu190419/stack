const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9299;
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
    '--window-size=390,844',
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    console.log('Navigating to http://localhost:3000/ on Mobile...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    // Scroll directly to Services trigger on mobile
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

    // List all links in #services
    const linksInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        return Array.from(document.querySelectorAll('#services a')).map((a, i) => ({
          index: i,
          href: a.getAttribute('href'),
          ariaLabel: a.getAttribute('aria-label'),
          text: a.innerText.trim(),
          offsetWidth: a.offsetWidth,
          offsetHeight: a.offsetHeight
        }));
      })()`,
      returnByValue: true
    });
    console.log('Mobile Services Links:', JSON.stringify(linksInfo.result.value, null, 2));

    // Click the visible arrow button
    const clickResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const arrow = document.querySelector('#services a[aria-label*="Website Design"]') ||
                      Array.from(document.querySelectorAll('#services a')).find(a => a.offsetHeight > 0 && a.getAttribute('aria-label'));
        if (arrow) {
          arrow.click();
          return { clicked: true, href: arrow.getAttribute('href'), aria: arrow.getAttribute('aria-label') };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('Mobile Click Result:', clickResult.result.value);

    // Wait for route change to /website-design
    await sleep(2500);

    const destState = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          sessionStorageReturn: sessionStorage.getItem('stack_return_to_services'),
          sessionStorageIdx: sessionStorage.getItem('stack_return_service_idx')
        };
      })()`,
      returnByValue: true
    });
    console.log('Mobile Destination Page State:', destState.result.value);

    let scrMobService = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'mobile_service_page_landing.png'), Buffer.from(scrMobService.data, 'base64'));

    // Navigate BACK to homepage on Mobile via browser back
    console.log('Executing mobile browser back...');
    await send('Runtime.evaluate', { expression: `window.history.back()` });
    await sleep(3000);

    const backState = await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-mobile') : null;
        const h3El = document.querySelector('#services h3');
        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          stStart: st ? st.start : null,
          title: h3El ? h3El.textContent.trim() : null,
          sessionStorageCleared: sessionStorage.getItem('stack_return_to_services') === null
        };
      })()`,
      returnByValue: true
    });
    console.log('Mobile Homepage Back State:', backState.result.value);

    let scrMobBack = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'mobile_returned_to_services.png'), Buffer.from(scrMobBack.data, 'base64'));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
