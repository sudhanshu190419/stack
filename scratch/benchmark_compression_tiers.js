const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9268;
const testServerPort = 9888;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Create a local HTTP server serving the original and compressed simulation tiers
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const parsed = new URL(req.url, 'http://localhost:' + testServerPort);
  const pathname = parsed.pathname;

  let filePath = null;
  if (pathname.startsWith('/original/')) {
    filePath = path.join(__dirname, '..', 'public', 'hero', 'clip-04', pathname.replace('/original/', ''));
  } else if (pathname.startsWith('/tier-100kb/')) {
    filePath = path.join(__dirname, 'compression_simulation', '100kb', pathname.replace('/tier-100kb/', ''));
  } else if (pathname.startsWith('/tier-90kb/')) {
    filePath = path.join(__dirname, 'compression_simulation', '90kb', pathname.replace('/tier-90kb/', ''));
  } else if (pathname.startsWith('/tier-80kb/')) {
    filePath = path.join(__dirname, 'compression_simulation', '80kb', pathname.replace('/tier-80kb/', ''));
  }

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<!DOCTYPE html><html><body><h1>Benchmark</h1></body></html>');
    return;
  }

  if (filePath && fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'image/webp',
      'Content-Length': data.length
    });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

async function run() {
  console.log('=== BENCHMARKING COMPRESSION TIERS (ORIGINAL VS 100KB VS 90KB VS 80KB) ===');
  await new Promise(r => server.listen(testServerPort, r));
  console.log('Local test asset server running on port ' + testServerPort);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const getJson = p => new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:' + debuggingPort + p, (res) => {
        let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });

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

    async function evalCode(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (res?.exceptionDetails) {
        console.error('Eval error:', JSON.stringify(res.exceptionDetails));
      }
      return res?.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://127.0.0.1:' + testServerPort + '/' });
    await sleep(1000);

    // Representative sample frames tested in each tier
    const sampleFrameNames = [
      'frame-0001.webp', 'frame-0005.webp', 'frame-0010.webp', 'frame-0015.webp',
      'frame-0020.webp', 'frame-0025.webp', 'frame-0030.webp', 'frame-0035.webp',
      'frame-0040.webp', 'frame-0045.webp', 'frame-0050.webp', 'frame-0055.webp'
    ];

    const tiers = [
      { name: 'Original Clip 4', prefix: '/original/' },
      { name: '100 KB Target', prefix: '/tier-100kb/' },
      { name: '90 KB Target', prefix: '/tier-90kb/' },
      { name: '80 KB Target', prefix: '/tier-80kb/' }
    ];

    const tierResults = {};

    for (const tier of tiers) {
      console.log(`\nBenchmarking ${tier.name}...`);
      const tierMetrics = await evalCode(`(async () => {
        const frames = ${JSON.stringify(sampleFrameNames)};
        const prefix = '${tier.prefix}';
        const port = ${testServerPort};
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d', { alpha: false });

        const results = [];

        for (const fname of frames) {
          const url = 'http://127.0.0.1:' + port + prefix + fname;
          
          // Measure fetch
          const t0 = performance.now();
          const res = await fetch(url, { cache: 'no-store' });
          const blob = await res.blob();
          const fetchMs = performance.now() - t0;

          // Measure decode
          const t1 = performance.now();
          const bitmap = await createImageBitmap(blob);
          const decodeMs = performance.now() - t1;

          // Measure draw
          const t2 = performance.now();
          ctx.drawImage(bitmap, 0, 0);
          const drawMs = performance.now() - t2;

          bitmap.close();

          results.push({
            fname,
            sizeKb: blob.size / 1024,
            fetchMs,
            decodeMs,
            drawMs,
            totalMs: fetchMs + decodeMs + drawMs
          });
        }

        const avg = arr => arr.reduce((a,b)=>a+b,0)/arr.length;
        const p95 = arr => [...arr].sort((a,b)=>a-b)[Math.floor(arr.length * 0.95)];

        const sizes = results.map(r => r.sizeKb);
        const decodes = results.map(r => r.decodeMs);
        const draws = results.map(r => r.drawMs);
        const totals = results.map(r => r.totalMs);

        return {
          avgSizeKb: avg(sizes),
          maxSizeKb: Math.max(...sizes),
          avgDecodeMs: avg(decodes),
          p95DecodeMs: p95(decodes),
          avgDrawMs: avg(draws),
          avgTotalMs: avg(totals),
          frames: results
        };
      })()`);

      tierResults[tier.name] = tierMetrics;
      console.log(`  Avg Size: ${tierMetrics.avgSizeKb.toFixed(1)} KB (Max: ${tierMetrics.maxSizeKb.toFixed(1)} KB)`);
      console.log(`  Avg Decode: ${tierMetrics.avgDecodeMs.toFixed(2)} ms (P95: ${tierMetrics.p95DecodeMs.toFixed(2)} ms)`);
      console.log(`  Avg Canvas Draw: ${tierMetrics.avgDrawMs.toFixed(3)} ms`);
      console.log(`  Avg In-Browser Latency (Fetch+Decode+Draw): ${tierMetrics.avgTotalMs.toFixed(2)} ms`);
    }

    fs.writeFileSync(path.join(__dirname, 'compression_tier_benchmarks.json'), JSON.stringify(tierResults, null, 2));
    console.log('\nSaved compression tier benchmark results to scratch/compression_tier_benchmarks.json');

    ws.close();
  } finally {
    chrome.kill();
    server.close();
  }
}

run().catch(console.error);
