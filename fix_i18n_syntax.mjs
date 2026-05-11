import fs from 'fs';
import path from 'path';

const rootDir = 'd:\\Downloads\\Financial Wellness\\financial-wellness';
const srcDir = path.join(rootDir, 'src');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      callback(fullPath);
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Fix double t(t('...')) -> t('...')
  content = content.replace(/t\(t\((['"`])(.*?)\1\)\)/g, "t($1$2$1)");

  // 2. Fix the \t(' pattern (likely a tab char followed by broken t)
  content = content.replace(/\\t\('/g, "'");

  // 3. Fix the \')t(' pattern
  content = content.replace(/\\'\)t\('/g, "'");

  // 4. Fix split t patterns like t('Text') followed by t('
  // Specific case: t('Diversification is your safety net - don\')t skip itt(', 
  content = content.replace(/t\((['"])(.*?)\\?'\)?t\(\1\)/g, "t($1$2$1)");

  // 5. Fix t(')Text') patterns
  content = content.replace(/t\((['"])\)(.*?)\1\)/g, "t($1$2$1)");
  
  // 6. Fix nested t patterns that are not double but broken
  // e.g., t('... t('Nested') ...')
  content = content.replace(/t\((['"])(.*?) t\(\1(.*?)\1\)(.*?)\1\)/g, "t($1$2 $3$4$1)");

  // 7. Fix stray t(' at the end of a line if it's broken
  // This is riskier, but let's try to match t('...t(' followed by non-t
  content = content.replace(/t\((['"])(.*?)t\(\1/g, "t($1$2$1");

  // 8. Fix )t(' patterns
  content = content.replace(/\)t\((['"])/g, "$1");

  // 9. Fix t(t( nested again
  content = content.replace(/t\(t\(/g, "t(");
  
  // 10. Specific fix for the "Europe Trip" case: t('Label... t('Europe Trip 2026') ...')
  content = content.replace(/t\((['"])(.*?) t\(\1(.*?)\1\)(.*?)\1\)/g, "t($1$2 $3$4$1)");

  if (content !== originalContent) {
    console.log(`Fixed: ${filePath}`);
    fs.writeFileSync(filePath, content);
  }
}

console.log('Starting i18n syntax fix v2...');
walk(srcDir, fixFile);
console.log('Done.');
