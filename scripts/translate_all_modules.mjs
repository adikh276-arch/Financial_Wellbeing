import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = path.join(__dirname, '../src/app');
const modules = fs.readdirSync(modulesDir).filter(f => fs.statSync(path.join(modulesDir, f)).isDirectory());

console.log(`Found ${modules.length} modules to check.`);

// Always do 'shared' first for common translations
modules.unshift('shared');

for (const moduleName of modules) {
    if (moduleName === 'api') continue;
    
    console.log(`\n--- Translating module: ${moduleName} ---`);
    try {
        execSync(`node scripts/i18n-module.mjs ${moduleName} translate`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to translate ${moduleName}:`, e.message);
    }
}

console.log('\nAll Financial Wellness modules processed.');
