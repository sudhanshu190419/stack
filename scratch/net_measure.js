const https = require('https');

// Helper to fetch headers and body size
function fetchMetadata(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        headers: res.headers,
        contentLength: parseInt(res.headers['content-length'] || '0', 10),
      });
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.end();
  });
}

function fetchTimed(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    let ttfb = 0;
    const req = https.get(url, (res) => {
      ttfb = Date.now() - start;
      let bytes = 0;
      res.on('data', chunk => bytes += chunk.length);
      res.on('end', () => {
        const totalTime = Date.now() - start;
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          ttfb,
          totalTime,
          bytes,
        });
      });
    });
    req.on('error', (err) => resolve({ url, error: err.message, time: Date.now() - start }));
  });
}

module.exports = { fetchMetadata, fetchTimed };
