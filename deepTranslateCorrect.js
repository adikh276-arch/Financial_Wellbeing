const fs = require('fs');

const filesToFix = [
  'src/app/budget-planner/page.tsx',
  'src/app/investment-planner/page.tsx',
  'src/app/goal-planner/page.tsx',
  'src/app/check-ins/spending-style-quiz/page.tsx',
  'src/app/financial-health-score/page.tsx',
  'src/app/emergency-fund/page.tsx',
  'src/app/loan-emi-planner/page.tsx',
  'src/app/explore/financial-stories/page.tsx',
  'src/app/learn/page.tsx'
];

const enJson = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));

for (const file of filesToFix) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Ensure useTranslation is imported properly
  if (content.includes('t(') && !content.includes("from 'react-i18next'")) {
      content = content.replace(/^'use client';/m, "'use client';\nimport { useTranslation } from 'react-i18next';");
      changed = true;
  }

  // 1. Wrap keys in data arrays: label: '...' or name: '...' or tag: '...' etc.
  const fields = ['label', 'name', 'tag', 'achievement', 'story', 'text', 'title', 'subtitle', 'advice', 'category'];
  for (const field of fields) {
     const regex = new RegExp(`(\${field}:\\s*)'([^']+)'`, 'g');
     content = content.replace(regex, (match, p1, p2) => {
        if (p2.length > 1 && !p2.includes('{')) {
            enJson[p2] = p2;
            changed = true;
            return p1 + "t('" + p2.replace(/'/g, "\\'") + "')";
        }
        return match;
     });
  }

  // 2. Wrap labels in chart data if hardcoded: name: 'Needs' => name: t('Needs')
  content = content.replace(/name:\s*'([^']+)'/g, (match, p1) => {
      if (p1.length > 1 && !p1.includes('{')) {
          enJson[p1] = p1;
          changed = true;
          return "name: t('" + p1.replace(/'/g, "\\'") + "')";
      }
      return match;
  });

  // 3. For financial-health-score specifically
  if (file.includes('financial-health-score')) {
      content = content.replace(/catScores\[q\.category\]/g, "catScores[t(q.category)]");
      content = content.replace(/>\{cat\}</g, ">{t(cat)}<");
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}

fs.writeFileSync('src/locales/en/common.json', JSON.stringify(enJson, null, 2));
console.log('Applied deep translations safely.');
