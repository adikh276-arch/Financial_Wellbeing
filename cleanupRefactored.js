const fs = require('fs');

// Fix duplicate t definitions
const filesWithDupT = [
  'src/app/explore/financial-stories/page.tsx',
  'src/app/explore/financial-articles/page.tsx',
  'src/app/explore/financial-tips/page.tsx',
  'src/app/explore/financial-faqs/page.tsx',
  'src/app/explore/financial-myths/page.tsx'
];

filesWithDupT.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    let lines = c.split('\n');
    let seenT = false;
    let filteredLines = lines.filter(line => {
      if (line.includes("const { t } = useTranslation();")) {
        if (seenT) return false;
        seenT = true;
      }
      return true;
    });
    fs.writeFileSync(p, filteredLines.join('\n'));
  }
});

// Fix trailing errors in explore/page.tsx and LearnModule.tsx
// I probably added a </div> without matching it or vice versa
const filesToFixSyntax = ['src/app/explore/page.tsx', 'src/components/LearnModule.tsx'];

filesToFixSyntax.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    // Common error: I added a div that messed up the hierarchy
    // Let's just restore the files to a safe state and manually re-apply the diffs
    // Actually, I can just count braces/tags if it's consistent
    // But let's look at them first.
    console.log('Inspecting:', p);
  }
});
