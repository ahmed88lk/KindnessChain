import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';
import KindnessAssistant from '../ai/KindnessAssistant';
import AddKindnessActForm from '../acts/AddKindnessActForm';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import { getCurrentUser, AuthUser, isAdmin } from '../../services/authService';
import { SupportedLanguage, getTranslation } from '../../services/translationService';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  language?: SupportedLanguage;
  onLanguageChange?: (language: SupportedLanguage) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeTab: parentActiveTab, 
  setActiveTab: parentSetActiveTab,
  language: parentLanguage = 'en',
  onLanguageChange: parentOnLanguageChange 
}) => {
  const [localActiveTab, setLocalActiveTab] = useState('feed');
  const [isAddActOpen, setIsAddActOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>(parentLanguage);
  
  // Use parent state if provided, otherwise use local state
  const activeTab = parentActiveTab !== undefined ? parentActiveTab : localActiveTab;
  const setActiveTab = parentSetActiveTab || setLocalActiveTab;
  const onLanguageChange = parentOnLanguageChange || setLanguage;

  // Check if user is already logged in on mount
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user?.language) {
      setLanguage(user.language);
      if (parentOnLanguageChange) {
        parentOnLanguageChange(user.language);
      }
    }
  }, [parentOnLanguageChange]);

  // Vérifier si l'utilisateur est administrateur
  const userIsAdmin = currentUser ? isAdmin() : false;

  const handleAddKindness = () => {
    if (currentUser) {
      setIsAddActOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleActSubmit = (act: any) => {
    // Here we would normally send the act to an API
    console.log('New kindness act:', act);
    
    // Close the form
    setIsAddActOpen(false);
    
    // Show a success message or redirect
    alert("Your act of kindness has been shared successfully!");
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
    if (user.language) {
      setLanguage(user.language);
      if (parentOnLanguageChange) {
        parentOnLanguageChange(user.language);
      }
    }
  };

  const handleRegisterSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setIsRegisterOpen(false);
    if (user.language) {
      setLanguage(user.language);
      if (parentOnLanguageChange) {
        parentOnLanguageChange(user.language);
      }
    }
  };

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    if (parentOnLanguageChange) {
      parentOnLanguageChange(newLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        language={language}
        onLanguageChange={handleLanguageChange}
        isAdmin={userIsAdmin}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isAddActOpen ? (
          <AddKindnessActForm onSubmit={handleActSubmit} onCancel={() => setIsAddActOpen(false)} language={language} />
        ) : isLoginOpen ? (
          <LoginForm 
            onSuccess={handleLoginSuccess} 
            onRegisterClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }} 
            language={language}
          />
        ) : isRegisterOpen ? (
          <RegisterForm 
            onSuccess={handleRegisterSuccess} 
            onLoginClick={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }} 
            language={language}
          />
        ) : (
          children
        )}
      </main>
      
      <div className="fixed bottom-8 right-8">
        <Button
          variant="primary"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
          aria-label={getTranslation('add_act', language)}
          onClick={handleAddKindness}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      
      <KindnessAssistant language={language} />
    </div>
  );
};

export default MainLayout;