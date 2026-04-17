const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/explore/financial-articles/page.tsx',
  'src/app/explore/financial-tips/page.tsx',
  'src/app/explore/financial-stories/page.tsx',
  'src/app/explore/financial-faqs/page.tsx',
  'src/app/explore/financial-myths/page.tsx'
];

filesToFix.forEach(p => {
  if (fs.existsSync(p)) {
    let lines = fs.readFileSync(p, 'utf8').split('\n');
    let seenUseTranslation = false;
    let filteredLines = lines.filter(line => {
      if (line.includes("import { useTranslation } from 'react-i18next';")) {
        if (seenUseTranslation) return false;
        seenUseTranslation = true;
      }
      return true;
    });
    fs.writeFileSync(p, filteredLines.join('\n'));
    console.log('Cleaned imports for:', p);
  }
});
