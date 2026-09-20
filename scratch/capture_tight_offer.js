const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9271',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1500,1050',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise(res => {
      http.get('http://127.0.0.1:9271/json', r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
      });
    });
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const reqId = id++;
        const handler = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === reqId) { ws.removeEventListener('message', handler); resolve(msg.result); }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }
    await send('Page.enable');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    
    // Poll for #offer to exist
    let found = false;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500));
      const chk = await send('Runtime.evaluate', {
        expression: `!!document.getElementById('offer')`,
        returnByValue: true
      });
      if (chk && chk.result && chk.result.value) {
        found = true;
        break;
      }
    }
    await new Promise(r => setTimeout(r, 1500));
    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('offer');
        const rect = el.getBoundingClientRect();
        return {
          x: Math.round(rect.x),
          y: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      })()`,
      returnByValue: true
    });
    console.log('r is:', JSON.stringify(r));
    const val = r && r.result && r.result.value ? r.result.value : null;
    if (!val) {
      console.log('No val found, exiting');
      ws.close();
      chrome.kill();
      return;
    }
    const scr = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: val.x, y: val.y, width: val.width, height: val.height, scale: 1 },
      captureBeyondViewport: true
    });
    fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\989c6567-5bb7-4f01-b67d-4cee3fced5c4\\offer_section_desktop.png', Buffer.from(scr.data, 'base64'));
    console.log('Updated screenshot saved successfully!');
    ws.close();
    chrome.kill();
  } catch(e) {
    console.error(e);
    chrome.kill();
  }
}, 2500);
