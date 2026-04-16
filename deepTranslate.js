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

  // 1. Wrap keys in data arrays: label: '...' or name: '...' or tag: '...' or achievement: '...' or story: '...'
  const fields = ['label', 'name', 'tag', 'achievement', 'story', 'text', 'title', 'subtitle', 'advice', 'category'];
  for (const field of fields) {
     const regex = new RegExp(`(\${field}:\\s*)'([^']+)'`, 'g');
     content = content.replace(regex, (match, p1, p2) => {
        if (p2.length > 1) {
            enJson[p2] = p2;
            changed = true;
            return `\${p1}t('\${p2.replace(/'/g, "\\\\'")}')`;
        }
        return match;
     });
  }

  // 2. Wrap labels in chart data if hardcoded
  // name: 'Needs' => name: t('Needs')
  content = content.replace(/name:\s*'([^']+)'/g, (match, p1) => {
      if (p1.length > 1) {
          enJson[p1] = p1;
          changed = true;
          return `name: t('\${p1.replace(/'/g, "\\\\'")}')`;
      }
      return match;
  });

  // 3. Fix strings with interpolation inside t() (like the stories one)
  // t('Income: £{{income}} / mo', { income: story.income })
  // We need to make sure this is in enJson
  const complexT = /t\('([^']+)'/g;
  let m;
  while ((m = complexT.exec(content)) !== null) {
      if (m[1].includes('{{')) {
          enJson[m[1]] = m[1];
          changed = true;
      }
  }

  // 4. Ensure we catch category names in health score
  if (file.includes('financial-health-score')) {
      content = content.replace(/CATEGORY_MAX:\s*Record<string,\s*number>\s*=\s*\{([\s\S]*?)\};/, (match, p1) => {
          let replaced = p1.replace(/'([^']+)'/g, (m, key) => {
              enJson[key] = key;
              return `[t('\${key}')]`;
          });
          return `CATEGORY_MAX: Record<string, number> = {\${replaced}};`;
      });
      
      content = content.replace(/catScores\[q\.category\]/g, "catScores[t(q.category)]");
      content = content.replace(/\[cat, maxCat\]/g, "[cat, maxCat]"); // just ensuring it's there
      content = content.replace(/>\{cat\}</g, ">{cat}<"); // cat should already be translated from catScores key if we do it right
      // Actually simpler: translate when rendering.
      content = content.replace(/>\{cat\}</g, ">{t(cat)}<");
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}

fs.writeFileSync('src/locales/en/common.json', JSON.stringify(enJson, null, 2));
console.log('Applied deep translations to data structures.');
