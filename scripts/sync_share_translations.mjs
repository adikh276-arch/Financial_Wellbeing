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

const languages = [
  'ar', 'bn', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'he', 'hi', 'hu', 
  'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 
  'ta', 'te', 'th', 'tl', 'tr', 'uk', 'ur', 'vi', 'zh-Hans', 'zh-Hant'
];

async function translateBatch(texts, targetLang) {
    if (texts.length === 0) return [];
    try {
        const googleLang = targetLang === 'zh-Hans' ? 'zh-CN' : 
                          targetLang === 'zh-Hant' ? 'zh-TW' : 
                          targetLang === 'tl' ? 'tl' : targetLang;

        const response = await axios({
            url: ENDPOINT,
            method: 'post',
            params: { key: API_KEY },
            data: {
                q: texts,
                target: googleLang,
                format: 'text'
            }
        });
        return response.data.data.translations.map(res => res.translatedText);
    } catch (error) {
        console.error(`Error translating to ${targetLang}:`, error.response?.data || error.message);
        return null;
    }
}

async function run() {
    const enPath = path.join(__dirname, '../src/locales/en/share.json');
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const keys = Object.keys(enContent);
    const values = Object.values(enContent);

    for (const lang of languages) {
        const langDir = path.join(__dirname, `../src/locales/${lang}`);
        if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
        
        const langPath = path.join(langDir, 'share.json');
        
        console.log(`Translating share.json to ${lang}...`);
        const translated = await translateBatch(values, lang);
        
        if (translated) {
            const result = {};
            keys.forEach((key, i) => {
                result[key] = translated[i];
            });
            fs.writeFileSync(langPath, JSON.stringify(result, null, 2));
        }
        
        // Delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

run();
