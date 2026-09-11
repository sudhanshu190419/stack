const fs = require('fs');
const path = require('path');

const heroDir = path.join(__dirname, '..', 'public', 'hero');
const entries = fs.readdirSync(heroDir);
console.log('Entries in public/hero:', entries);

for (const entry of entries) {
  const p = path.join(heroDir, entry);
  if (fs.statSync(p).isDirectory()) {
    const files = fs.readdirSync(p);
    console.log(entry + ' count: ' + files.length);
    console.log('  First 3:', files.slice(0, 3));
    console.log('  Last 3:', files.slice(-3));
  }
}
