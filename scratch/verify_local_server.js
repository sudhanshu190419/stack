async function test() {
  const res = await fetch('http://127.0.0.1:3000/hero/clip-04/frame-0001.webp');
  console.log('HTTP Status:', res.status);
  console.log('Content-Length:', res.headers.get('content-length'), 'bytes (~' + (parseInt(res.headers.get('content-length'))/1024).toFixed(1) + ' KB)');
  console.log('Content-Type:', res.headers.get('content-type'));
}
test().catch(console.error);
