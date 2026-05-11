import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../src/app');

function purgeCorruptedKeys(filePath) {
    let json;
    try {
        json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        return;
    }

    let changed = false;
    const cleanJson = {};

    for (const key in json) {
        const isCorrupted = key.includes("t('") || key.includes('t("') || key.includes("')") || key.includes('")') || key.includes("\\')") || key.startsWith(")");
        if (!isCorrupted) {
            cleanJson[key] = json[key];
        } else {
            console.log(`Purging: ${key}`);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(cleanJson, null, 2));
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.json') && fullPath.includes('i18n')) {
            purgeCorruptedKeys(fullPath);
        }
    }
}

walk(rootDir);
