const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9333;
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
  console.log('Spawning Chrome to test live bug on https://www.stackstich.online/ ...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,804',
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

    await send('Page.enable');
    await send('Runtime.enable');

    async function evaluate(fnStr) {
      const res = await send('Runtime.evaluate', {
        expression: `(${fnStr})()`,
        returnByValue: true,
        awaitPromise: true
      });
      return res.result?.value;
    }

    async function dispatchWheel(deltaY, count = 1, interval = 20) {
      for (let i = 0; i < count; i++) {
        await send('Input.dispatchMouseEvent', {
          type: 'mouseWheel',
          x: 640,
          y: 400,
          deltaX: 0,
          deltaY: deltaY
        });
        if (interval > 0) await sleep(interval);
      }
    }

    // Capture screenshot
    async function captureScreenshot(filename) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = path.join(artifactDir, filename);
      fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
      return outPath;
    }

    const testRoutes = ['/web-development', '/work', '/contact', '/ecommerce-development'];
    const trialResults = [];

    for (let i = 0; i < 10; i++) {
      const route = testRoutes[i % testRoutes.length];
      console.log(`\n==============================================`);
      console.log(`TRIAL ${i + 1}: Testing route navigation to ${route}`);
      console.log(`==============================================`);

      // 1. Navigate to homepage
      console.log('Navigating to homepage: https://www.stackstich.online/ ...');
      await send('Page.navigate', { url: 'https://www.stackstich.online/' });
      await sleep(3500);

      // 2. Scroll through entire Hero until What We Do is reached
      console.log('Scrolling through Hero to reach What We Do (scrollY ~4200) ...');
      await dispatchWheel(300, 15, 20); // scroll through hero
      await sleep(500);

      const posBeforeNav = await evaluate(`() => ({
        scrollY: window.scrollY,
        stProgress: window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger')?.progress : null
      })`);
      console.log(`Position reached before nav: scrollY=${posBeforeNav.scrollY}, heroProgress=${posBeforeNav.stProgress}`);

      // 3. Navigate to destination route
      console.log(`Navigating to ${route} ...`);
      await evaluate(`(targetRoute) => {
        window.location.href = targetRoute;
      }`, route);
      // Wait for navigation
      await sleep(3000);
      const destUrl = await evaluate(`() => window.location.pathname`);
      console.log(`Currently on destination: ${destUrl}`);

      // 4. Press browser BACK
      console.log('Simulating browser BACK button (history.back()) ...');
      await evaluate(`() => window.history.back()`);
      await sleep(2500);

      // 5. Inspect homepage state immediately after Back
      const stateAfterBack = await evaluate(`() => {
        const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
        const hudFrameEl = document.querySelector('span.font-mono');
        const canvas = document.querySelector('canvas');
        return {
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          stProgress: heroST ? heroST.progress : null,
          stStart: heroST ? heroST.start : null,
          stEnd: heroST ? heroST.end : null,
          stIsActive: heroST ? heroST.isActive : null,
          hudFrameText: hudFrameEl ? hudFrameEl.innerText : null,
          canvasWidth: canvas ? canvas.width : null,
          canvasHeight: canvas ? canvas.height : null
        };
      }`);
      console.log('State immediately after Back:', JSON.stringify(stateAfterBack, null, 2));

      // 6. Scroll BACK UP toward the Hero
      console.log('Scrolling BACK UP toward Hero (wheel deltaY = -150) ...');
      const upwardSteps = [];
      for (let s = 0; s < 10; s++) {
        await dispatchWheel(-150, 2, 25);
        await sleep(60);
        const stepState = await evaluate(`() => {
          const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
          const hudFrameEl = document.querySelector('span.font-mono');
          return {
            scrollY: window.scrollY,
            stProgress: heroST ? heroST.progress : null,
            hudFrameText: hudFrameEl ? hudFrameEl.innerText : null
          };
        }`);
        upwardSteps.push(stepState);
      }

      console.log('Upward scrolling step states:');
      upwardSteps.forEach((st, idx) => {
        console.log(`  Step ${idx + 1}: scrollY=${st.scrollY}, progress=${st.stProgress?.toFixed(3)}, hudFrame=${st.hudFrameText}`);
      });

      if (i === 0) {
        await captureScreenshot('proof_after_back_scrolled_up.png');
      }

      // Check whether canvas animation became stuck
      const firstHud = upwardSteps[0].hudFrameText;
      const lastHud = upwardSteps[upwardSteps.length - 1].hudFrameText;
      const progressDelta = (upwardSteps[0].stProgress || 0) - (upwardSteps[upwardSteps.length - 1].stProgress || 0);
      
      const isStuck = (progressDelta > 0.1 && firstHud === lastHud);
      console.log(`Trial ${i + 1} Result: Progress Changed = ${progressDelta.toFixed(3)}, HUD Frame Changed = ${firstHud !== lastHud}, Is Stuck = ${isStuck}`);

      trialResults.push({
        trial: i + 1,
        route,
        scrollYBeforeNav: posBeforeNav.scrollY,
        scrollYAfterBack: stateAfterBack.scrollY,
        stProgressAfterBack: stateAfterBack.stProgress,
        upwardProgressChange: progressDelta,
        firstHud,
        lastHud,
        isStuck
      });
    }

    fs.writeFileSync(
      path.join(artifactDir, 'live_back_navigation_trials.json'),
      JSON.stringify(trialResults, null, 2)
    );
    console.log('\n=============================================');
    console.log('ALL 10 TRIALS COMPLETED!');
    console.log('=============================================');

  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
