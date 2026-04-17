const fs = require('fs');
const path = require('path');

const enPath = 'src/locales/en/common.json';
let enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const cleaned = {};
for (const key in enJson) {
  if (key.endsWith('\\')) continue;
  if (key.length < 2) continue;
  // If it ends with \" but doesn't have a matching start, it might be broken
  cleaned[key] = enJson[key];
}

fs.writeFileSync(enPath, JSON.stringify(cleaned, null, 2));
console.log('Cleaned en/common.json');
