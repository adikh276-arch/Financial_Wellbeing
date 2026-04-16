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

  // 1. Wrap keys in data arrays: label: '...' or name: '...' etc.
  const fields = ['label', 'name', 'tag', 'achievement', 'story', 'text', 'title', 'subtitle', 'advice', 'category'];
  for (const field of fields) {
     const regex = new RegExp(field + ":\\s*'([^']+)'", 'g');
     content = content.replace(regex, (match, p1) => {
        if (p1.length > 1 && !p1.includes('{')) {
            enJson[p1] = p1;
            changed = true;
            return field + ": t('" + p1.replace(/'/g, "\\'") + "')";
        }
        return match;
     });
  }

  // 2. Wrap labels in chart data if hardcoded: name: 'Needs' => name: t('Needs')
  // We already handled 'name' above, but let's be sure for other cases
  
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
