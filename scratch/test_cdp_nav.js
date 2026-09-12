const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-extensions',
  '--remote-debugging-port=9292',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise(res => http.get('http://127.0.0.1:9292/json', r => {
      let d=''; r.on('data', c=>d+=c); r.on('end', ()=>res(JSON.parse(d)));
    }));
    const tab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs.find(t => t.type === 'page') || tabs[0];
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

    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Page.loadEventFired') console.log('Page.loadEventFired received!');
      if (msg.method === 'Runtime.consoleAPICalled') console.log('Console:', msg.params.args.map(a=>a.value).join(' '));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');

    console.log('Sending navigate to http://localhost:3000/ ...');
    const navRes = await send('Page.navigate', { url: 'http://localhost:3000/' });
    console.log('Nav result:', navRes);

    await new Promise(r => setTimeout(r, 6000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        if (!c) return { hasCanvas: false };
        const keys = Object.keys(c);
        let fiber = c[keys.find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'))];
        let foundStatus = false;
        let foundCache = false;
        while (fiber) {
          if (fiber.memoizedState) {
            let hook = fiber.memoizedState;
            while (hook) {
              if (hook.memoizedState && typeof hook.memoizedState === 'object' && 'current' in hook.memoizedState) {
                const val = hook.memoizedState.current;
                if (val instanceof Uint8Array && val.length === 200) foundStatus = true;
                if (Array.isArray(val) && val.length === 200) foundCache = true;
              }
              hook = hook.next;
            }
          }
          fiber = fiber.return;
        }
        return {
          title: document.title,
          canvas: true,
          canvasKeys: keys,
          foundStatus,
          foundCache
        };
      })()`,
      returnByValue: true
    });
    console.log('Result:', JSON.stringify(res?.result?.value, null, 2));

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}, 2000);
