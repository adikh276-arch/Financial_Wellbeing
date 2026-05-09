import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

const loadResource = async (language: string, namespace: string) => {
  // Common strings fallback or initial load
  if (namespace === 'common') {
    try {
      // Mapping old 'zh' to 'zh-Hans' if needed
      const lang = language === 'zh' ? 'zh-Hans' : language;
      return await import(`../locales/${lang}/common.json`);
    } catch (e) {
      console.warn(`Common translations not found for ${language}`);
      return {};
    }
  }
  
  // Module-specific translations
  try {
    return await import(`../app/${namespace}/i18n/${language}.json`);
  } catch (e) {
    console.warn(`Translations not found for module: ${namespace}, language: ${language}`);
    return {};
  }
};

const supportedLngs = [
  'en', 'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

i18n
  .use(resourcesToBackend((language: string, namespace: string) => loadResource(language, namespace)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs,
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
