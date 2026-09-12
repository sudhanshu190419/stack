const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  // Desktop
  const pageDesk = await browser.newPage();
  await pageDesk.setViewport({ width: 1440, height: 900 });
  await pageDesk.goto('http://localhost:3000/app-development', { waitUntil: 'networkidle0' });
  const sectionsDesk = await pageDesk.$$('section');
  // Section 2
  if (sectionsDesk[1]) {
    await sectionsDesk[1].screenshot({
      path: 'C:/Users/Sudhanshu/.gemini/antigravity-ide/brain/ea6022cf-237d-4562-a5f3-08bd588067d5/desktop_what_we_build_full.png'
    });
  }

  // Tablet (iPad 768)
  const pageTab = await browser.newPage();
  await pageTab.setViewport({ width: 768, height: 1024 });
  await pageTab.goto('http://localhost:3000/app-development', { waitUntil: 'networkidle0' });
  const sectionsTab = await pageTab.$$('section');
  if (sectionsTab[1]) {
    await sectionsTab[1].screenshot({
      path: 'C:/Users/Sudhanshu/.gemini/antigravity-ide/brain/ea6022cf-237d-4562-a5f3-08bd588067d5/tablet_what_we_build_full.png'
    });
  }

  await browser.close();
  console.log('Successfully captured full desktop and tablet screenshots');
})();
