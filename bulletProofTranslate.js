const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath).filter(f => !f.startsWith('.'));
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    let p = path.join(dirPath, file);
    if (fs.statSync(p).isDirectory()) {
      arrayOfFiles = getAllFiles(p, arrayOfFiles);
    } else if (file.endsWith('.tsx')) {
      arrayOfFiles.push(p);
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles('src/app', []);

const props = ['title', 'subtitle', 'heading', 'introduction', 'category', 'label', 'desc', 'text'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Split into lines to avoid matching 'use client'
  let lines = content.split('\n');
  let newLines = lines.map(line => {
      if (line.includes("'use client'") || line.includes('"use client"')) return line;
      if (line.includes('import ') || line.includes('from ')) return line;

      let newline = line;

      // 1. Props (Avoid double t())
      props.forEach(p => {
        const reg = new RegExp(`\\b${p}=["']([^"']+)["']`, 'g');
        newline = newline.replace(reg, (match, val) => {
            if (val.length > 3 && !val.includes('t(') && (val.includes(' ') || val.length > 8)) {
                changed = true;
                return `${p}={t(${JSON.stringify(val)})}`;
            }
            return match;
        });
      });

      // 2. Phrases in strings (Avoid double t())
      // We look for "Text" or 'Text' but NOT inside t()
      // This regex is tricky. We ensure no t( before the quote.
      // We'll use a safer approach: only target strings that look like phrases and are NOT part of an object key or style
      newline = newline.replace(/(?<!t\()(['"])([^'"]+)\1/g, (match, quote, val) => {
          if (val.length > 5 && val.includes(' ') && !val.includes('var(') && !val.includes('url(') && !val.includes('t(')) {
              // Extra check: not a style prop like 'flex-start' or '100vh' or 'var(--...)'
              if (!val.includes('--') && !val.includes('0%') && !val.includes('100%') && !val.includes('px')) {
                  changed = true;
                  return `t(${JSON.stringify(val)})`;
              }
          }
          return match;
      });

      return newline;
  });

  if (changed) {
    fs.writeFileSync(file, newLines.join('\n'));
    console.log('Fixed:', file);
  }
});
