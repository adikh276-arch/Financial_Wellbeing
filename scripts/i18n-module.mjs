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

const modulePath = path.join(__dirname, `../src/app/${moduleName}`);

if (!fs.existsSync(modulePath)) {
  console.error(`Module path does not exist: ${modulePath}`);
  process.exit(1);
}

const i18nDir = path.join(modulePath, 'i18n');
if (!fs.existsSync(i18nDir)) {
  fs.mkdirSync(i18nDir, { recursive: true });
}

if (action === 'extract' || !action) {
  console.log(`Extracting strings for module: ${moduleName}`);
  
  const compDir = path.join(__dirname, `../src/components/${moduleName}`);
  const hasComp = fs.existsSync(compDir);
  const inputArr = [`'src/app/${moduleName}/**/*.{js,jsx,ts,tsx}'`];
  
  if (moduleName === 'dashboard') {
      inputArr.push(`'src/app/page.tsx'`);
  }
  
  if (hasComp) {
      inputArr.push(`'src/components/${moduleName}/**/*.{js,jsx,ts,tsx}'`);
  }

  const configContent = `
    module.exports = {
      locales: ['en'],
      output: 'src/app/${moduleName}/i18n/$LOCALE.json',
      input: [
        ${inputArr.join(',\n        ')}
      ],
      sort: true,
      createOldCatalogs: false,
      keySeparator: false,
      defaultValue: function(locale, namespace, key, value) {
        return value || key;
      },
      lexers: {
        ts: [{
          lexer: 'JavascriptLexer',
          functions: ['t', 'i18n.t']
        }],
        tsx: [{
          lexer: 'JsxLexer',
          functions: ['t', 'i18n.t']
        }],
        default: [{
          lexer: 'JavascriptLexer',
          functions: ['t', 'i18n.t']
        }]
      }
    };
  `;
  const configPath = path.join(__dirname, `../parser.config.${moduleName}.js`);
  fs.writeFileSync(configPath, configContent);
  
  try {
    execSync(`npx i18next-parser --config parser.config.${moduleName}.js`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('Extraction complete!');
  } finally {
    if (fs.existsSync(configPath)) {
      // fs.unlinkSync(configPath);
    }
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
    } catch (e) {
      console.error(`Failed to translate to ${targetLang}`, e.response?.data || e.message);
      throw e;
    }
  }

  return translated;
}

if (action === 'translate' || !action) {
  console.log(`Translating strings for module: ${moduleName}`);
  const enPath = path.join(i18nDir, 'en.json');
  if (!fs.existsSync(enPath)) {
    console.error(`No en.json found for module ${moduleName}. Run extract first.`);
    process.exit(1);
  }

  const enStrings = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  for (const lang of supportedLngs) {
    const langPath = path.join(i18nDir, `${lang}.json`);
    let currentStrings = {};
    if (fs.existsSync(langPath)) {
      currentStrings = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    }

    const missing = {};
    for (const [key, val] of Object.entries(enStrings)) {
      if (!currentStrings[key]) {
        missing[key] = val;
      }
    }

    if (Object.keys(missing).length > 0) {
      console.log(`Translating ${Object.keys(missing).length} keys for ${lang}...`);
      const newTranslations = await translateStrings(missing, lang).catch(e => {
          console.error("Translation error, stopping for " + lang);
          return {};
      });
      const merged = { ...currentStrings, ...newTranslations };
      fs.writeFileSync(langPath, JSON.stringify(merged, null, 2));
    } else {
      console.log(`[${lang}] up to date.`);
    }
  }
}
