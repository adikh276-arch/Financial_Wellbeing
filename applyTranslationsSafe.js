const fs = require('fs');

const files = [
  'src/app/investment-planner/page.tsx',
  'src/app/loan-emi-planner/page.tsx',
  'src/app/goal-planner/page.tsx',
  'src/app/budget-planner/page.tsx',
  'src/app/emergency-fund/page.tsx',
  'src/app/financial-health-score/page.tsx',
  'src/app/check-ins/spending-style-quiz/page.tsx',
  'src/app/check-ins/money-stress-quiz/page.tsx',
  'src/app/check-ins/savings-check-up/page.tsx',
  'src/app/check-ins/investment-readiness/page.tsx'
];

const enJson = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));
const exactKeysToReplace = Object.keys(enJson).filter(k => /^[A-Za-z]/.test(k) && k.length > 2);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Add useTranslation
  if (!content.includes('useTranslation()')) {
    content = content.replace(/export default function \w+\(\) \{/, match => match + '\n  const { t } = useTranslation();');
  }

  // Exact replacement for text nodes
  for (const key of exactKeysToReplace) {
     const safeKey = key.replace(/'/g, "\\'");
     const escapedKeyRegex = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
     
     // Match > Text <
     const regex = new RegExp(`>(\\s*)${escapedKeyRegex}(\\s*)<`, 'g');
     content = content.replace(regex, `>$1{t('${safeKey}')}$2<`);
     
     // Match props
     const propsRegex = new RegExp(`(title|subtitle|placeholder|label)="(${escapedKeyRegex})"`, 'g');
     content = content.replace(propsRegex, `$1={t('${safeKey}')}`);
  }

  // Fix PageHeader conditional to be visible on any step
  // We find 'PageHeader' and replace its wrapper condition `{step >= 0 && (` with empty.
  // Actually, we can just replace `{step >= 0 && (\n          <PageHeader` with `<PageHeader` but we have to remove the closing `)}`
  // An easy trick: replace `currentStep=\{step\}` with `currentStep={step >= 0 ? step : undefined}` 
  // Expose PageHeader on step -1
  content = content.replace(/\{step >= 0 && \([\s\n]*<PageHeader/g, '{true && (\n          <PageHeader');

  content = content.replace(/currentStep=\{step\}/, 'currentStep={step >= 0 ? step : undefined}');
  content = content.replace(/steps=\{STEPS\}/, 'steps={step >= 0 ? STEPS : undefined}');
  content = content.replace(/steps=\{['"]Capital['"], ['"]Strategy['"], ['"]Results['"]\}/g, 'steps={STEPS}');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Safe fix applied.');
