const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function inspectHtml() {
  const res = await get('https://www.stackstich.online');
  const html = res.body;

  console.log('=== PRODUCTION-ONLY RESOURCES AUDIT ===');
  console.log('Total HTML size:', html.length, 'bytes');

  // Check scripts
  const scripts = [];
  const scriptRegex = /<script([^>]*)>(.*?)<\/script>/gs;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = match[1];
    const inline = match[2];
    const srcMatch = attrs.match(/src="([^"]+)"/);
    if (srcMatch) {
      scripts.push({ type: 'external', src: srcMatch[1] });
    } else {
      scripts.push({ type: 'inline', preview: inline.trim().substring(0, 100) });
    }
  }

  console.log('\n--- Scripts (' + scripts.length + ') ---');
  scripts.forEach((s, idx) => {
    if (s.type === 'external') console.log(`[${idx}] External: ${s.src}`);
    else console.log(`[${idx}] Inline: ${s.preview.replace(/\n/g, ' ')}...`);
  });

  // Check stylesheets / fonts / preloads
  const links = [];
  const linkRegex = /<link([^>]+)>/g;
  while ((match = linkRegex.exec(html)) !== null) {
    const relMatch = match[1].match(/rel="([^"]+)"/);
    const hrefMatch = match[1].match(/href="([^"]+)"/);
    links.push({
      rel: relMatch ? relMatch[1] : '',
      href: hrefMatch ? hrefMatch[1] : '',
    });
  }

  console.log('\n--- Links & Preloads (' + links.length + ') ---');
  links.forEach((l, idx) => {
    console.log(`[${idx}] rel="${l.rel}" href="${l.href}"`);
  });
}

inspectHtml();
