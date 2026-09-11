const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function testHero() {
  console.log('Launching headless Chrome...');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9280',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  http.get('http://127.0.0.1:9280/json', async (res) => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const tabs = JSON.parse(d);
      const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
      await new Promise(r => ws.onopen = r);

      let id = 1;
      function send(method, params = {}) {
        return new Promise(resolve => {
          const reqId = id++;
          const handler = (e) => {
            const m = JSON.parse(e.data);
            if (m.id === reqId) {
              ws.removeEventListener('message', handler);
              resolve(m.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: reqId, method, params }));
        });
      }

      const consoleLogs = [];
      ws.addEventListener('message', (e) => {
        const m = JSON.parse(e.data);
        if (m.method === 'Runtime.consoleAPICalled') {
          consoleLogs.push(m.params.args.map(a => a.value || a.description).join(' '));
        }
        if (m.method === 'Log.entryAdded') {
          consoleLogs.push(m.params.entry.text);
        }
      });

      await send('Console.enable');
      await send('Runtime.enable');
      await send('Page.enable');
      await send('Network.enable');

      let requestCount = 0;
      let heroImageRequests = 0;
      ws.addEventListener('message', (e) => {
        const m = JSON.parse(e.data);
        if (m.method === 'Network.requestWillBeSent') {
          requestCount++;
          if (m.params.request.url.includes('/hero/')) {
            heroImageRequests++;
          }
        }
      });

      console.log('Navigating to production home page http://127.0.0.1:3005 ...');
      await send('Page.navigate', { url: 'http://127.0.0.1:3005' });

      // Wait 1.5s for initial load
      await new Promise(r => setTimeout(r, 1500));

      console.log(`Initial hero requests on mount: ${heroImageRequests}`);

      // Capture initial screenshot
      let ss1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\hero_prod_mount.png', Buffer.from(ss1.data, 'base64'));

      // Check canvas readiness and dimensions
      const canvasEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const c = document.querySelector('canvas');
            return c ? { width: c.width, height: c.height, styleW: c.style.width, styleH: c.style.height } : null;
          })()
        `,
        returnByValue: true
      });
      console.log('Canvas dimensions on mount:', canvasEval.result.value);

      // Now scroll through the hero
      console.log('Scrolling forward through hero (simulating trackpad/wheel)...');
      for (let s = 100; s <= 3000; s += 200) {
        await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
        await new Promise(r => setTimeout(r, 50));
      }

      await new Promise(r => setTimeout(r, 300));
      let ss2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\hero_prod_scrolled.png', Buffer.from(ss2.data, 'base64'));

      // Scroll backward
      console.log('Scrolling backward through hero...');
      for (let s = 2800; s >= 200; s -= 300) {
        await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s});` });
        await new Promise(r => setTimeout(r, 50));
      }

      await new Promise(r => setTimeout(r, 300));
      let ss3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\hero_prod_backward.png', Buffer.from(ss3.data, 'base64'));

      console.log(`Total hero image requests after bidirectional scrub: ${heroImageRequests}`);
      console.log('Any console errors/logs:', consoleLogs);

      ws.close();
      chrome.kill();
      console.log('Hero test complete.');
    });
  });
}

testHero().catch(console.error);
