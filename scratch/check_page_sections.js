const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9274',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise((res, rej) => http.get('http://127.0.0.1:9274/json', r => {
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

    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', m.params.type, m.params.args.map(a => a.value || a.description));
      }
      if (m.method === 'Runtime.exceptionThrown') {
        console.log('[BROWSER EXCEPTION]', m.params.exceptionDetails.text, m.params.exceptionDetails.exception?.description);
      }
    });

    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 4500));

    const result = await send('Runtime.evaluate', {
      expression: `(() => {
        const main = document.querySelector('main');
        const children = main ? Array.from(main.children).map(c => ({
          tag: c.tagName,
          id: c.id,
          class: c.className.slice(0, 50),
          offsetTop: c.offsetTop,
          offsetHeight: c.offsetHeight
        })) : 'No main found';

        const processEl = document.getElementById('process');
        return {
          children,
          hasProcess: !!processEl,
          bodyHtmlLength: document.body.innerHTML.length
        };
      })()`,
      returnByValue: true
    });

    console.log('Result:', JSON.stringify(result.result.value, null, 2));
  } catch (e) { console.error(e); }
  finally { chrome.kill(); }
}, 1500);
