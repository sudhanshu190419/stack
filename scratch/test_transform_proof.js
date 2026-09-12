const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9344;
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

    console.log('Loading live site https://www.stackstich.online/ ...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(3500);

    // 1. Check state when scroll is at 3500:
    console.log('\n--- TEST 1: Scroll to 3500 and inspect pinTarget styles ---');
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3500, behavior: 'instant' })` });
    await sleep(400);

    const check1 = await send('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.querySelector('section');
        const style = window.getComputedStyle(sec);
        const rect = sec.getBoundingClientRect();
        return {
          inlineStyle: {
            position: sec.style.position,
            transform: sec.style.transform,
            top: sec.style.top
          },
          computedStyle: {
            position: style.position,
            transform: style.transform,
            top: style.top
          },
          rect: {
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            width: rect.width
          },
          isInViewport: rect.top < window.innerHeight && rect.bottom > 0
        };
      })()`,
      returnByValue: true
    });
    console.log('Check 1 (at scroll 3500):', JSON.stringify(check1.result.value, null, 2));

    // Capture screenshot at scroll 3500
    let scr1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'proof_scroll_3500.png'), Buffer.from(scr1.data, 'base64'));

    // 2. Simulate what lockHeroBoundary() does:
    // lockHeroBoundary() sets position: fixed, top: 0, left: 0, width: 100%, height: 100%, zIndex: 50
    // BUT leaves sec.style.transform as whatever GSAP set it!
    console.log('\n--- TEST 2: Execute lockHeroBoundary() as currently implemented ---');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const pinTarget = document.querySelector('section');
        pinTarget.style.position = 'fixed';
        pinTarget.style.top = '0px';
        pinTarget.style.left = '0px';
        pinTarget.style.width = '100%';
        pinTarget.style.height = '100%';
        pinTarget.style.zIndex = '50';
      })()`
    });

    const check2 = await send('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.querySelector('section');
        const style = window.getComputedStyle(sec);
        const rect = sec.getBoundingClientRect();
        const centerEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        return {
          inlineStyle: {
            position: sec.style.position,
            transform: sec.style.transform,
            top: sec.style.top
          },
          computedTransform: style.transform,
          rect: {
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          },
          isInViewport: rect.top < window.innerHeight && rect.bottom > 0,
          centerElement: centerEl ? centerEl.tagName + (centerEl.className ? '.' + centerEl.className.split(' ')[0] : '') : null,
          centerBgColor: centerEl ? window.getComputedStyle(centerEl).backgroundColor : null,
          bodyBgColor: window.getComputedStyle(document.body).backgroundColor
        };
      })()`,
      returnByValue: true
    });
    console.log('Check 2 (after lockHeroBoundary):', JSON.stringify(check2.result.value, null, 2));

    // Capture screenshot after lockHeroBoundary()
    let scr2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'proof_locked_hero_boundary.png'), Buffer.from(scr2.data, 'base64'));

    // 3. Now test if we ALSO set transform: 'none' or 'translate(0px, 0px)':
    console.log('\n--- TEST 3: What happens if transform is reset during lock? ---');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const pinTarget = document.querySelector('section');
        pinTarget.style.transform = 'none';
      })()`
    });

    const check3 = await send('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.querySelector('section');
        const rect = sec.getBoundingClientRect();
        const centerEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        return {
          rect: {
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          },
          isInViewport: rect.top < window.innerHeight && rect.bottom > 0,
          centerElement: centerEl ? centerEl.tagName : null,
          centerBgColor: centerEl ? window.getComputedStyle(centerEl).backgroundColor : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Check 3 (with transform: none):', JSON.stringify(check3.result.value, null, 2));

    let scr3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'proof_locked_with_transform_none.png'), Buffer.from(scr3.data, 'base64'));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
