const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9252;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function runE2E(mode) {
  const isMobile = mode === 'mobile';
  const width = isMobile ? 390 : 1440;
  const height = isMobile ? 844 : 900;

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=${width},${height}`,
    'about:blank'
  ]);

  try {
    await sleep(2000);
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

    if (isMobile) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true,
        hasTouch: true
      });
    }

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3500);

    const checkHeroST = await send('Runtime.evaluate', {
      expression: `(() => {
        const heroST = window.ScrollTrigger?.getById('hero-scroll-trigger');
        const servicesST = window.ScrollTrigger?.getById('services-scroll-trigger');
        return {
          heroEnd: heroST?.end,
          servicesStart: servicesST?.start,
          servicesEnd: servicesST?.end
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${mode.toUpperCase()}] ST ranges:`, checkHeroST.result.value);
    const heroEnd = checkHeroST.result.value.heroEnd;
    const servicesStart = checkHeroST.result.value.servicesStart;

    // Step 1: Scroll to middle of Hero
    console.log(`[${mode.toUpperCase()}] Step 1: Mid-Hero scroll...`);
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${heroEnd / 2})` });
    await sleep(300);
    const midHero = await send('Runtime.evaluate', {
      expression: `document.querySelector('#hero-frame-counter')?.innerText || document.body.innerText.match(/\\d+ \\/ \\d+/)?.[0]`,
      returnByValue: true
    });
    console.log(`[${mode.toUpperCase()}] Mid-Hero frame:`, midHero.result.value);

    // Step 2: Scroll to Hero end
    console.log(`[${mode.toUpperCase()}] Step 2: Hero end (${heroEnd}px)...`);
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${heroEnd})` });
    await sleep(300);
    const endHero = await send('Runtime.evaluate', {
      expression: `document.querySelector('#hero-frame-counter')?.innerText || document.body.innerText.match(/\\d+ \\/ \\d+/)?.[0]`,
      returnByValue: true
    });
    console.log(`[${mode.toUpperCase()}] Hero end frame:`, endHero.result.value);

    // Step 3: Scroll smoothly across transition into Services
    console.log(`[${mode.toUpperCase()}] Step 3: Transition into Services (${servicesStart}px)...`);
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const target = heroEnd + ((servicesStart - heroEnd) / steps) * i;
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${target})` });
      await sleep(50);
    }
    await sleep(500);

    const atServices = await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.getElementById('services');
        const activeText = document.querySelector('#services .font-mono')?.innerText;
        return {
          scrollY: window.scrollY,
          servicesBoundingTop: s?.getBoundingClientRect().top,
          activeText,
          isLocked: window.__servicesDebug?.isLockedRef?.current
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${mode.toUpperCase()}] Arrived at Services:`, atServices.result.value);

    // Step 4: Advance through all services
    for (let s = 1; s <= 3; s++) {
      console.log(`[${mode.toUpperCase()}] Advancing to service ${s + 1}...`);
      await send('Runtime.evaluate', {
        expression: `window.__servicesDebug?.goToIndex(${s})`
      });
      await sleep(700);
      const curService = await send('Runtime.evaluate', {
        expression: `document.querySelector('#services .font-mono')?.innerText`,
        returnByValue: true
      });
      console.log(`[${mode.toUpperCase()}] Now at:`, curService.result.value);
    }

    // Step 5: Release downward into WorkSection
    console.log(`[${mode.toUpperCase()}] Step 5: Releasing into WorkSection...`);
    await send('Runtime.evaluate', {
      expression: `window.__servicesDebug?.lockSection ? window.__servicesDebug.goToIndex(3) : null;`
    });
    await sleep(300);
    // Trigger forward gesture at Service 04
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = document.querySelector('button[aria-label="Next service"]');
        if (nextBtn) nextBtn.click();
      })()`
    });
    await sleep(800);

    // Now scroll down past Services into Work
    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 1000)` });
    await sleep(500);

    const atWork = await send('Runtime.evaluate', {
      expression: `(() => {
        const work = document.getElementById('work') || document.querySelector('section[id*="work"]');
        return {
          scrollY: window.scrollY,
          workBoundingTop: work?.getBoundingClientRect().top,
          isPastServices: window.scrollY > ${servicesStart + 1800}
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${mode.toUpperCase()}] Past Services / At Work:`, atWork.result.value);

    // Step 6: Scroll all the way back up to top (Hero)
    console.log(`[${mode.toUpperCase()}] Step 6: Scrolling back up to Hero...`);
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
    await sleep(1000);

    const backAtHero = await send('Runtime.evaluate', {
      expression: `(() => {
        const heroST = window.ScrollTrigger?.getById('hero-scroll-trigger');
        return {
          scrollY: window.scrollY,
          heroProgress: heroST?.progress
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${mode.toUpperCase()}] Back at Hero top:`, backAtHero.result.value);

  } finally {
    chrome.kill();
  }
}

async function main() {
  console.log('####################################');
  console.log('### DESKTOP END-TO-END FLOW TEST ###');
  console.log('####################################');
  await runE2E('desktop');
  await sleep(1000);

  console.log('\n###################################');
  console.log('### MOBILE END-TO-END FLOW TEST ###');
  console.log('###################################');
  await runE2E('mobile');
}

main().catch(console.error);
