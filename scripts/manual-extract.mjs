import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Usage: node scripts/manual-extract.mjs <module-name>');
  process.exit(1);
}

const isShared = moduleName === 'shared';

const baseDir = isShared 
  ? path.join(__dirname, '../src/components')
  : (moduleName === 'dashboard'
    ? path.join(__dirname, '../src/app')
    : path.join(__dirname, `../src/app/${moduleName}`));

const enPath = isShared
  ? path.join(__dirname, '../src/locales/en/common.json')
  : path.join(__dirname, `../src/app/${moduleName}/i18n/en.json`);

if (!fs.existsSync(path.dirname(enPath))) {
    fs.mkdirSync(path.dirname(enPath), { recursive: true });
}

let enStrings = {};
if (fs.existsSync(enPath)) {
    try {
        enStrings = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    } catch (e) {}
}

function extractFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const doubleRegex = /t\("((?:\\"|[^"])*)"\)/g;
    const singleRegex = /t\('((?:\\'|[^'])*)'\)/g;
    
    let match;
    while ((match = doubleRegex.exec(content)) !== null) {
        const val = match[1].replace(/\\"/g, '"');
        enStrings[val] = val;
    }
    while ((match = singleRegex.exec(content)) !== null) {
        const val = match[1].replace(/\\'/g, "'");
        enStrings[val] = val;
    }
}

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'i18n' || file === 'api' || file === 'locales') continue;
            processDir(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            if (moduleName === 'dashboard' && dir !== baseDir) continue;
            extractFromFile(fullPath);
        }
    }
}

processDir(baseDir);

if (!isShared) {
    const compDir = path.join(__dirname, `../src/components/${moduleName}`);
    if (fs.existsSync(compDir)) {
        processDir(compDir);
    }
}

fs.writeFileSync(enPath, JSON.stringify(enStrings, null, 2));
console.log(`Manually extracted strings for ${moduleName}. Total keys: ${Object.keys(enStrings).length}`);
