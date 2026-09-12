const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--remote-debugging-port=9288', '--window-size=390,844', 'about:blank'
]);

setTimeout(async () => {
  try {
    const tabs = await new Promise(res => http.get('http://127.0.0.1:9288/json', r => {
      let d=''; r.on('data', c=>d+=c); r.on('end', ()=>res(JSON.parse(d)));
    }));
    const tab = tabs[0];
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
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
    await new Promise(r => setTimeout(r, 4500));
    
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        if (!c) return { error: 'no canvas' };
        let el = c;
        const results = [];
        while (el && results.length < 5) {
          const keys = Object.keys(el);
          const reactKeys = keys.filter(k => k.startsWith('__react'));
          results.push({ tag: el.tagName, className: el.className, keys, reactKeys });
          el = el.parentElement;
        }
        return results;
      })()`,
      returnByValue: true
    });
    console.log('Hierarchy keys:', JSON.stringify(res?.result?.value, null, 2));

    // Also check window.__ScrollTrigger or GSAP
    const gsapCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src);
        return {
          hasGsap: !!window.gsap,
          hasST: !!window.ScrollTrigger,
          scriptsCount: scripts.length
        };
      })()`,
      returnByValue: true
    });
    console.log('GSAP check:', gsapCheck?.result?.value);

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}, 2000);
