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
  
  // Regex that handles escaped quotes
  const doubleQuoteRegex = /t\(\s*"((?:[^"\\]|\\.)*)"/g;
  const singleQuoteRegex = /t\(\s*'((?:[^'\\]|\\.)*)'/g;
  
  let match;
  while ((match = doubleQuoteRegex.exec(content)) !== null) {
      let key = match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      if (!enJson[key]) {
          console.log('Adding key (double):', key);
          enJson[key] = key;
      }
  }
  while ((match = singleQuoteRegex.exec(content)) !== null) {
      let key = match[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
      if (!enJson[key]) {
          console.log('Adding key (single):', key);
          enJson[key] = key;
      }
  }
});

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
console.log('Done.');
