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

for (const file of filesToFix) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Revert t('Value') back to 'Value' in object definitions
  // Matches label: t('...') or name: t('...') etc.
  content = content.replace(/(label|name|tag|achievement|story|text|title|subtitle|advice|category):\s*t\('([^']+)'\)/g, "$1: '$2'");
  
  // Also for STEPS arrays and such
  content = content.replace(/t\('([^']+)'\)/g, (match, p1) => {
      // If NOT inside JSX or a component function, it might be a constant.
      // But we can just target the specific files and patterns.
      return `'${p1}'`;
  });

  // Now, specifically ensure the JSX uses t()
  
  // Budget Planner
  content = content.replace(/>\{label\}</g, ">{t(label)}<");
  content = content.replace(/>\{d\.name\}</g, ">{t(d.name)}<");
  content = content.replace(/'Needs'/g, "t('Needs')").replace(/'Wants'/g, "t('Wants')").replace(/'Savings'/g, "t('Savings')");

  // Investment Planner
  content = content.replace(/>\{h\.goal\}</g, ">{t(h.goal)}<");
  content = content.replace(/>\{r\}</g, ">{t(r)}<");
  content = content.replace(/>\{a\.name\}</g, ">{t(a.name)}<");
  content = content.replace(/'Wealth Creation'/g, "t('Wealth Creation')");

  // Stories
  content = content.replace(/>\{story\.name\}</g, ">{t(story.name)}<");
  // city and story/achievement are already wrapped in stories file

  // Learn
  content = content.replace(/>\{mod\.label\}</g, ">{t(mod.label)}<");
  content = content.replace(/>\{mod\.tag\}</g, ">{t(mod.tag)}<");

  fs.writeFileSync(file, content, 'utf8');
}

console.log('Reverted static t() and ensured JSX t() usage.');
