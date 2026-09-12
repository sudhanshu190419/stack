const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9322;
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
    await send('Runtime.enable');

    console.log('Navigating to live site https://www.stackstich.online/ ...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Prepare screencast frame collector
    const capturedFrames = [];
    const telemetry = [];

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.screencastFrame') {
        const { data, metadata, sessionId } = msg.params;
        capturedFrames.push({
          timestamp: metadata.timestamp,
          data
        });
        send('Page.screencastFrameAck', { sessionId });
      }
    });

    // Start screencast
    await send('Page.startScreencast', {
      format: 'png',
      quality: 80,
      maxWidth: 1440,
      maxHeight: 900,
      everyNthFrame: 1
    });

    console.log('Screencast started. Warming up on Hero...');
    await sleep(1000);

    // Fast scroll surge to boundary
    console.log('Triggering fast wheel surge to boundary...');
    for (let i = 0; i < 8; i++) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseWheel',
        x: 700,
        y: 450,
        deltaX: 0,
        deltaY: 1000
      });
      await sleep(25);
    }

    // Continue recording for 2 seconds across the transition
    for (let i = 0; i < 20; i++) {
      const t = await send('Runtime.evaluate', {
        expression: `(() => {
          const heroST = window.ScrollTrigger ? window.ScrollTrigger.getById('hero-scroll-trigger') : null;
          const servicesST = window.ScrollTrigger ? window.ScrollTrigger.getById('services-scroll-trigger-desktop') : null;
          const heroSection = document.querySelector('section');
          const canvas = document.querySelector('canvas');
          const centerEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
          return {
            scrollY: window.scrollY,
            heroProgress: heroST ? heroST.progress : null,
            heroPinned: heroSection ? heroSection.style.position : null,
            heroZIndex: heroSection ? heroSection.style.zIndex : null,
            centerTag: centerEl ? centerEl.tagName + (centerEl.id ? '#' + centerEl.id : '') : null,
            centerBg: centerEl ? window.getComputedStyle(centerEl).backgroundColor : null
          };
        })()`,
        returnByValue: true
      });
      telemetry.push({ index: i, time: Date.now(), ...t.result.value });
      await sleep(100);
    }

    await send('Page.stopScreencast');
    console.log(`Screencast stopped. Total frames captured: ${capturedFrames.length}`);

    // Save sample frames to disk for visual analysis
    const outDir = path.join(artifactDir, 'live_screencast');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // Save every 3rd or key frames
    capturedFrames.forEach((f, idx) => {
      if (idx % 2 === 0 || idx > capturedFrames.length - 10) {
        fs.writeFileSync(path.join(outDir, `frame_${idx.toString().padStart(3, '0')}.png`), Buffer.from(f.data, 'base64'));
      }
    });

    fs.writeFileSync(path.join(outDir, 'telemetry.json'), JSON.stringify(telemetry, null, 2));
    console.log(`Saved frames to ${outDir}`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
