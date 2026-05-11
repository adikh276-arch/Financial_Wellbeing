import fs from 'fs';
import path from 'path';

const filePath = 'd:\\Downloads\\Financial Wellness\\financial-wellness\\src\\app\\financial-health-score\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the split line 28
const pattern = /\{ id: 'knowsCreditScore',[\s\S]*?category: t\('Debt & Obligations'\) \},/;
const replacement = `{ id: 'knowsCreditScore', text: t("Do you know your credit score?"), options: [{ label: t("Yes, and it's good (750+)"), score: 10 }, { label: t("Yes, but it needs work"), score: 5 }, { label: t("No") }], category: t("Debt & Obligations") },`;

content = content.replace(pattern, replacement);

fs.writeFileSync(filePath, content);
console.log('Fixed split line in financial-health-score/page.tsx');
