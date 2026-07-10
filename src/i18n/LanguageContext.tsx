import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { defaultLanguage, LanguageCode } from './languages';
import { Dictionary, translations } from './translations';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'tibetan-scripts-language';

function readStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return defaultLanguage;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in translations) return stored as LanguageCode;
  return defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(readStoredLanguage);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
