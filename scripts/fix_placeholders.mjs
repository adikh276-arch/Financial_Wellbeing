import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.GOOGLE_TRANSLATOR_KEY;
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

const supportedLngs = [
  'es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

async function translateStrings(strings, targetLang) {
    const entries = Object.entries(strings);
    if (entries.length === 0) return {};

    const googleLang = targetLang === 'zh-Hans' ? 'zh-CN' : 
                      targetLang === 'zh-Hant' ? 'zh-TW' : 
                      targetLang === 'tl' ? 'tl' : targetLang;

    const batch = entries.map(([key, val]) => val);
    const protectedBatch = batch.map(s => s.replace(/\{\{(.*?)\}\}/g, '<span class="notranslate">{{$1}}</span>'));

    try {
        const response = await axios({
            url: ENDPOINT,
            method: 'post',
            params: { key: API_KEY },
            data: {
                q: protectedBatch,
                target: googleLang,
                format: 'html'
            }
        });

        const translated = {};
        const translations = response.data.data.translations;
        entries.forEach((entry, index) => {
            const key = entry[0];
            translated[key] = translations[index].translatedText.replace(/<span class="notranslate">(.*?)<\/span>/g, '$1');
        });
        return translated;
    } catch (err) {
        console.error(`Failed to translate to ${targetLang}`, err.response?.data || err.message);
        return null;
    }
}

async function fixModule(moduleDir) {
    const enPath = path.join(moduleDir, 'en.json');
    if (!fs.existsSync(enPath)) return;
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    for (const lang of supportedLngs) {
        const langPath = path.join(moduleDir, `${lang}.json`);
        if (!fs.existsSync(langPath)) continue;

        const langContent = JSON.parse(fs.readFileSync(langPath, 'utf8'));
        const brokenStrings = {};
        
        for (const [key, val] of Object.entries(langContent)) {
            // If the original has {{...}} but the translated one has something different inside {{...}}
            const origMatch = key.match(/\{\{(.*?)\}\}/g);
            if (origMatch) {
                const langMatch = val.match(/\{\{(.*?)\}\}/g);
                if (!langMatch || langMatch.length !== origMatch.length || langMatch.some((m, i) => m !== origMatch[i])) {
                    brokenStrings[key] = key; // Re-translate using original key (value in en.json)
                }
            }
        }

        if (Object.keys(brokenStrings).length > 0) {
            console.log(`Fixing ${Object.keys(brokenStrings).length} broken placeholders in ${langPath}...`);
            const fixed = await translateStrings(brokenStrings, lang);
            if (fixed) {
                const final = { ...langContent, ...fixed };
                fs.writeFileSync(langPath, JSON.stringify(final, null, 2));
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

async function run() {
    const baseDir = path.join(__dirname, '../src/app');
    const modules = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
    
    for (const mod of modules) {
        const i18nDir = path.join(baseDir, mod, 'i18n');
        if (fs.existsSync(i18nDir)) {
            console.log(`Checking module: ${mod}`);
            await fixModule(i18nDir);
        }
    }

    // Also check shared/locales
    console.log(`Checking shared locales...`);
    const localesDir = path.join(__dirname, '../src/locales');
    const enCommonPath = path.join(localesDir, 'en/common.json');
    if (fs.existsSync(enCommonPath)) {
        const enCommon = JSON.parse(fs.readFileSync(enCommonPath, 'utf8'));
        for (const lang of supportedLngs) {
            const langCommonPath = path.join(localesDir, lang, 'common.json');
            if (!fs.existsSync(langCommonPath)) continue;
            
            const langCommon = JSON.parse(fs.readFileSync(langCommonPath, 'utf8'));
            const brokenStrings = {};
            for (const [key, val] of Object.entries(langCommon)) {
                const origMatch = key.match(/\{\{(.*?)\}\}/g);
                if (origMatch) {
                    const langMatch = val.match(/\{\{(.*?)\}\}/g);
                    if (!langMatch || langMatch.length !== origMatch.length || langMatch.some((m, i) => m !== origMatch[i])) {
                        brokenStrings[key] = key;
                    }
                }
            }
            if (Object.keys(brokenStrings).length > 0) {
                console.log(`Fixing ${Object.keys(brokenStrings).length} broken placeholders in ${langCommonPath}...`);
                const fixed = await translateStrings(brokenStrings, lang);
                if (fixed) {
                    const final = { ...langCommon, ...fixed };
                    fs.writeFileSync(langCommonPath, JSON.stringify(final, null, 2));
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
}

run();
