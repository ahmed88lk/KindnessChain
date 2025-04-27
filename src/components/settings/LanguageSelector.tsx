import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { SupportedLanguage } from '../../services/translationService';
import { updateUserPreferences } from '../../services/authService';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onChange: (language: SupportedLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (language: SupportedLanguage) => {
    onChange(language);
    setIsOpen(false);
    // Mettre à jour les préférences utilisateur
    updateUserPreferences({ language });
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full rounded-md px-2 py-1 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-100"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4 mr-1" />
        <span className="mr-1">{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code as SupportedLanguage)}
                className={`${
                  currentLanguage === language.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                role="menuitem"
              >
                <span className="mr-2">{language.flag}</span>
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
