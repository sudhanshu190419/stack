const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9298;
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

async function runDiagnosis() {
  console.log('Starting headless Chrome on port ' + debuggingPort + ' for deep diagnosis...');
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

    const consoleLogs = [];
    const networkRequests = new Map();
    let heroImageDownloads = 0;
    let heroCachedRequests = 0;

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description).join(' ');
        consoleLogs.push({ type: msg.params.type, text });
      }
      if (msg.method === 'Network.requestWillBeSent') {
        const req = msg.params.request;
        networkRequests.set(msg.params.requestId, {
          url: req.url,
          method: req.method,
          startTime: msg.params.timestamp,
        });
      }
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        const tracked = networkRequests.get(msg.params.requestId);
        if (tracked) {
          tracked.status = resp.status;
          tracked.fromDiskCache = resp.fromDiskCache;
          tracked.fromServiceWorker = resp.fromServiceWorker;
          tracked.fromPrefetchCache = resp.fromPrefetchCache;
          tracked.timing = resp.timing;
          tracked.headers = resp.headers;
          if (tracked.url.includes('/hero/')) {
            if (resp.fromDiskCache) heroCachedRequests++;
            else heroImageDownloads++;
          }
        }
      }
    });

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');

    // ─────────────────────────────────────────────────────────────────────────────
    // TEST 1: COLD CACHE VISIT (Initial visit to https://stackstich.online)
    // ─────────────────────────────────────────────────────────────────────────────
    console.log('\n--- TEST 1: COLD CACHE VISIT (https://stackstich.online) ---');
    await send('Network.clearBrowserCache');
    
    const tNavStart = Date.now();
    await send('Page.navigate', { url: 'https://stackstich.online' });
    await sleep(3500); // Allow initial load

    const finalUrl = await send('Runtime.evaluate', { expression: 'window.location.href', returnByValue: true });
    console.log('Navigated URL after redirect:', finalUrl.result.value);

    // Check third party / external scripts loaded
    const externalScripts = await send('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean)
      `,
      returnByValue: true
    });
    console.log('External / All script tags loaded:', externalScripts.result.value);

    // Check fonts loaded
    const fontsInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            fontStatus: document.fonts ? document.fonts.status : 'unknown',
            fontCount: document.fonts ? document.fonts.size : 0
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Fonts status:', fontsInfo.result.value);

    // Check ScrollTrigger configuration
    const stConfig = await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (typeof ScrollTrigger === 'undefined') return 'ScrollTrigger not global';
          const triggers = ScrollTrigger.getAll();
          return triggers.map(t => ({
            id: t.vars.id,
            start: t.start,
            end: t.end,
            scrub: t.vars.scrub,
            pin: !!t.pin,
            progress: t.progress
          }));
        })()
      `,
      returnByValue: true
    });
    console.log('ScrollTrigger instances on page:', stConfig.result.value);

    // Instrument RAF and performance on client
    await send('Runtime.evaluate', {
      expression: `
        window.__perfMetrics = {
          rafTimes: [],
          droppedFrames: 0,
          longTasks: [],
          renderedFrames: []
        };
        let lastRaf = performance.now();
        function loop(t) {
          const delta = t - lastRaf;
          lastRaf = t;
          window.__perfMetrics.rafTimes.push(delta);
          if (delta > 25) { // Frame took longer than 25ms (dropped frame at 60fps)
            window.__perfMetrics.droppedFrames++;
          }
          requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

        if (typeof PerformanceObserver !== 'undefined') {
          try {
            const obs = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                window.__perfMetrics.longTasks.push({ duration: entry.duration, startTime: entry.startTime });
              }
            });
            obs.observe({ entryTypes: ['longtask'] });
          } catch(e) {}
        }
      `
    });

    console.log('Performing cold-cache scroll through Hero...');
    // Scroll simulation: normal mouse wheel pace
    for (let s = 100; s <= 3500; s += 150) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(40); // 40ms per step (~25 scroll events/sec)
    }
    await sleep(1000);

    const coldPerf = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const m = window.__perfMetrics;
          const totalFrames = m.rafTimes.length;
          const avgFrameDuration = m.rafTimes.reduce((a,b)=>a+b,0) / (totalFrames || 1);
          const maxFrameDuration = Math.max(...m.rafTimes, 0);
          return {
            totalRafTicks: totalFrames,
            droppedFramesCount: m.droppedFrames,
            avgFrameDurationMs: avgFrameDuration.toFixed(2),
            maxFrameDurationMs: maxFrameDuration.toFixed(2),
            longTasksCount: m.longTasks.length,
            longTasksTotalMs: m.longTasks.reduce((a,t)=>a+t.duration, 0).toFixed(2),
            heroHudText: document.querySelector('span[class*=\"font-mono\"]') ? document.querySelector('span[class*=\"font-mono\"]').innerText : 'none'
          };
        })()
      `,
      returnByValue: true
    });
    console.log('COLD CACHE SCROLL METRICS:', coldPerf.result.value);
    console.log(`Hero downloads: ${heroImageDownloads}, Cached hits: ${heroCachedRequests}`);

    // ─────────────────────────────────────────────────────────────────────────────
    // TEST 2: WARM CACHE SCROLL (Reload and scroll again with assets in browser cache)
    // ─────────────────────────────────────────────────────────────────────────────
    console.log('\n--- TEST 2: WARM CACHE SCROLL (Reloading page, keeping disk cache) ---');
    heroImageDownloads = 0;
    heroCachedRequests = 0;

    await send('Page.reload');
    await sleep(2500);

    // Re-instrument RAF
    await send('Runtime.evaluate', {
      expression: `
        window.__perfMetrics = {
          rafTimes: [],
          droppedFrames: 0,
          longTasks: []
        };
        let lastRaf = performance.now();
        function loop(t) {
          const delta = t - lastRaf;
          lastRaf = t;
          window.__perfMetrics.rafTimes.push(delta);
          if (delta > 25) {
            window.__perfMetrics.droppedFrames++;
          }
          requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

        if (typeof PerformanceObserver !== 'undefined') {
          try {
            const obs = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                window.__perfMetrics.longTasks.push({ duration: entry.duration, startTime: entry.startTime });
              }
            });
            obs.observe({ entryTypes: ['longtask'] });
          } catch(e) {}
        }
      `
    });

    console.log('Performing warm-cache scroll through Hero...');
    for (let s = 100; s <= 3500; s += 150) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(40);
    }
    await sleep(1000);

    const warmPerf = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const m = window.__perfMetrics;
          const totalFrames = m.rafTimes.length;
          const avgFrameDuration = m.rafTimes.reduce((a,b)=>a+b,0) / (totalFrames || 1);
          const maxFrameDuration = Math.max(...m.rafTimes, 0);
          return {
            totalRafTicks: totalFrames,
            droppedFramesCount: m.droppedFrames,
            avgFrameDurationMs: avgFrameDuration.toFixed(2),
            maxFrameDurationMs: maxFrameDuration.toFixed(2),
            longTasksCount: m.longTasks.length,
            longTasksTotalMs: m.longTasks.reduce((a,t)=>a+t.duration, 0).toFixed(2),
            heroHudText: document.querySelector('span[class*=\"font-mono\"]') ? document.querySelector('span[class*=\"font-mono\"]').innerText : 'none'
          };
        })()
      `,
      returnByValue: true
    });
    console.log('WARM CACHE SCROLL METRICS:', warmPerf.result.value);
    console.log(`Warm scroll Hero downloads: ${heroImageDownloads}, Cached hits: ${heroCachedRequests}`);

    // ─────────────────────────────────────────────────────────────────────────────
    // TEST 3: REVERSE SCROLL TEST (Scrolling from frame 500 back to 0)
    // ─────────────────────────────────────────────────────────────────────────────
    console.log('\n--- TEST 3: REVERSE SCROLL TEST ---');
    for (let s = 3400; s >= 0; s -= 200) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
      await sleep(35);
    }
    await sleep(500);
    const revHud = await send('Runtime.evaluate', {
      expression: `document.querySelector('span[class*=\"font-mono\"]') ? document.querySelector('span[class*=\"font-mono\"]').innerText : 'none'`,
      returnByValue: true
    });
    console.log('Reverse scroll reached:', revHud.result.value);

    // Check all console errors
    console.log('\n--- CONSOLE LOGS & WARNINGS ---');
    console.log(consoleLogs);

    ws.close();
    console.log('\nDiagnosis complete.');
  } finally {
    chrome.kill();
  }
}

runDiagnosis().catch(console.error);
