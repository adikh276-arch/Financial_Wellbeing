const fs = require('fs');
const path = require('path');

const files = [
  'src/app/financial-health-score/page.tsx',
  'src/app/emergency-fund/page.tsx',
  'src/app/check-ins/money-stress-quiz/page.tsx',
  'src/app/check-ins/spending-style-quiz/page.tsx',
  'src/app/check-ins/savings-check-up/page.tsx',
  'src/app/check-ins/investment-readiness/page.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace {saved ? 'Saved!' : 'Save'} with {saved ? t('Saved!') : t('Save')}
  // Using a more generic regex for these save labels
  content = content.replace(/\{saved\s*\?\s*['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]\}/g, (match, p1, p2) => {
    return `{saved ? t('${p1}') : t('${p2}')}`;
  });

  fs.writeFileSync(f, content);
  console.log('Fixed:', f);
});
