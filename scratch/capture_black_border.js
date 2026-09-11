const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9298',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise((res, rej) => http.get('http://127.0.0.1:9298/json', r => {
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
    await new Promise(r => setTimeout(r, 4000));
    await send('Runtime.evaluate', {
      expression: `(() => {
        if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.disable(false));
        const el = document.getElementById('testimonials');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\testimonials_mobile_black_border.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved testimonials_mobile_black_border.png');
  } catch (e) { console.error(e); }
  finally { chrome.kill(); }
}, 1500);
