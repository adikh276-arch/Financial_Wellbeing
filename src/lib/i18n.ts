import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

const supportedLngs = [
  'en', 'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

i18n
  .use(resourcesToBackend((language: string, namespace: string) => {
    if (namespace === 'common') {
       return import(`../locales/${language}/common.json`).catch(() => ({}));
    }
    // Load module-specific translations dynamically
    return import(`../app/${namespace}/i18n/${language}.json`).catch(() => ({}));
  }))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: supportedLngs,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'path'],
      lookupQuerystring: 'lang',
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
