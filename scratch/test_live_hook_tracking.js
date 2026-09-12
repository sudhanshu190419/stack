const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-extensions',
  '--remote-debugging-port=9298',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise(res => http.get('http://127.0.0.1:9298/json', r => {
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

    await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        const key = Object.keys(c).find(k => k.startsWith('__reactFiber$'));
        let fiber = c[key];
        while (fiber) {
          if (fiber.memoizedState) {
            let h = fiber.memoizedState;
            let idx = 0;
            while (h) {
              if (idx === 10) window.__mobileCacheRef = h.memoizedState;
              if (idx === 11) window.__mobileStatusRef = h.memoizedState;
              if (idx === 12) window.__mobileTargetRef = h.memoizedState;
              if (idx === 13) window.__mobileRenderedRef = h.memoizedState;
              if (idx === 21) window.__mobileWorkersRef = h.memoizedState;
              h = h.next;
              idx++;
            }
          }
          fiber = fiber.return;
        }
      })()`
    });

    console.log('Attached live refs. Now performing test scroll 0 -> 2500px...');
    const samples = [];
    for (let y = 0; y <= 2500; y += 70) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
      await new Promise(r => setTimeout(r, 30));
      const s = await send('Runtime.evaluate', {
        expression: `({
          scrollY: window.scrollY,
          target: window.__mobileTargetRef ? window.__mobileTargetRef.current : -1,
          rendered: window.__mobileRenderedRef ? window.__mobileRenderedRef.current : -1,
          workers: window.__mobileWorkersRef ? window.__mobileWorkersRef.current : -1
        })`,
        returnByValue: true
      });
      samples.push(s?.result?.value);
    }

    const uniqueRendered = new Set(samples.map(s => s.rendered).filter(r => r >= 0));
    console.log('Scroll finished! Total samples:', samples.length, 'Unique rendered frames:', uniqueRendered.size);
    console.log('First 5 samples:', samples.slice(0, 5));
    console.log('Middle 5 samples:', samples.slice(15, 20));
    console.log('Last 5 samples:', samples.slice(-5));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}, 2000);
