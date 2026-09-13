const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9277;
const artifactDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\.tempmediaStorage';

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(p) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + debuggingPort + p, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await sleep(2500);
    const tabs = await getJson('/json');
    const tab = tabs.find(t => t.type === 'page') || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === reqId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return res?.result?.value;
    }

    async function captureScreenshot(filepath) {
      const scr = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filepath, Buffer.from(scr.data, 'base64'));
      console.log('Saved screenshot:', filepath);
    }

    // ─── 1. DESKTOP VIEWPORT (1440x900) ───
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });

    console.log('\n--- 1. Navigating to Desktop Homepage ---');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    const desktopBtnMetrics = await evaluate(`(() => {
      const btn = document.querySelector('a[aria-label="Chat with StackStich on WhatsApp"]');
      if (!btn) return { found: false };
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      const container = btn.closest('.fixed');
      const containerStyle = container ? window.getComputedStyle(container) : null;
      return {
        found: true,
        href: btn.href,
        target: btn.target,
        rel: btn.rel,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        bottomOffset: Math.round(window.innerHeight - rect.bottom),
        rightOffset: Math.round(window.innerWidth - rect.right),
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        zIndex: containerStyle ? containerStyle.zIndex : null,
      };
    })()`);

    console.log('Desktop Button Metrics:', desktopBtnMetrics);
    await captureScreenshot(path.join(artifactDir, 'wa_floating_desktop_home.png'));

    // Move mouse over button to trigger tooltip
    console.log('\n--- Hovering over button to test Tooltip ---');
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 1440 - 24 - 27,
      y: 900 - 24 - 27,
    });
    await sleep(600);

    const tooltipMetrics = await evaluate(`(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      if (!tooltip) return { found: false };
      const rect = tooltip.getBoundingClientRect();
      const style = window.getComputedStyle(tooltip);
      return {
        found: true,
        text: tooltip.innerText.trim(),
        opacity: style.opacity,
        display: style.display,
        visibility: style.visibility,
        right: rect.right,
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom
      };
    })()`);

    console.log('Tooltip Metrics on Hover:', tooltipMetrics);
    await captureScreenshot(path.join(artifactDir, 'wa_floating_desktop_tooltip.png'));

    // ─── 2. MOBILE VIEWPORT (393x852) ───
    console.log('\n--- 2. Navigating to Mobile Homepage ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 393,
      height: 852,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true,
    });

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    const mobileBtnMetrics = await evaluate(`(() => {
      const btn = document.querySelector('a[aria-label="Chat with StackStich on WhatsApp"]');
      if (!btn) return { found: false };
      const rect = btn.getBoundingClientRect();
      return {
        found: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        bottomOffset: Math.round(window.innerHeight - rect.bottom),
        rightOffset: Math.round(window.innerWidth - rect.right),
      };
    })()`);

    console.log('Mobile Button Metrics:', mobileBtnMetrics);
    await captureScreenshot(path.join(artifactDir, 'wa_floating_mobile_home.png'));

    // ─── 3. CONTACT PAGE CHECK (Desktop & Mobile) ───
    console.log('\n--- 3. Navigating to Contact Page (Desktop) ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://localhost:3000/contact' });
    await sleep(2500);

    const contactPageCheck = await evaluate(`(() => {
      const floatingBtn = document.querySelector('a[aria-label="Chat with StackStich on WhatsApp"]');
      const contactCards = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
      return {
        floatingBtnPresent: !!floatingBtn,
        totalWhatsAppLinks: contactCards.length,
        links: contactCards.map(c => ({
          href: c.href,
          text: c.innerText.replace(/\\s+/g, ' ').trim(),
          isFloating: c === floatingBtn
        }))
      };
    })()`);

    console.log('Contact Page Links Check:', contactPageCheck);
    await captureScreenshot(path.join(artifactDir, 'wa_floating_contact_desktop.png'));

    // ─── 4. SERVICE PAGE CHECK (/app-development) ───
    console.log('\n--- 4. Navigating to Service Page (/app-development) ---');
    await send('Page.navigate', { url: 'http://localhost:3000/app-development' });
    await sleep(2500);

    const serviceBtnCheck = await evaluate(`(() => {
      const btn = document.querySelector('a[aria-label="Chat with StackStich on WhatsApp"]');
      return {
        found: !!btn,
        href: btn ? btn.href : null
      };
    })()`);

    console.log('Service Page Button Check:', serviceBtnCheck);
    await captureScreenshot(path.join(artifactDir, 'wa_floating_service_desktop.png'));

    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
    console.log('\nVerification complete!');
  }
}

main();
