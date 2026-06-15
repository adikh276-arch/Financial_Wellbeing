const fs = require('fs');
const files = [
  'src/app/budget-planner/page.tsx',
  'src/app/check-ins/investment-readiness/page.tsx',
  'src/app/check-ins/money-stress-quiz/page.tsx',
  'src/app/check-ins/savings-check-up/page.tsx',
  'src/app/check-ins/spending-style-quiz/page.tsx',
  'src/app/emergency-fund/page.tsx',
  'src/app/financial-health-score/page.tsx',
  'src/app/investment-planner/page.tsx',
  'src/app/loan-emi-planner/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const rightSlotRegex = /rightSlot=\{([^?]+)\s*\?\s*\([\s\S]*?onClick=\{handleSave\}[\s\S]*?\)\s*:\s*null\}/;
  const match = content.match(rightSlotRegex);
  
  if (match) {
    const condition = match[1].trim();
    content = content.replace(rightSlotRegex, `bottomSlot={${condition} ? <SaveAndFinishButton onSave={handleSave} saved={saved} /> : null}`);
    
    if (!content.includes('SaveAndFinishButton')) {
      content = content.replace(/(import .* from ['"]lucide-react['"];)/, `$1\nimport { SaveAndFinishButton } from '@/components/shared/SaveAndFinishButton';`);
    }
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  } else {
    const rightSlotFallback = /rightSlot=\{[\s\S]*?onClick=\{handleSave\}[\s\S]*?\}/;
    const fallbackMatch = content.match(rightSlotFallback);
    if (fallbackMatch) {
      content = content.replace(rightSlotFallback, `bottomSlot={<SaveAndFinishButton onSave={handleSave} saved={saved} />}`);
      if (!content.includes('SaveAndFinishButton')) {
        content = content.replace(/(import .* from ['"]lucide-react['"];)/, `$1\nimport { SaveAndFinishButton } from '@/components/shared/SaveAndFinishButton';`);
      }
      fs.writeFileSync(f, content);
      console.log('Updated via fallback ' + f);
    } else {
      console.log('Could not match rightSlot in ' + f);
    }
  }
});
