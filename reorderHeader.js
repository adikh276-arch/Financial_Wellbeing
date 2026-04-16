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

function extractBlock(content, startIndex) {
  let count = 0;
  let started = false;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') {
      count++;
      started = true;
    }
    if (content[i] === '}') {
      count--;
    }
    if (started && count === 0) {
      return content.substring(startIndex, i + 1);
    }
  }
  return null;
}

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  let idxStepMinusOne = content.indexOf('{step === -1 && (');
  // For spending quiz it might be step === 0
  if (idxStepMinusOne === -1) {
    idxStepMinusOne = content.indexOf('{step === 0 && (');
  }

  const idxPageHeader = content.indexOf('{true && (');
  
  if (idxStepMinusOne !== -1 && idxPageHeader !== -1 && idxStepMinusOne < idxPageHeader) {
     const blockStep = extractBlock(content, idxStepMinusOne);
     const blockHeader = extractBlock(content, idxPageHeader);

     if (blockStep && blockHeader) {
        // Swap them! We replace the whole span containing both.
        // The space between them:
        const between = content.substring(idxStepMinusOne + blockStep.length, idxPageHeader);
        
        const combinedOriginal = blockStep + between + blockHeader;
        const combinedNew = blockHeader + between + blockStep;
        
        content = content.replace(combinedOriginal, combinedNew);
        fs.writeFileSync(file, content, 'utf8');
     }
  }
}
console.log("Headers properly moved to the top before the main content blocks.");
