import React, { useState } from 'react';
import { Heart, Menu, X, Globe, Award, BarChart2, Users, Search, LogIn, LogOut, UserPlus } from 'lucide-react';
import { mockUser } from '../../data/mockData';
import { AuthUser, logout } from '../../services/authService';
import { SupportedLanguage, getTranslation } from '../../services/translationService';
import LanguageSelector from '../settings/LanguageSelector';
import Button from '../ui/Button';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: AuthUser | null;
  setIsLoginOpen: (isOpen: boolean) => void;
  setIsRegisterOpen: (isOpen: boolean) => void;
  language: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setIsLoginOpen, 
  setIsRegisterOpen,
  language,
  onLanguageChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigation = [
    { name: getTranslation('feed', language), icon: Heart, id: 'feed' },
    { name: getTranslation('map', language), icon: Globe, id: 'map' },
    { name: getTranslation('challenges', language), icon: Award, id: 'challenges' },
    { name: getTranslation('community', language), icon: Users, id: 'community' },
    { name: getTranslation('impact', language), icon: BarChart2, id: 'impact' },
  ];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                {getTranslation('app_name', language)}
              </span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === item.id
                      ? 'border-teal-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={language === 'ar' ? "ابحث عن أعمال اللطف..." : "Rechercher des actes de gentillesse..."}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            <LanguageSelector currentLanguage={language} onChange={onLanguageChange} />
            
            {currentUser ? (
              <div className="ml-4 flex items-center">
                <div className="flex items-center bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  <span className="mr-1.5">🔥</span>
                  <span>{language === 'ar' ? `سلسلة: ${currentUser.kindnessStreak} يوم` : `Streak: ${currentUser.kindnessStreak} jours`}</span>
                </div>
                <div className="ml-3 flex items-center bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  <span className="mr-1.5">💰</span>
                  <span>{currentUser.kindnessCoins} {language === 'ar' ? "عملات" : "pièces"}</span>
                </div>
                <div className="ml-3 relative">
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser.avatar}
                      alt="User avatar"
                    />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          {getTranslation('logout', language)}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  {getTranslation('login', language)}
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  {getTranslation('register', language)}
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  activeTab === item.id
                    ? 'bg-teal-50 border-teal-500 text-teal-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </div>
              </button>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={currentUser.avatar}
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {currentUser.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {currentUser.acts} {language === 'ar' ? "عمل من أعمال اللطف" : "actes de gentillesse"}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <div className="flex justify-between px-2">
                    <div className="flex items-center bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      <span className="mr-1.5">🔥</span>
                      <span>{language === 'ar' ? `سلسلة: ${currentUser.kindnessStreak}` : `Streak: ${currentUser.kindnessStreak}`}</span>
                    </div>
                    <div className="flex items-center bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      <span className="mr-1.5">💰</span>
                      <span>{currentUser.kindnessCoins}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    {getTranslation('logout', language)}
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginOpen(true);
                  }}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  {getTranslation('login', language)}
                </Button>
                
                <Button 
                  variant="primary" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsRegisterOpen(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  {getTranslation('register', language)}
                </Button>
                
                <div className="pt-2 flex justify-center">
                  <LanguageSelector currentLanguage={language} onChange={onLanguageChange} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;