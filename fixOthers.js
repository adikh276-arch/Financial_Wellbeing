const fs = require('fs');
const path = require('path');

const files = [
    'src/app/budget-planner/page.tsx',
    'src/app/emergency-fund/page.tsx',
    'src/app/financial-health-score/page.tsx',
    'src/app/goal-planner/page.tsx',
    'src/app/investment-planner/page.tsx',
    'src/app/loan-emi-planner/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. PageHeader title/subtitle
  content = content.replace(/(title|subtitle)={['"]([^'"]+)['"]}/g, (match, prop, val) => {
    return `${prop}={t('${val}')}`;
  });
  content = content.replace(/(title|subtitle)=["']([^"']+)["']/g, (match, prop, val) => {
    changed = true;
    return `${prop}={t('${val}')}`;
  });

  // 2. Headings and Paragraphs: <h1 ...>Text</h1> -> <h1 ...>{t('Text')}</h1>
  const tags = ['h1', 'h2', 'h3', 'p', 'label'];
  tags.forEach(tag => {
      const reg = new RegExp(`<(${tag})([^>]*)>([^<{}>]+)</\\1>`, 'g');
      content = content.replace(reg, (match, t, attrs, text) => {
          const trimmed = text.trim();
          if (trimmed.length > 2 && trimmed.includes(' ') && !trimmed.startsWith('{')) {
              changed = true;
              return `<${t}${attrs}>{t('${trimmed.replace(/'/g, "\\'")}')}</${t}>`;
          }
          return match;
      });
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed page:', file);
  }
});
