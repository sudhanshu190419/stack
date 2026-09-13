const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testFloatingWhatsApp() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const tempDir = 'C:\\Users\\Sudhanshu\\.gemini\\antigravity-ide\\brain\\ea6022cf-237d-4562-a5f3-08bd588067d5\\.tempmediaStorage';

  // 1. Test Desktop Homepage
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(tempDir, 'whatsapp_desktop_home.png') });

  // Check button properties
  const buttonData = await page.evaluate(() => {
    const btn = document.querySelector('a[aria-label="Chat with StackStich on WhatsApp"]');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    const computed = window.getComputedStyle(btn);
    return {
      href: btn.href,
      target: btn.target,
      rel: btn.rel,
      width: rect.width,
      height: rect.height,
      bottomDistance: window.innerHeight - rect.bottom,
      rightDistance: window.innerWidth - rect.right,
      bgColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
      zIndex: window.getComputedStyle(btn.closest('.fixed')).zIndex
    };
  });

  console.log('Desktop Button Evaluation:', JSON.stringify(buttonData, null, 2));

  // Hover over button to verify tooltip
  await page.hover('a[aria-label="Chat with StackStich on WhatsApp"]');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(tempDir, 'whatsapp_desktop_hover.png') });

  // 2. Test Mobile Homepage
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(tempDir, 'whatsapp_mobile_home.png') });

  const mobileButtonData = await page.evaluate(() => {
    const btn = document.querySelector('a[aria-label="Chat with StackStich on WhatsApp"]');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      bottomDistance: window.innerHeight - rect.bottom,
      rightDistance: window.innerWidth - rect.right,
    };
  });

  console.log('Mobile Button Evaluation:', JSON.stringify(mobileButtonData, null, 2));

  // 3. Test Contact Page to ensure both floating button and contact page card exist peacefully
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(tempDir, 'whatsapp_contact_page.png') });

  // 4. Test Service Page (e.g. /app-development)
  await page.goto('http://localhost:3000/app-development', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(tempDir, 'whatsapp_service_page.png') });

  await browser.close();
  console.log('Verification finished successfully!');
}

testFloatingWhatsApp().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
