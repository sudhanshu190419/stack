const https = require('https');

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Our Work (Alias)', path: '/our-work' },
  { name: 'Contact', path: '/contact' },
  { name: 'Contact Us (Alias)', path: '/contact-us' },
  { name: 'Web Development', path: '/web-development' },
  { name: 'Website Design', path: '/website-design' },
  { name: 'E-commerce', path: '/ecommerce-development' },
  { name: 'App Development', path: '/app-development' },
];

function fetchPage(path) {
  return new Promise((resolve) => {
    const url = 'https://www.stackstich.online' + path;
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        // Parse basic tags
        const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
        const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
        const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) || html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
        const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const ogUrl = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const twitterCard = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
        
        // H1 tags
        const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

        // Internal Links
        const linkMatches = [...html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi)].map(m => m[1]);
        const internalLinks = [...new Set(linkMatches.filter(l => l.startsWith('/') || l.includes('stackstich.online')))];

        resolve({
          path,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : null,
          description: descMatch ? descMatch[1] : null,
          canonical: canonicalMatch ? canonicalMatch[1] : null,
          robots: robotsMatch ? robotsMatch[1] : null,
          ogTitle: ogTitle ? ogTitle[1] : null,
          ogDesc: ogDesc ? ogDesc[1] : null,
          ogUrl: ogUrl ? ogUrl[1] : null,
          ogImage: ogImage ? ogImage[1] : null,
          twitterCard: twitterCard ? twitterCard[1] : null,
          jsonLdCount: jsonLdMatches.length,
          h1s: h1Matches,
          internalLinks
        });
      });
    });
    req.on('error', err => resolve({ path, error: err.message }));
  });
}

async function run() {
  const results = [];
  for (const p of pages) {
    const res = await fetchPage(p.path);
    results.push(res);
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
