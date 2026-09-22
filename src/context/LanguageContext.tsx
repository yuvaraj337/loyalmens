import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, dynamicTextTranslations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('loyal_language') as Language;
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'kn')) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('loyal_language', lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    if (!key) return fallback || '';

    // 1. Direct translation key in current language
    const currentDict = translations[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }

    // 2. Check dynamic text translation mapping (for product/service titles & buttons)
    const dynDict = dynamicTextTranslations[language];
    if (dynDict && dynDict[key]) {
      return dynDict[key];
    }

    // 3. Fallback to English dict
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }

    // 4. Return fallback or key
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
