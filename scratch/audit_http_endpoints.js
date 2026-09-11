const http = require('http');

function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3005${urlPath}`, (res) => {
      resolve({
        path: urlPath,
        statusCode: res.statusCode,
        contentType: res.headers['content-type'],
        contentLength: res.headers['content-length'],
      });
      res.resume(); // consume response
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, statusCode: 500, error: err.message });
    });
  });
}

async function runHttpAudit() {
  console.log('--- AUDITING 240 DESKTOP FRAMES VIA HTTP (PORT 3005) ---');
  let desktop200 = 0;
  let desktopErrors = 0;

  for (let c = 1; c <= 4; c++) {
    const clipStr = `clip-${c.toString().padStart(2, '0')}`;
    for (let f = 1; f <= 60; f++) {
      const frameStr = `frame-${f.toString().padStart(4, '0')}.webp`;
      const urlPath = `/hero/${clipStr}/${frameStr}`;
      const res = await checkUrl(urlPath);
      if (res.statusCode === 200) {
        desktop200++;
      } else {
        console.error(`FAILED: ${urlPath} -> status ${res.statusCode}`);
        desktopErrors++;
      }
    }
  }
  console.log(`Desktop 200 OK count: ${desktop200}/240. Errors: ${desktopErrors}`);

  console.log('\n--- AUDITING NON-EXISTENT BOUNDARIES (SHOULD BE 404) ---');
  const check404s = [
    '/hero/clip-01/frame-0000.webp',
    '/hero/clip-01/frame-0061.webp',
    '/hero/clip-02/frame-0061.webp',
    '/hero/clip-03/frame-0061.webp',
    '/hero/clip-04/frame-0061.webp',
    '/hero/clip-05/frame-0001.webp',
    '/hero/clip-05/frame-0050.webp',
    '/hero/clip-05/frame-0100.webp',
  ];
  for (const urlPath of check404s) {
    const res = await checkUrl(urlPath);
    console.log(`${urlPath} -> ${res.statusCode} ${res.statusCode === 404 ? '✓ (Expected 404)' : '✗'}`);
  }

  console.log('\n--- AUDITING MOBILE 200 FRAMES VIA HTTP ---');
  let mobile200 = 0;
  let mobileErrors = 0;
  for (let c = 1; c <= 2; c++) {
    const clipStr = `clip-${c.toString().padStart(2, '0')}`;
    for (let f = 1; f <= 100; f++) {
      const frameStr = `frame-${f.toString().padStart(3, '0')}.webp`;
      const urlPath = `/hero_mobile/${clipStr}/${frameStr}`;
      const res = await checkUrl(urlPath);
      if (res.statusCode === 200) {
        mobile200++;
      } else {
        console.error(`FAILED: ${urlPath} -> status ${res.statusCode}`);
        mobileErrors++;
      }
    }
  }
  console.log(`Mobile 200 OK count: ${mobile200}/200. Errors: ${mobileErrors}`);
}

runHttpAudit();
