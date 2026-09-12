const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-extensions', '--remote-debugging-port=9300', '--window-size=390,844', 'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise(res => http.get('http://127.0.0.1:9300/json', r => {
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
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 4500));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        let fiber = c[Object.keys(c).find(k=>k.startsWith('__reactFiber$'))];
        while (fiber) {
          if (fiber.type && fiber.type.name === 'Hero') {
            let h = fiber.memoizedState;
            let idx = 0;
            while (h) {
              if (idx === 2 && h.memoizedState && h.memoizedState.current) {
                const handle = h.memoizedState.current;
                return {
                  hasHandle: true,
                  currentFrame: handle.getCurrentFrame(),
                  lastRendered: handle.getLastRenderedFrame(),
                  methods: Object.keys(handle)
                };
              }
              h = h.next;
              idx++;
            }
          }
          fiber = fiber.return;
        }
        return { hasHandle: false };
      })()`,
      returnByValue: true
    });
    console.log('Handle check:', JSON.stringify(res?.result?.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}, 2000);
