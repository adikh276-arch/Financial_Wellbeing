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

  // 1. Add import if missing
  if (content.includes('useClient') || content.includes("'use client'") || content.includes('"use client"')) {
    if (!content.includes('useTranslation')) {
      content = content.replace(/'use client';\n/, "'use client';\nimport { useTranslation } from 'react-i18next';\n");
      content = content.replace(/"use client";\n/, '"use client";\nimport { useTranslation } from "react-i18next";\n');
      changed = true;
    }
    
    // 2. Add const { t } = useTranslation(); inside component
    // Look for export default function Name() {
    const componentRegex = /export default function \w+\s*\([^)]*\)\s*\{/;
    if (componentRegex.test(content) && !content.includes('const { t } = useTranslation()')) {
      content = content.replace(componentRegex, (match) => match + "\n  const { t } = useTranslation();");
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed imports for:', file);
  }
});
