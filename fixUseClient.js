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

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Fix "use client" position
  if (content.includes("'use client';")) {
      const lines = content.split('\n');
      const idx = lines.findIndex(l => l.includes("'use client';"));
      if (idx > 0) {
          const line = lines[idx];
          lines.splice(idx, 1);
          lines.unshift(line);
          content = lines.join('\n');
          changed = true;
      }
  }

  // 2. Fix broken t() placeholders from previous faulty script run
  // This was: t('${p1.replace(/'/g, "\\'")}'))
  // It should have been the actual value!
  // I will just revert the files to a cleaner state and re-apply correctly if needed, 
  // but let's try to fix the pattern.
  if (content.includes("t('${p1.replace(/'/g, \"\\\\'\")}')")) {
      // This is hard to fix without knowing the original. 
      // I'll use git checkout to restore the files and re-do the logic carefully.
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}

console.log('Fixed use client positions.');
