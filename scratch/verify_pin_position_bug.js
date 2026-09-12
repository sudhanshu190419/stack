const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9333;

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

    console.log('Loading live site...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(3500);

    // Scenario A: Normal Scroll to 3500, then to 3800
    console.log('\n--- SCENARIO A: Normal Scroll (GSAP controlled) ---');
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3500, behavior: 'instant' })` });
    await sleep(300);
    const stateAt3500Normal = await send('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.querySelector('section');
        const spacer = document.querySelector('.pin-spacer-hero-scroll-trigger');
        const rect = sec.getBoundingClientRect();
        return {
          scrollY: window.scrollY,
          position: sec.style.position,
          transform: sec.style.transform,
          top: sec.style.top,
          rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
          spacerHeight: spacer ? spacer.style.height : null
        };
      })()`,
      returnByValue: true
    });
    console.log('State at 3500 (Normal):', stateAt3500Normal.result.value);

    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 3800, behavior: 'instant' })` });
    await sleep(300);
    const stateAt3800Normal = await send('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.querySelector('section');
        const rect = sec.getBoundingClientRect();
        const elAtCenter = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        return {
          scrollY: window.scrollY,
          position: sec.style.position,
          transform: sec.style.transform,
          top: sec.style.top,
          rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
          centerTag: elAtCenter ? elAtCenter.tagName + (elAtCenter.id ? '#' + elAtCenter.id : '') : null,
          centerBg: elAtCenter ? window.getComputedStyle(elAtCenter).backgroundColor : null
        };
      })()`,
      returnByValue: true
    });
    console.log('State at 3800 (Normal):', stateAt3800Normal.result.value);

    // Scenario B: Fast Scroll simulation where lockHeroBoundary engages and releases
    console.log('\n--- SCENARIO B: Fast scroll triggering lockHeroBoundary & release ---');
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' })` });
    await sleep(1000);

    // Trigger fast scroll surge
    for (let i = 0; i < 6; i++) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseWheel',
        x: 700,
        y: 450,
        deltaX: 0,
        deltaY: 1200
      });
      await sleep(20);
    }

    // Measure state immediately during and after gate release
    for (let i = 0; i < 10; i++) {
      const state = await send('Runtime.evaluate', {
        expression: `(() => {
          const sec = document.querySelector('section');
          const rect = sec ? sec.getBoundingClientRect() : null;
          const elAtCenter = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
          return {
            step: ${i},
            scrollY: window.scrollY,
            position: sec ? sec.style.position : null,
            transform: sec ? sec.style.transform : null,
            top: sec ? sec.style.top : null,
            rectTop: rect ? rect.top : null,
            rectBottom: rect ? rect.bottom : null,
            centerTag: elAtCenter ? elAtCenter.tagName + (elAtCenter.id ? '#' + elAtCenter.id : '') + (elAtCenter.className ? '.' + elAtCenter.className.split(' ')[0] : '') : null,
            centerBg: elAtCenter ? window.getComputedStyle(elAtCenter).backgroundColor : null
          };
        })()`,
        returnByValue: true
      });
      console.log(`Step ${i}:`, JSON.stringify(state.result.value));
      await sleep(150);
    }

  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
