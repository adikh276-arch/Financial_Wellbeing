import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supportedLngs = [
  'en', 'es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

const trashPatterns = [
    /useState/i,
    /const\s*\[/,
    /=>/,
    /\}\);/,
    /return\s*\(/,
    /useEffect/,
    /&&/,
    /Math\./,
    /\|\?/,
    /\.length/,
    /^a$/,
    /^T$/,
    /^s\./,
    /const\s*/,
    /set[A-Z]/,
    /\)\?\.label/,
    /\[\]/
];

function isTrash(key) {
    return trashPatterns.some(p => p.test(key));
}

async function purgeDir(dir, fileName) {
    if (!fs.existsSync(dir)) return;
    
    for (const lang of supportedLngs) {
        const filePath = fileName 
            ? path.join(dir, lang, fileName)
            : path.join(dir, `${lang}.json`);
            
        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const cleanContent = {};
            let count = 0;
            for (const [key, val] of Object.entries(content)) {
                if (!isTrash(key)) {
                    cleanContent[key] = val;
                } else {
                    count++;
                }
            }
            if (count > 0) {
                console.log(`Purged ${count} trash keys from ${filePath}`);
                fs.writeFileSync(filePath, JSON.stringify(cleanContent, null, 2));
            }
        }
    }
}

async function run() {
    // 1. Purge shared locales
    const localesDir = path.join(__dirname, '../src/locales');
    await purgeDir(localesDir, 'common.json');

    // 2. Purge module locales
    const baseDir = path.join(__dirname, '../src/app');
    const modules = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
    for (const mod of modules) {
        const i18nDir = path.join(baseDir, mod, 'i18n');
        if (fs.existsSync(i18nDir)) {
            await purgeDir(i18nDir);
        }
    }
}

run();
