import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/language-selector.css';

interface LanguageSelectorProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  theme = 'dark',
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (lang: 'en' | 'hi' | 'kn') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`global-lang-selector theme-${theme} ${className}`}
      id="global-language-selector"
    >
      <button
        type="button"
        className={`global-lang-pill-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <Globe size={13} className="global-lang-globe" />
        <span className="global-lang-code">{language.toUpperCase()}</span>
        {isOpen ? (
          <ChevronUp size={11} className="global-lang-chevron" />
        ) : (
          <ChevronDown size={11} className="global-lang-chevron" />
        )}
      </button>

      {isOpen && (
        <div className="global-lang-dropdown" role="menu">
          <button
            type="button"
            className={`global-lang-option ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleSelect('en')}
            role="menuitem"
          >
            <span>English</span>
            {language === 'en' && <Check size={14} className="global-lang-check" />}
          </button>
          <button
            type="button"
            className={`global-lang-option ${language === 'hi' ? 'active' : ''}`}
            onClick={() => handleSelect('hi')}
            role="menuitem"
          >
            <span>हिन्दी</span>
            {language === 'hi' && <Check size={14} className="global-lang-check" />}
          </button>
          <button
            type="button"
            className={`global-lang-option ${language === 'kn' ? 'active' : ''}`}
            onClick={() => handleSelect('kn')}
            role="menuitem"
          >
            <span>ಕನ್ನಡ</span>
            {language === 'kn' && <Check size={14} className="global-lang-check" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
