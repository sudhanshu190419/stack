const https = require('https');
const http = require('http');

const urls = [
  'https://www.stackstich.online/',
  'https://stackstich.online/',
  'http://www.stackstich.online/',
  'http://stackstich.online/',
  'https://www.stackstich.online/robots.txt',
  'https://www.stackstich.online/sitemap.xml',
  'https://www.stackstich.online/work',
  'https://www.stackstich.online/our-work',
  'https://www.stackstich.online/contact',
  'https://www.stackstich.online/contact-us',
  'https://www.stackstich.online/website-design',
  'https://www.stackstich.online/web-development',
  'https://www.stackstich.online/ecommerce-development',
  'https://www.stackstich.online/app-development',
];

function fetchHead(url) {
  return new Promise((resolve) => {
    const isHttps = url.startsWith('https:');
    const client = isHttps ? https : http;
    const req = client.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } }, (res) => {
      let data = '';
      res.on('data', chunk => { if (data.length < 5000) data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          location: res.headers.location,
          sample: data.slice(0, 500)
        });
      });
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.setTimeout(8000, () => { req.abort(); resolve({ url, error: 'TIMEOUT' }); });
    req.end();
  });
}

async function audit() {
  console.log('--- AUDITING LIVE PRODUCTION ENDPOINTS ---');
  for (const u of urls) {
    const res = await fetchHead(u);
    console.log(`[${res.status || 'ERR'}] ${u} -> Location: ${res.location || 'none'} (${res.error || ''})`);
  }
}

audit();
