import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const learnDir = path.join(__dirname, '../src/app/learn');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix double-escaped single quotes: \\' -> \'
    // Also fix triple escapes if any: \\\' -> \'
    const newContent = content.replace(/\\+[']/g, "\\'");
    
    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Sanitized ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file === 'page.tsx') {
            processFile(fullPath);
        }
    }
}

walk(learnDir);
console.log("Sanitization complete.");
