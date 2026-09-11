const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9272',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise((res, rej) => http.get('http://127.0.0.1:9272/json', r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej));
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    function send(method, params = {}) {
      return new Promise(r => {
        const reqId = id++;
        const h = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === reqId) { ws.removeEventListener('message', h); r(m.result); }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 4500));
    
    // Find absolute top of #process relative to document body
    const pos = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('process');
        const rect = el ? el.getBoundingClientRect() : null;
        return {
          top: rect ? rect.top + window.scrollY : null,
          height: rect ? rect.height : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Process position:', pos.result.value);

    if (pos.result.value.top) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${pos.result.value.top})`
      });
      await new Promise(r => setTimeout(r, 800));

      const shot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\process_mobile_real_top.png', Buffer.from(shot1.data, 'base64'));

      await send('Runtime.evaluate', { expression: `window.scrollBy(0, 500)` });
      await new Promise(r => setTimeout(r, 500));
      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\process_mobile_real_step1.png', Buffer.from(shot2.data, 'base64'));

      await send('Runtime.evaluate', { expression: `window.scrollBy(0, 550)` });
      await new Promise(r => setTimeout(r, 500));
      const shot3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\process_mobile_real_step2.png', Buffer.from(shot3.data, 'base64'));

      console.log('Done capturing real process section');
    }
  } catch (e) { console.error(e); }
  finally { chrome.kill(); }
}, 1500);
