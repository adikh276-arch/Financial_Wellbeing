const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const enPath = 'src/locales/en/common.json';
let enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const files = getAllFiles('src/app', []).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Matches t('key')
  const tRegex = /t\(\s*['"]([^'"]+)['"]\s*[,)]/g;
  let tMatch;
  while ((tMatch = tRegex.exec(content)) !== null) {
    const key = tMatch[1].replace(/\\'/g, "'");
    if (key && !enJson[key]) enJson[key] = key;
  }
});

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
console.log('Done extraction.');
