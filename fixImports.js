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

const files = getAllFiles('src/app', []).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('useTranslation') && !content.includes("from 'react-i18next'")) {
      content = content.replace(/import {([^}]+)}/g, (match, imports) => {
          if (imports.includes('useTranslation')) {
              let newImports = imports.replace(/\buseTranslation\b,?\s*/g, '').trim();
              if (newImports.endsWith(',')) newImports = newImports.slice(0, -1);
              if (newImports.startsWith(',')) newImports = newImports.slice(1);
              return `import { ${newImports.trim()} }`;
          }
          return match;
      });
      content = "import { useTranslation } from 'react-i18next';\n" + content;
      changed = true;
  }

  // Move 'use client' to top
  if (content.includes("'use client'") || content.includes('"use client"')) {
      const line = content.includes("'use client'") ? "'use client';" : '"use client";';
      if (content.indexOf(line) > 10) { // Not near top
          content = line + "\n" + content.replace(line, '').trim();
          changed = true;
      }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
  }
});
