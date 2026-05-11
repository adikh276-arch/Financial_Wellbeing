import fs from 'fs';
import path from 'path';

const namespaces = ['common', 'learn', 'check-ins', 'budget-planner', 'investment-planner'];
const languages = [
  'ar', 'bn', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'he', 'hi', 'hu', 
  'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 
  'ta', 'te', 'th', 'tl', 'tr', 'uk', 'ur', 'vi', 'zh-Hans', 'zh-Hant'
];

function syncNamespace(ns) {
  let enPath;
  let baseDir;

  if (ns === 'common') {
    enPath = 'src/locales/en/common.json';
    baseDir = 'src/locales';
  } else if (ns === 'learn' || ns === 'check-ins') {
    enPath = `src/app/${ns}/i18n/en.json`;
    baseDir = `src/app/${ns}/i18n`;
  } else {
    // Other modules follow src/app/[ns]/i18n pattern
    enPath = `src/app/${ns}/i18n/en.json`;
    baseDir = `src/app/${ns}/i18n`;
  }

  if (!fs.existsSync(enPath)) {
    console.log(`Skipping ${ns} - English file not found at ${enPath}`);
    return;
  }

  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const enKeys = Object.keys(enContent);

  languages.forEach(lang => {
    let langPath;
    if (ns === 'common') {
      langPath = `src/locales/${lang}/common.json`;
    } else {
      langPath = `${baseDir}/${lang}.json`;
    }

    if (!fs.existsSync(langPath)) {
      // Create if missing
      console.log(`Creating missing file: ${langPath}`);
      fs.mkdirSync(path.dirname(langPath), { recursive: true });
      fs.writeFileSync(langPath, JSON.stringify(enContent, null, 2), 'utf8');
      return;
    }

    const langContent = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    let updated = false;

    enKeys.forEach(key => {
      if (!(key in langContent)) {
        langContent[key] = enContent[key];
        updated = true;
      }
    });

    if (updated) {
      console.log(`Updated ${langPath} with missing keys.`);
      fs.writeFileSync(langPath, JSON.stringify(langContent, null, 2), 'utf8');
    }
  });
}

namespaces.forEach(syncNamespace);
console.log('Sync complete!');
