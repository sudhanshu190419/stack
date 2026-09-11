const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9251;
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

    console.log('Navigating to http://localhost:3000/web-development...');
    await send('Page.navigate', { url: 'http://localhost:3000/web-development' });
    await sleep(3500);

    // MOBILE VIEW (390 x 844)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(1000);

    // Get page scroll height
    const docInfo = await send('Runtime.evaluate', {
      expression: '({ height: document.body.scrollHeight, sections: Array.from(document.querySelectorAll("section")).map(s => ({ text: s.innerText.slice(0, 40).replace(/\\n/g, " "), top: s.offsetTop })) })',
      returnByValue: true
    });
    console.log('Document sections:', JSON.stringify(docInfo.result.value.sections, null, 2));

    const sections = docInfo.result.value.sections;

    for (let i = 2; i < sections.length; i++) {
      const sec = sections[i];
      console.log(`Capturing section ${i}: ${sec.text} at top=${sec.top}`);
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${Math.max(0, sec.top - 70)}, behavior: 'instant' })`
      });
      await sleep(500);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `webdev_mobile_sec${i}.png`), Buffer.from(shot.data, 'base64'));
    }

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

main();
