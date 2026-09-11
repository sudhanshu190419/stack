const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9261',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise((res, rej) => http.get('http://127.0.0.1:9261/json', r => {
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
    await new Promise(r => setTimeout(r, 3500));

    // Scroll to services
    await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.getElementById('services');
        window.scrollTo(0, s.offsetTop + 30);
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    const elementAtPoint = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.elementFromPoint(200, 100);
        return {
          tagName: el?.tagName,
          className: el?.className,
          id: el?.id,
          outerHTML: el?.outerHTML?.slice(0, 300),
          allImages: Array.from(document.querySelectorAll('img')).map(i => ({
            src: i.src,
            alt: i.alt,
            top: i.getBoundingClientRect().top,
            height: i.getBoundingClientRect().height,
            visible: i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().top < window.innerHeight
          }))
        };
      })()`,
      returnByValue: true
    });
    console.log('Element at point (200, 100):', JSON.stringify(elementAtPoint.result.value, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}, 1500);
