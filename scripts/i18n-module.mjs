import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import axios from 'axios';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION || 'eastus';

const supportedLngs = [
  'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

const moduleName = process.argv[2];
const action = process.argv[3]; // 'extract' | 'translate'

if (!moduleName) {
  console.error('Usage: node scripts/i18n-module.mjs <module-name> [extract|translate]');
  process.exit(1);
}

const isShared = moduleName === 'shared';
const modulePath = path.join(__dirname, `../src/app/${moduleName}`);

if (!isShared && !fs.existsSync(modulePath)) {
  console.error(`Module path does not exist: ${modulePath}`);
  process.exit(1);
}

const i18nDir = isShared
  ? path.join(__dirname, '../src/locales')
  : path.join(modulePath, 'i18n');

if (!fs.existsSync(i18nDir)) {
  fs.mkdirSync(i18nDir, { recursive: true });
}

if (action === 'extract' || !action) {
  console.log(`Extracting strings for module: ${moduleName}`);
  const configPath = path.join(__dirname, `../i18next-parser.config.mjs`);
  const config = `
export default {
  locales: ['en'],
  output: '${i18nDir.replace(/\\/g, '/')}/$LOCALE.json',
  input: [
    '${(isShared ? 'src/components' : `src/app/${moduleName}`).replace(/\\/g, '/')}/**/*.{ts,tsx}',
    ${!isShared ? `'src/components/${moduleName}/**/*.{ts,tsx}'` : ''}
  ],
  sort: true,
  useKeysAsDefaultValue: true,
  keySeparator: false,
  nsSeparator: false,
};
`;
  fs.writeFileSync(configPath, config);
  try {
    execSync(`npx i18next-parser --config i18next-parser.config.mjs`, { stdio: 'inherit' });
  } finally {
    // fs.unlinkSync(configPath);
  }
}

async function translateStrings(strings, targetLang) {
  const endpoint = "https://api.cognitive.microsofttranslator.com";
  const entries = Object.entries(strings);
  if (entries.length === 0) return {};

  if (!AZURE_TRANSLATOR_KEY) {
      console.warn("WARNING: AZURE_TRANSLATOR_KEY not found. Skipping real translation.");
      const mock = {};
      for (const [key, val] of entries) {
          mock[key] = `[${targetLang}] ${val}`;
      }
      return mock;
  }

  const translated = {};
  const chunks = [];
  for (let i = 0; i < entries.length; i += 100) {
    chunks.push(entries.slice(i, i + 100));
  }

  for (const chunk of chunks) {
    const data = chunk.map(([key, val]) => ({ Text: val }));
    try {
      const azureLang = targetLang === 'tl' ? 'fil' : targetLang;
      const response = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION,
          'Content-type': 'application/json',
        },
        params: {
          'api-version': '3.0',
          from: 'en',
          to: azureLang
        },
        data: data,
        responseType: 'json'
      });

      const translations = response.data;
      chunk.forEach((entry, index) => {
        const key = entry[0];
        translated[key] = translations[index].translations[0].text;
      });
      // Delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`Failed to translate to ${targetLang}`, err.response?.data || err.message);
      throw err;
    }
  }
  return translated;
}

if (action === 'translate' || !action) {
  console.log(`Translating strings for module: ${moduleName}`);
  const enPath = isShared
    ? path.join(i18nDir, 'en/common.json')
    : path.join(i18nDir, 'en.json');
  if (!fs.existsSync(enPath)) {
    console.error(`No en.json found for module ${moduleName}. Run extract first.`);
    process.exit(1);
  }

  const enStrings = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  for (const lang of supportedLngs) {
    const langPath = isShared
      ? path.join(i18nDir, `${lang}/common.json`)
      : path.join(i18nDir, `${lang}.json`);
    
    if (isShared && !fs.existsSync(path.dirname(langPath))) {
        fs.mkdirSync(path.dirname(langPath), { recursive: true });
    }
    let currentStrings = {};
    if (fs.existsSync(langPath)) {
      currentStrings = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    }

    const missingStrings = {};
    for (const [key, val] of Object.entries(enStrings)) {
      if (!currentStrings[key]) {
        missingStrings[key] = val;
      }
    }

    const missingKeys = Object.keys(missingStrings);
    if (missingKeys.length > 0) {
      console.log(`Translating ${missingKeys.length} keys for ${lang}...`);
      try {
        const translatedStrings = await translateStrings(missingStrings, lang);
        const finalStrings = { ...currentStrings, ...translatedStrings };
        fs.writeFileSync(langPath, JSON.stringify(finalStrings, null, 2));
      } catch (err) {
        console.error(`Translation error, stopping for ${lang}`);
        break;
      }
    } else {
      console.log(`[${lang}] up to date.`);
    }
  }
}
