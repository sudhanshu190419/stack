const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9288;
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

    console.log('--- TEST 1: DESKTOP TWO-WAY NAVIGATION ---');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    // 1. Scroll to Services on Desktop
    await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;
        if (st) {
          window.scrollTo({ top: st.start + 50, behavior: 'instant' });
        }
      })()`
    });
    await sleep(1000);

    // 2. Select service index 1 (Web Development) by clicking its title or row
    await send('Runtime.evaluate', {
      expression: `(() => {
        const items = document.querySelectorAll('#services .group');
        if (items.length > 1) {
          items[1].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        }
      })()`
    });
    await sleep(800);

    // 3. Click the active service arrow button
    const clickResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const arrowBtn = document.querySelector('#services a[aria-label*="Web Development"]');
        if (arrowBtn) {
          arrowBtn.click();
          return { clicked: true, href: arrowBtn.getAttribute('href') };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('Clicked Desktop Arrow Button:', clickResult.result.value);

    // Wait for route change to /web-development
    await sleep(2500);

    const servicePageState = await send('Runtime.evaluate', {
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
    console.log('Destination Service Page State:', servicePageState.result.value);

    let scrDeskService = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'desktop_service_page_landing.png'), Buffer.from(scrDeskService.data, 'base64'));

    // 4. Navigate BACK to homepage via browser back
    console.log('Executing browser back...');
    await send('Runtime.evaluate', { expression: `window.history.back()` });
    await sleep(3000);

    const backState = await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;
        const activeTitleEl = document.querySelector('#services h3.text-neutral-950');
        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          stStart: st ? st.start : null,
          activeTitle: activeTitleEl ? activeTitleEl.textContent.trim() : null,
          sessionStorageCleared: sessionStorage.getItem('stack_return_to_services') === null
        };
      })()`,
      returnByValue: true
    });
    console.log('Homepage Back State on Desktop:', backState.result.value);

    let scrDeskBack = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'desktop_returned_to_services.png'), Buffer.from(scrDeskBack.data, 'base64'));

    console.log('\n--- TEST 2: MOBILE TWO-WAY NAVIGATION ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(500);

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    // Scroll to Services on Mobile
    await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-mobile') : null;
        if (st) {
          window.scrollTo({ top: st.start + 50, behavior: 'instant' });
        }
      })()`
    });
    await sleep(1000);

    // Click the Mobile Arrow Button
    const mobileClickResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const arrow = document.querySelector('#services a[aria-label*="Website Design"]');
        if (arrow) {
          arrow.click();
          return { clicked: true, href: arrow.getAttribute('href') };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('Clicked Mobile Arrow Button:', mobileClickResult.result.value);

    await sleep(2500);

    const mobileServicePageState = await send('Runtime.evaluate', {
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
    console.log('Mobile Destination Page State:', mobileServicePageState.result.value);

    let scrMobService = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'mobile_service_page_landing.png'), Buffer.from(scrMobService.data, 'base64'));

    // Navigate BACK to homepage on Mobile
    console.log('Executing mobile browser back...');
    await send('Runtime.evaluate', { expression: `window.history.back()` });
    await sleep(3000);

    const mobileBackState = await send('Runtime.evaluate', {
      expression: `(() => {
        const st = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-mobile') : null;
        const titleEl = document.querySelector('#services h3');
        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          stStart: st ? st.start : null,
          activeTitle: titleEl ? titleEl.textContent.trim() : null,
          sessionStorageCleared: sessionStorage.getItem('stack_return_to_services') === null
        };
      })()`,
      returnByValue: true
    });
    console.log('Homepage Back State on Mobile:', mobileBackState.result.value);

    let scrMobBack = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'mobile_returned_to_services.png'), Buffer.from(scrMobBack.data, 'base64'));

  } catch (err) {
    console.error('Error in test:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
