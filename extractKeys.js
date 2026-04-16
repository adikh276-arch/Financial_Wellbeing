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
const enJson = fs.existsSync(enPath) ? JSON.parse(fs.readFileSync(enPath, 'utf8')) : {};

const files = getAllFiles('src/app', []).filter(f => f.endsWith('.tsx'));

const keyRegex = /t\(\s*'([^'\\]*(?:\\.[^'\\]*)*)'/g; // Matches t('key') and t('prop.sub')
const keyRegex2 = /t\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = keyRegex.exec(content)) !== null) {
    const key = match[1].replace(/\\'/g, "'");
    if (!enJson[key]) enJson[key] = key;
  }
  while ((match = keyRegex2.exec(content)) !== null) {
    const key = match[1].replace(/\\"/g, '"');
    if (!enJson[key]) enJson[key] = key;
  }
}

// Special case for d.name etc in lists
const vars = [
  'd.name', 'h.goal', 'h.riskLevel', 'goal.priority', 'category.label',
  's.label', 'm.tag', 'mod.tag', 'mod.label', 'opt.label', 'opt', 'profile.label'
];

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
console.log('Extracted all keys to en/common.json');
