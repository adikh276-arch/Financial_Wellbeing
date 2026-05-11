import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Usage: node scripts/prepare-i18n.mjs <module-name>');
  process.exit(1);
}

const baseDir = moduleName === 'dashboard'
  ? path.join(__dirname, '../src/app')
  : path.join(__dirname, `../src/app/${moduleName}`);

if (!fs.existsSync(baseDir)) {
  console.error(`Module directory does not exist: ${baseDir}`);
  process.exit(1);
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'i18n' || file === 'api') continue;
            processDir(fullPath);
        } else if (file === 'page.tsx') {
            if (moduleName === 'dashboard' && dir !== baseDir) continue; // Only root page for dashboard module here
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Ensure useTranslation is imported
    if (!content.includes('useTranslation') && !content.includes('react-i18next')) {
        content = content.replace(/'use client';/, `'use client';\nimport { useTranslation } from 'react-i18next';`);
    }

    // 2. Add useTranslation hook if missing
    if (!content.includes('const { t } = useTranslation')) {
        content = content.replace(/(export default function \w+\(.*\) \{)/, `$1\n  const { t } = useTranslation('${moduleName}');`);
    } else {
        content = content.replace(/const \{ t \} = useTranslation\((['"]\w+['"])?\);/, `const { t } = useTranslation('${moduleName}');`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Prepared ${filePath} for i18n.`);
}

processDir(baseDir);
console.log(`Finished preparing ${moduleName} for i18n.`);
