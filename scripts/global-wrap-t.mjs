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

    // 1. JSX Props: title="..." subtitle="..." label="..." description="..."
    content = content.replace(/(title|subtitle|description|label)=\s*(['"])([\s\S]*?)\2/g, (match, prop, quote, val) => {
        if (val.startsWith('t(') || val.startsWith('{t(')) return match;
        if (val.startsWith('/') || (val.includes('_') && !val.includes(' '))) return match;
        changed = true;
        return `${prop}={t('${escapeStr(val)}')}`;
    });

    // 2. Object keys: text: '...' label: '...' etc.
    const translatableKeys = ['text', 'label', 'description', 'advice', 'heading', 'introduction', 'category', 'title', 'subtitle', 'tip', 'desc', 'val', 'actions'];
    translatableKeys.forEach(key => {
        const regex = new RegExp(`(^|\\s|{)(${key}):\\s*(['"])(?:(?=(\\\\?))\\2.)*?\\3`, 'g');
        content = content.replace(regex, (match, prefix, pKey, quote) => {
            const pValWithQuotes = match.slice(prefix.length + pKey.length + 1).trim();
            const pVal = pValWithQuotes.slice(1, -1);
            
            // Check if it's already wrapped in t()
            if (pVal.startsWith('t(') || prefix.includes('t(')) return match;
            if (pVal.startsWith('/') || pVal.startsWith('#') || (pVal.includes('_') && !pVal.includes(' '))) return match;
            changed = true;
            return `${prefix}${pKey}: t('${escapeStr(pVal)}')`;
        });
    });

    // 3. Arrays: key: ['...', '...'] or key={['...', '...']}
    const arrayKeys = ['options', 'strengths', 'challenges', 'recommendations', 'keyTakeaways', 'actions', 'content', 'items'];
    arrayKeys.forEach(key => {
        const regex = new RegExp(`(${key})\\s*(?::|=)\\s*({?\\s*\\[)([\\s\\S]*?)(\\]\\s*}?)`, 'g');
        content = content.replace(regex, (match, pKey, pStart, pArray, pEnd) => {
            // Improved regex to handle escaped quotes inside strings
            const fixedArray = pArray.replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, (m, quote, offset) => {
                const str = m.slice(1, -1);
                // Check if this specific match is preceded by t(
                const before = pArray.slice(Math.max(0, offset - 3), offset);
                if (str.startsWith('t(') || before.includes('t(')) return m;
                if (str.length < 2 || str.startsWith('/') || str.startsWith('#') || str.includes('var(') || (str.includes('_') && !str.includes(' '))) return m;
                changed = true;
                return `t('${escapeStr(str)}')`;
            });
            const separator = match.includes('=') ? '=' : ':';
            return `${pKey}${separator}${pStart}${fixedArray}${pEnd}`;
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
            walk(fullPath);
        } else if (file.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

walk(rootDir);
console.log("Global wrap complete.");
