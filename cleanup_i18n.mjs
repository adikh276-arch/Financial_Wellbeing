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

function cleanup(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Fix double t(t('...'))
  content = content.replace(/t\(t\((['"])(.*?)\1\)\)/g, "t($1$2$1)");
  
  // 2. Fix t(')Text') patterns
  content = content.replace(/t\((['"])\)(.*?)\1\)/g, "t($1$2$1)");

  // 3. Fix t('Textt(')
  content = content.replace(/t\((['"])(.*?)t\(\1/g, "t($1$2$1)");

  // 4. Fix split strings like t('Part 1') followed by t('Part 2')
  content = content.replace(/t\((['"])(.*?)\\?'\)?s good \((.*?)\)t\(\1\)/g, "t($1$2's good ($3)$1)");
  
  // 5. Fix t(')Yes, but it needs workt(')
  content = content.replace(/t\((['"])\)(.*?)t\(\1/g, "t($1$2$1)");

  // 6. Generic t(t( cleanup
  let prev;
  do {
      prev = content;
      content = content.replace(/t\(t\((.*?)\)\)/g, "t($1)");
  } while (prev !== content);

  if (content !== original) {
    console.log(`Cleaned: ${filePath}`);
    fs.writeFileSync(filePath, content);
  }
}

walk(srcDir, cleanup);
console.log('Cleanup Done.');
