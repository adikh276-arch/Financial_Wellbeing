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

const files = getAllFiles('src/app', []).filter(f => f.endsWith('layout.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Remove import
  const importReg = /import {[^}]*useTranslation[^}]*} from 'react-i18next';\n?/g;
  if (importReg.test(content)) {
      content = content.replace(importReg, '');
      changed = true;
  }

  // Remove hook call
  const hookReg = /const { t } = useTranslation\(\);?\n?/g;
  if (hookReg.test(content)) {
      content = content.replace(hookReg, '');
      changed = true;
  }

  // Restore t("Text") to "Text" in metadata
  const metadataReg = /title: t\(("[^"]+")\)/g;
  if (metadataReg.test(content)) {
      content = content.replace(metadataReg, 'title: $1');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed Layout:', file);
  }
});
