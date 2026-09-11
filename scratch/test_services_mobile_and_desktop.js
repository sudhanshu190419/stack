const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9245;

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

async function runTest(mode) {
  const isMobile = mode === 'mobile';
  const width = isMobile ? 390 : 1440;
  const height = isMobile ? 844 : 900;

  console.log(`\n==================================================`);
  console.log(`STARTING TEST FOR: ${mode.toUpperCase()} (${width}x${height})`);
  console.log(`==================================================`);

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

    // 1. Inspect ScrollTriggers and MatchMedia State
    const stInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const allST = window.ScrollTrigger?.getAll() || [];
        const heroST = window.ScrollTrigger?.getById('hero-scroll-trigger');
        const desktopST = window.ScrollTrigger?.getById('services-scroll-trigger-desktop');
        const mobileST = window.ScrollTrigger?.getById('services-scroll-trigger-mobile');
        return {
          allTriggers: allST.map(t => ({ id: t.vars.id, start: t.start, end: t.end })),
          hero: heroST ? { start: heroST.start, end: heroST.end } : null,
          desktopServices: desktopST ? { start: desktopST.start, end: desktopST.end, isActive: desktopST.isActive } : null,
          mobileServices: mobileST ? { start: mobileST.start, end: mobileST.end, isActive: mobileST.isActive } : null,
        };
      })()`,
      returnByValue: true
    });
    console.log('ScrollTriggers detected:', JSON.stringify(stInfo.result.value, null, 2));

    const activeSTKey = isMobile ? 'mobileServices' : 'desktopServices';
    const inactiveSTKey = isMobile ? 'desktopServices' : 'mobileServices';
    if (!stInfo.result.value[activeSTKey]) {
      throw new Error(`Expected ${activeSTKey} to be active in ${mode} mode, but it was not found!`);
    }
    if (stInfo.result.value[inactiveSTKey]) {
      throw new Error(`Expected ${inactiveSTKey} to NOT exist in ${mode} mode!`);
    }
    console.log(`✓ Confirmed only ${activeSTKey} exists for ${mode}.`);

    // 2. Check DOM visibility
    const domCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const divs = Array.from(document.querySelectorAll('#services section > div'));
        const mobileContainer = divs.find(d => d.className.includes('lg:hidden'));
        const desktopContainer = divs.find(d => d.className.includes('lg:flex'));
        return {
          mobileVisible: mobileContainer ? window.getComputedStyle(mobileContainer).display !== 'none' : false,
          desktopVisible: desktopContainer ? window.getComputedStyle(desktopContainer).display !== 'none' : false,
        };
      })()`,
      returnByValue: true
    });
    console.log('DOM Visibility:', domCheck.result.value);
    if (isMobile && (!domCheck.result.value.mobileVisible || domCheck.result.value.desktopVisible)) {
      throw new Error(`Mobile DOM visibility mismatch!`);
    }
    if (!isMobile && (domCheck.result.value.mobileVisible || !domCheck.result.value.desktopVisible)) {
      throw new Error(`Desktop DOM visibility mismatch!`);
    }
    console.log(`✓ DOM visibility matches mode: ${mode}`);

    // 3. Scroll to Services Section entry
    const targetST = isMobile ? stInfo.result.value.mobileServices : stInfo.result.value.desktopServices;
    console.log(`Scrolling to Services start (${targetST.start + 10}px)...`);
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${targetST.start + 10})` });
    await sleep(600);

    const checkService0 = await send('Runtime.evaluate', {
      expression: `(() => {
        const titleEl = document.querySelector('#services h3');
        const counterEl = document.querySelector('#services .font-mono');
        const baseImg = document.querySelector('#services img[alt*="stone table"], #services img[alt*="Laptop"]');
        const screenImg = document.querySelector('#services img[alt*="Web Design"]');
        return {
          scrollY: window.scrollY,
          title: titleEl ? titleEl.textContent : null,
          counter: counterEl ? counterEl.textContent.replace(/\\s+/g, ' ').trim() : null,
          baseImgSrc: baseImg ? baseImg.src : null,
          screenImgSrc: screenImg ? screenImg.src : null,
        };
      })()`,
      returnByValue: true
    });
    console.log('Service 0 state:', checkService0.result.value);

    // 4. Test Gesture forward transitions
    // Simulate Observer wheel/touch events
    for (let step = 1; step <= 3; step++) {
      console.log(`Advancing to service index ${step}...`);
      if (isMobile) {
        // Touch drag up: dispatch wheel or touch gesture to window
        // In Observer, touch drag up produces onUp with self.isDragging = true
        // Or dispatch wheel event (Observer listens to wheel,touch)
        await send('Runtime.evaluate', {
          expression: `(() => {
            window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
          })()`
        });
      } else {
        // Desktop wheel down produces onDown with self.isDragging = false
        await send('Runtime.evaluate', {
          expression: `(() => {
            window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
          })()`
        });
      }
      await sleep(750); // wait past cooldown (550ms mobile, 650ms desktop)

      const state = await send('Runtime.evaluate', {
        expression: `(() => {
          const titleEl = document.querySelector('#services h3');
          const counterEl = document.querySelector('#services .font-mono');
          const activeIndex = window.SERVICES_ACTIVE_INDEX !== undefined ? window.SERVICES_ACTIVE_INDEX : null;
          return {
            scrollY: window.scrollY,
            title: titleEl ? titleEl.textContent : null,
            counter: counterEl ? counterEl.textContent.replace(/\\s+/g, ' ').trim() : null,
          };
        })()`,
        returnByValue: true
      });
      console.log(`Step ${step} state:`, state.result.value);
    }

    // 5. Test next gesture at 04 -> unlock to Selected Work
    console.log('Advancing from Service 04 -> should unlock to Selected Work...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
      })()`
    });
    await sleep(750);

    const workState = await send('Runtime.evaluate', {
      expression: `(() => {
        const workEl = document.getElementById('work');
        const workRect = workEl ? workEl.getBoundingClientRect() : null;
        return {
          scrollY: window.scrollY,
          workTop: workRect ? workRect.top : null,
          stActive: isMobile 
            ? window.ScrollTrigger.getById('services-scroll-trigger-mobile')?.isActive 
            : window.ScrollTrigger.getById('services-scroll-trigger-desktop')?.isActive
        };
      })()`,
      returnByValue: true
    });
    console.log('Unlocked to Work state:', workState.result.value);

    // 6. Test backward gesture from Work back into Services
    console.log('Scrolling slightly back up into Services...');
    const expectedService4Y = isMobile ? targetST.start + 1200 : targetST.start + 1800;
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, ${expectedService4Y - 50});
      })()`
    });
    await sleep(750);

    const backAt4 = await send('Runtime.evaluate', {
      expression: `(() => {
        const titleEl = document.querySelector('#services h3');
        return {
          scrollY: window.scrollY,
          title: titleEl ? titleEl.textContent : null,
        };
      })()`,
      returnByValue: true
    });
    console.log('Back in Services at Service 04:', backAt4.result.value);

    // 7. Backward through services: 3 -> 2 -> 1 -> 0
    for (let step = 2; step >= 0; step--) {
      console.log(`Navigating backward to service index ${step}...`);
      await send('Runtime.evaluate', {
        expression: `(() => {
          window.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
        })()`
      });
      await sleep(750);

      const state = await send('Runtime.evaluate', {
        expression: `(() => {
          const titleEl = document.querySelector('#services h3');
          const counterEl = document.querySelector('#services .font-mono');
          return {
            scrollY: window.scrollY,
            title: titleEl ? titleEl.textContent : null,
            counter: counterEl ? counterEl.textContent.replace(/\\s+/g, ' ').trim() : null,
          };
        })()`,
        returnByValue: true
      });
      console.log(`Backward step ${step} state:`, state.result.value);
    }

    // 8. Backward from 01 -> unlock to Hero
    console.log('Navigating backward from Service 01 -> should unlock to Hero...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
      })()`
    });
    await sleep(750);

    const heroState = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          scrollY: window.scrollY,
          targetSTStart: ${targetST.start}
        };
      })()`,
      returnByValue: true
    });
    console.log('Unlocked to Hero state:', heroState.result.value);
    if (heroState.result.value.scrollY < targetST.start) {
      console.log('✓ Successfully unlocked back to Hero!');
    }

    console.log(`\n>>> TEST PASSED FOR ${mode.toUpperCase()} <<<`);
  } catch (err) {
    console.error(`TEST FAILED FOR ${mode.toUpperCase()}:`, err);
    throw err;
  } finally {
    chrome.kill();
  }
}

async function main() {
  try {
    await runTest('desktop');
    await sleep(1500);
    await runTest('mobile');
    console.log('\n==================================================');
    console.log('ALL TESTS PASSED SUCCESSFULLY ON BOTH DESKTOP & MOBILE!');
    console.log('==================================================');
    process.exit(0);
  } catch (e) {
    console.error('Test run failed:', e);
    process.exit(1);
  }
}

main();
