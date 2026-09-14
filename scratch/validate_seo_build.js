const http = require('http');

const testRoutes = [
  '/',
  '/work',
  '/work/edjoys',
  '/contact',
  '/web-development',
  '/website-design',
  '/ecommerce-development',
  '/app-development',
  '/robots.txt',
  '/sitemap.xml',
  '/our-work',
  '/contact-us',
];

function fetchRoute(path) {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          headers: res.headers,
          location: res.headers.location,
          body: data,
        });
      });
    });
    req.on('error', err => resolve({ path, error: err.message }));
  });
}

async function validate() {
  console.log('=== VALIDATING LOCAL BUILD / DEV ENDPOINTS ===\n');

  const pageResults = [];

  for (const r of testRoutes) {
    const res = await fetchRoute(r);

    if (r === '/robots.txt') {
      console.log('--- /robots.txt ---');
      console.log('Status:', res.status);
      console.log('Content:\n' + res.body);
      continue;
    }

    if (r === '/sitemap.xml') {
      console.log('--- /sitemap.xml ---');
      console.log('Status:', res.status);
      console.log('Content:\n' + res.body);
      continue;
    }

    if (r === '/our-work' || r === '/contact-us') {
      console.log(`--- ${r} ---`);
      console.log('Status:', res.status);
      console.log('Location (Redirect target):', res.location);
      continue;
    }

    // HTML Page inspection
    const html = res.body || '';
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) || html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const ogUrl = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const ogSiteName = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const twitterImage = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const twitterCard = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    const hasStackStudio = html.includes('stack.studio');
    const jsonLdCount = (html.match(/<script[^>]*type=["']application\/ld\+json["']/gi) || []).length;

    pageResults.push({
      URL: r,
      Status: res.status,
      Canonical: canonicalMatch ? canonicalMatch[1] : 'NONE',
      Title: titleMatch ? titleMatch[1] : 'NONE',
      Description: descMatch ? descMatch[1].slice(0, 45) + '...' : 'NONE',
      'OG URL': ogUrl ? ogUrl[1] : 'NONE',
      'OG SiteName': ogSiteName ? ogSiteName[1] : 'NONE',
      'OG Image': ogImage ? ogImage[1] : 'NONE',
      'H1 Count': h1Matches.length,
      'H1 Text': h1Matches.join(' | '),
      'Has stack.studio': hasStackStudio,
      'JSON-LD count': jsonLdCount
    });
  }

  console.log('\n--- PAGE AUDIT RESULTS TABLE ---');
  console.table(pageResults);
}

validate();
