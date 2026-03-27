import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import '../styles/language-switcher.css';

interface LanguageOption {
  code: 'en' | 'hi' | 'mr';
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    label: 'EN',
    nativeLabel: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'hi',
    label: 'HI',
    nativeLabel: 'हिन्दी',
    flag: '🇮🇳',
  },
  {
    code: 'mr',
    label: 'MR',
    nativeLabel: 'मराठी',
    flag: '🇮🇳',
  },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLangOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [isOpen]);

  const handleLanguageSelect = (code: 'en' | 'hi' | 'mr') => {
    setLanguage(code);
    // Language is automatically saved to localStorage by the LanguageContext
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        ref={buttonRef}
        className="lang-btn"
        id="langToggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle language menu"
        aria-expanded={isOpen}
        title="Change Language"
      >
        <Globe className="h-5 w-5" />
        <span id="currentLang">{currentLangOption?.label || 'EN'}</span>
        <svg
          className={`lang-chevron ${isOpen ? 'open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="lang-dropdown"
          id="langDropdown"
          role="menu"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              className={`lang-option ${
                language === option.code ? 'active' : ''
              }`}
              data-lang={option.code}
              data-label={option.label}
              onClick={() => handleLanguageSelect(option.code)}
              role="menuitem"
            >
              <span className="lang-flag">{option.flag}</span>
              <span className="lang-text">
                <span className="lang-name">{option.nativeLabel}</span>
                <span className="lang-code">{option.label}</span>
              </span>
              {language === option.code && (
                <span className="lang-checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
