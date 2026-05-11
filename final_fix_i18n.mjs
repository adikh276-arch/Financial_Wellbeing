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

function finalFix(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix double wrapping
    content = content.replace(/t\(t\(((['"])(?:(?=(\\?))\3.)*?\2)\)\)/g, "t($1)");
    
    // Fix split strings
    content = content.replace(/t\((['"])(.*?)\\?'\)?t\(\1\)/g, "t($1$2$1)");
    
    // Fix broken quotes
    content = content.replace(/t\((['"])\)(.*?)\1\)/g, "t($1$2$1)");

    if (content !== original) {
        console.log(`Final Fixed: ${filePath}`);
        fs.writeFileSync(filePath, content);
    }
}

walk(srcDir, finalFix);
console.log('Final Fix Done.');
