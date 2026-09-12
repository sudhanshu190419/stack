const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9264;

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

async function run() {
  console.log('=== BENCHMARKING EXACT NETWORK, DECODE, AND DRAW BREAKDOWN ON LIVE SITE ===');
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

    async function evalCode(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res?.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Navigating to live production site...');
    await send('Page.navigate', { url: 'https://www.stackstich.online/' });
    await sleep(4000);

    // Run in-browser micro-benchmark for all 240 frames
    // Measuring:
    // 1. fetch (HTTP request -> response headers -> response blob)
    // 2. createImageBitmap (WebP blob decode to GPU-ready bitmap)
    // 3. drawImage (Canvas 2D blit)
    // 4. Memory footprint / bitmap dimensions
    console.log('Running in-browser micro-benchmarks for all clips...');
    const benchmarkResults = await evalCode(`(async () => {
      const results = {
        allFrames: [],
        clips: {
          'Clip 1 (0-59)': { fetchMs: [], decodeMs: [], drawMs: [], totalMs: [], sizes: [] },
          'Clip 2 (60-119)': { fetchMs: [], decodeMs: [], drawMs: [], totalMs: [], sizes: [] },
          'Clip 3 (120-179)': { fetchMs: [], decodeMs: [], drawMs: [], totalMs: [], sizes: [] },
          'Clip 4 (180-239)': { fetchMs: [], decodeMs: [], drawMs: [], totalMs: [], sizes: [] }
        },
        clip4Subranges: {
          '180-190': [],
          '190-200': [],
          '200-210': [],
          '210-220': [],
          '220-230': [],
          '230-239': []
        },
        controlClip3Subrange: {
          '120-130': [],
          '140-150': [],
          '160-170': []
        }
      };

      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d', { alpha: false });

      for (let i = 0; i < 240; i++) {
        const clipIdx = Math.floor(i / 60) + 1;
        const frameIdx = (i % 60) + 1;
        const clipKey = 'Clip ' + clipIdx + ' (' + ((clipIdx-1)*60) + '-' + (clipIdx*60 - 1) + ')';
        const clipStr = 'clip-' + clipIdx.toString().padStart(2, '0');
        const frameStr = 'frame-' + frameIdx.toString().padStart(4, '0') + '.webp?v=2';
        const url = '/hero/' + clipStr + '/' + frameStr;

        // Cold fetch measurement (cache: 'reload')
        const tFetch0 = performance.now();
        const res = await fetch(url);
        const blob = await res.blob();
        const fetchDur = performance.now() - tFetch0;

        // Decode measurement (createImageBitmap)
        const tDecode0 = performance.now();
        const bitmap = await createImageBitmap(blob);
        const decodeDur = performance.now() - tDecode0;

        // Canvas draw measurement
        const tDraw0 = performance.now();
        ctx.drawImage(bitmap, 0, 0);
        const drawDur = performance.now() - tDraw0;

        bitmap.close();

        const frameData = {
          globalIndex: i,
          clipIdx,
          frameIdx,
          url,
          sizeBytes: blob.size,
          sizeKb: blob.size / 1024,
          fetchDurMs: fetchDur,
          decodeDurMs: decodeDur,
          drawDurMs: drawDur,
          totalDurMs: fetchDur + decodeDur + drawDur
        };

        results.allFrames.push(frameData);
        results.clips[clipKey].fetchMs.push(fetchDur);
        results.clips[clipKey].decodeMs.push(decodeDur);
        results.clips[clipKey].drawMs.push(drawDur);
        results.clips[clipKey].totalMs.push(fetchDur + decodeDur + drawDur);
        results.clips[clipKey].sizes.push(blob.size / 1024);

        // Subrange categorization for Clip 4
        if (i >= 180 && i <= 190) results.clip4Subranges['180-190'].push(frameData);
        else if (i > 190 && i <= 200) results.clip4Subranges['190-200'].push(frameData);
        else if (i > 200 && i <= 210) results.clip4Subranges['200-210'].push(frameData);
        else if (i > 210 && i <= 220) results.clip4Subranges['210-220'].push(frameData);
        else if (i > 220 && i <= 230) results.clip4Subranges['220-230'].push(frameData);
        else if (i > 230 && i <= 239) results.clip4Subranges['230-239'].push(frameData);

        // Control subranges for Clip 3
        if (i >= 120 && i <= 130) results.controlClip3Subrange['120-130'].push(frameData);
        else if (i >= 140 && i <= 150) results.controlClip3Subrange['140-150'].push(frameData);
        else if (i >= 160 && i <= 170) results.controlClip3Subrange['160-170'].push(frameData);
      }

      // Compute statistics for each clip
      function stats(arr) {
        const sorted = [...arr].sort((a,b)=>a-b);
        const sum = sorted.reduce((a,b)=>a+b,0);
        return {
          avg: sum / sorted.length,
          median: sorted[Math.floor(sorted.length * 0.5)],
          p95: sorted[Math.floor(sorted.length * 0.95)],
          max: sorted[sorted.length - 1],
          min: sorted[0]
        };
      }

      const summary = {};
      for (const [key, data] of Object.entries(results.clips)) {
        summary[key] = {
          fetch: stats(data.fetchMs),
          decode: stats(data.decodeMs),
          draw: stats(data.drawMs),
          total: stats(data.totalMs),
          sizeKb: stats(data.sizes)
        };
      }

      return { summary, clip4Subranges: results.clip4Subranges, controlClip3Subrange: results.controlClip3Subrange };
    })()`);

    console.log('\n--- MICRO-BENCHMARK SUMMARY ---');
    console.log(JSON.stringify(benchmarkResults.summary, null, 2));

    fs.writeFileSync(path.join(__dirname, 'decode_and_network_benchmark.json'), JSON.stringify(benchmarkResults, null, 2));
    console.log('\nSaved full breakdown to scratch/decode_and_network_benchmark.json');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
