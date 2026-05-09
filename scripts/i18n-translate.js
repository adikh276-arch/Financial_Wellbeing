const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION || 'eastus';
const AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

// List of all supported languages
const languages = [
  'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

const targetModule = process.argv[2];

if (!targetModule) {
  console.error('Please provide a module name. Example: budget-planner');
  process.exit(1);
}

const modulePath = path.join('src/app', targetModule);
const i18nDir = path.join(modulePath, 'i18n');
const enFile = path.join(i18nDir, 'en.json');

if (!fs.existsSync(enFile)) {
  console.error(`en.json not found in ${i18nDir}. Run extraction first.`);
  process.exit(1);
}

const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

async function translate() {
  console.log(`Starting translation for ${targetModule}...`);
  
  const keys = Object.keys(enData);
  const values = Object.values(enData);
  
  if (keys.length === 0) {
    console.log('No keys to translate.');
    return;
  }

  for (const lang of languages) {
    const outFile = path.join(i18nDir, `${lang}.json`);
    
    // Resume/restart: Check if file already exists and has all keys
    if (fs.existsSync(outFile)) {
      const existingData = JSON.parse(fs.readFileSync(outFile, 'utf8'));
      if (Object.keys(existingData).length === keys.length) {
        console.log(`Skipping ${lang}, already translated.`);
        continue;
      }
    }

    console.log(`Translating to ${lang}...`);
    
    let targetLang = lang;
    if (lang === 'tl') targetLang = 'fil';

    try {
      const translations = {};
      const chunkSize = 50; // Azure recommends batching
      
      for (let i = 0; i < values.length; i += chunkSize) {
        const chunk = values.slice(i, i + chunkSize);
        
        const response = await axios({
          url: AZURE_ENDPOINT + `&to=${targetLang}`,
          method: 'post',
          headers: {
            'Ocp-Apim-Subscription-Key': AZURE_KEY,
            'Ocp-Apim-Subscription-Region': AZURE_REGION,
            'Content-type': 'application/json',
          },
          data: chunk.map((text, idx) => ({ text: text || keys[i + idx] })),
        });
        
        response.data.forEach((res, index) => {
          translations[keys[i + index]] = res.translations[0].text;
        });
      }
      
      fs.writeFileSync(outFile, JSON.stringify(translations, null, 2), 'utf8');
      console.log(`✓ ${lang} complete.`);
    } catch (error) {
      console.error(`✗ Error translating to ${lang}:`, error.response?.data || error.message);
      // Optional: stop if hit rate limit or major error
      if (error.response?.status === 429) {
          console.error('Rate limit reached. Stopping.');
          break;
      }
    }
  }
  
  console.log('Done.');
}

translate();
