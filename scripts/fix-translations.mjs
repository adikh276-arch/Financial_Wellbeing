import fs from 'fs';
import path from 'path';

const namespaces = ['learn', 'check-ins', 'investment-planner', 'budget-planner', 'history', 'common'];

const replacements = [
  { from: /\+\+/g, to: '/' },
  { from: /\+Ã¹/g, to: '*' },
  { from: /\+ Ã¹/g, to: '*' },
  { from: /GÂ£Ã´/g, to: '•' },
  { from: /GÂ£Ã¹/g, to: '•' },
  { from: /GÂ£Ã'/g, to: '•' },
  { from: /Â£Ã´/g, to: '•' },
  { from: /Â£Ã'/g, to: '•' },
  { from: /¥Ã†/g, to: '→' },
  { from: /¥Ã/g, to: '→' }, // More aggressive
  { from: /Ã¹/g, to: '*' }, 
  { from: /restriction'it's/g, to: "restriction — it's" },
  { from: /not optional'it's/g, to: "not optional — it's" },
  { from: /GÂ£/g, to: '•' },
  { from: /â€¢/g, to: '•' },
];

for (const ns of namespaces) {
  const i18nDir = `src/app/${ns === 'common' ? '' : ns + '/'}i18n`;
  if (!fs.existsSync(i18nDir)) continue;
  
  const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(i18nDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const r of replacements) {
      content = content.replace(r.from, r.to);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed ${ns}/${file}`);
    }
  }
}
