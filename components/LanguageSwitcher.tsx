'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ar';

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Return focus to button
        const button = document.getElementById('language-switcher-button');
        if (button) {
          (button as HTMLButtonElement).focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: 'en' | 'ar') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative" dir="ltr">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800/70 hover:bg-gray-800 text-white hover:text-white transition-all duration-200 border border-white/20 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-[#FFDD00] focus-visible:outline-offset-2"
        aria-label={`Change language. Current language: ${currentLanguage.label}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        id="language-switcher-button"
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-xs font-semibold uppercase tracking-wide">{currentLanguage.code}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          role="menu"
          aria-labelledby="language-switcher-button"
          className={`absolute top-full mt-2 bg-gray-900 border border-white/30 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px] ${
            isRTL ? 'left-0' : 'right-0'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="menuitem"
              onClick={() => handleLanguageChange(lang.code as 'en' | 'ar')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#FFDD00] focus-visible:outline-offset-2 focus-visible:bg-gray-800 ${
                language === lang.code
                  ? 'bg-[#FFDD00]/20 text-[#FFDD00]'
                  : 'text-white hover:text-white'
              }`}
              aria-label={`Switch to ${lang.label}`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
              {language === lang.code && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-auto"
                >
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

