const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-extensions',
  '--remote-debugging-port=9294',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise(res => http.get('http://127.0.0.1:9294/json', r => {
      let d=''; r.on('data', c=>d+=c); r.on('end', ()=>res(JSON.parse(d)));
    }));
    const tab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    const send = (method, params={}) => new Promise(resolve => {
      const reqId = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === reqId) { ws.removeEventListener('message', handler); resolve(msg.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
      hasTouch: true
    });

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 5000));

    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        if (!c) return { error: 'no canvas' };
        const key = Object.keys(c).find(k => k.startsWith('__reactFiber$'));
        let fiber = c[key];
        const hooks = [];
        while (fiber) {
          if (fiber.memoizedState) {
            let h = fiber.memoizedState;
            let idx = 0;
            while (h) {
              if (h.memoizedState && typeof h.memoizedState === 'object') {
                const cur = h.memoizedState.current;
                let desc = typeof cur;
                if (cur instanceof Uint8Array) desc = 'Uint8Array(' + cur.length + ')';
                else if (Array.isArray(cur)) desc = 'Array(' + cur.length + ') nonNull=' + cur.filter(x=>x!=null).length;
                else if (typeof cur === 'number') desc = 'number: ' + cur;
                hooks.push({ fiberType: fiber.type?.name || 'anonymous', idx, desc });
              }
              h = h.next;
              idx++;
            }
          }
          fiber = fiber.return;
        }
        return hooks;
      })()`,
      returnByValue: true
    });
    console.log('Hooks found:', JSON.stringify(check?.result?.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}, 2000);
