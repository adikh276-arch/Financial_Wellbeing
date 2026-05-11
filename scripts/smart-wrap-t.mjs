import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../src/app');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const escapeStr = (s) => s.replace(/\\'/g, "'").replace(/'/g, "\\'");

    // 1. PageHeader
    content = content.replace(/(title|subtitle|description)=\s*['"]((?:\\'|\\"|[^'"])*)['"]/g, (match, prop, val) => {
        if (match.includes('{t(')) return match;
        if (val.startsWith('/') || (val.includes('_') && !val.includes(' '))) return match;
        changed = true;
        return `${prop}={t('${escapeStr(val)}')}`;
    });

    // 2. Arrays of objects (QUESTIONS, TIPS, etc.)
    // We look for patterns like: text: "...", label: "...", description: "..."
    const translatableKeys = ['text', 'label', 'description', 'advice', 'heading', 'introduction', 'category', 'tip', 'val', 'strengths', 'challenges', 'recommendations', 'keyTakeaways', 'actions', 'content', 'items'];
    
    translatableKeys.forEach(key => {
        // Handle key: "..." or key: '...'
        const regex = new RegExp(`(${key}):\\s*(['"])([\\s\\S]*?)\\2`, 'g');
        content = content.replace(regex, (match, pKey, quote, pVal) => {
            if (pVal.startsWith('t(') || pVal.startsWith('{t(')) return match;
            if (pVal.startsWith('/') || pVal.startsWith('#') || (pVal.includes('_') && !pVal.includes(' '))) return match;
            if (pVal.length < 2) return match;
            changed = true;
            return `${pKey}: t('${escapeStr(pVal)}')`;
        });
    });

    // 3. Arrays of strings in specific properties
    const arrayKeys = ['options', 'strengths', 'challenges', 'recommendations', 'keyTakeaways', 'actions', 'content', 'items'];
    arrayKeys.forEach(key => {
        const regex = new RegExp(`(${key})\\s*(?::|=)\\s*\\[([\\s\\S]*?)\\]`, 'g');
        content = content.replace(regex, (match, pKey, pArray) => {
            const fixedArray = pArray.replace(/(['"])([\\s\\S]*?)\1/g, (m, quote, str) => {
                if (str.startsWith('t(')) return m;
                if (str.length < 2 || str.startsWith('/') || str.startsWith('#') || str.includes('var(') || (str.includes('_') && !str.includes(' '))) return m;
                changed = true;
                return `t('${escapeStr(str)}')`;
            });
            return `${pKey}${match.includes('=') ? '=' : ':'} [${fixedArray}]`;
        });
    });

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'i18n' || file === 'api') continue;
            walk(fullPath);
        } else if (file.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

walk(rootDir);
console.log("Smart wrap complete.");
