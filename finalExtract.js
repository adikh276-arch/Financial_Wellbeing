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
  // Simple regex for t('key') or t("key")
  const regexes = [
    /t\(\s*'([^']+)'/g,
    /t\(\s*"([^"]+)"/g
  ];
  
  regexes.forEach(regex => {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const key = match[1];
      if (!enJson[key]) {
        console.log('Adding key:', key);
        enJson[key] = key;
      }
    }
  });
});

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
console.log('Done.');
