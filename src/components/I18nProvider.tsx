'use client';

import { useEffect, useState } from 'react';
import '../lib/i18n';
import { useTranslation } from 'react-i18next';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set text direction based on language
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null; // Avoid hydration mismatch for translations

  return <>{children}</>;
}
