import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import KindnessFeed from '../components/feed/KindnessFeed';
import KindnessMap from '../components/map/KindnessMap';
import ChallengesGrid from '../components/challenges/ChallengesGrid';
import CommunityHub from '../components/community/CommunityHub';
import ImpactMetrics from '../components/dashboard/ImpactMetrics';
import KindnessSuggestions from '../components/ai/KindnessSuggestions';
import IslamicWisdomCard from '../components/wisdom/IslamicWisdomCard';
import HadithOnMercy from '../components/wisdom/HadithOnMercy';
import PeaceImageGenerator from '../components/ai/PeaceImageGenerator';
import { SupportedLanguage } from '../services/translationService';
import { getCurrentUser } from '../services/authService';
// Import our test component
import TestComponent from '../components/debug/TestComponent';

// Debug flag to show only the test component for troubleshooting
const SHOW_TEST_ONLY = false; // Set to true to show only the test component

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Get user language if logged in
  useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user?.language) {
        setLanguage(user.language);
      } else {
        // Default to English
        setLanguage('en');
      }
    } catch (error) {
      console.error("Error loading user preferences:", error);
      // Continue with default language
    }
  }, []);
  
  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };
  
  // If we're in test-only mode, render just the test component
  if (SHOW_TEST_ONLY) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">KindnessChain Debug Mode</h1>
        <TestComponent />
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
          <h2 className="font-bold text-yellow-800 mb-2">Debug Mode Active</h2>
          <p className="text-yellow-700 text-sm">
            The application is running in debug mode with minimal components to isolate errors. 
            To enable the full application, set <code className="bg-yellow-100 px-1 rounded">SHOW_TEST_ONLY</code> to 
            <code className="bg-yellow-100 px-1 rounded">false</code> in Dashboard.tsx.
          </p>
        </div>
      </div>
    );
  }
  
  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'feed':
          return (
            <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <HadithOnMercy language={language} />
              <IslamicWisdomCard language={language} />
              <PeaceImageGenerator language={language} />
              <KindnessSuggestions language={language} />
              <KindnessFeed />
            </div>
          );
        case 'map':
          return <KindnessMap />;
        case 'challenges':
          return <ChallengesGrid />;
        case 'community':
          return <CommunityHub />;
        case 'impact':
          return <ImpactMetrics />;
        default:
          return <KindnessFeed />;
      }
    } catch (error: any) {
      console.error("Error rendering content:", error);
      setLoadError(`Failed to load content: ${error?.message || 'Unknown error'}`);
      return (
        <div className="p-4 bg-red-50 border border-red-100 rounded-md">
          <h3 className="font-medium text-red-800">Error loading content</h3>
          <p className="text-red-600">Something went wrong while loading this section.</p>
          <button 
            className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
  };
  
  return (
    <MainLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      language={language}
      onLanguageChange={handleLanguageChange}
    >
      {loadError ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Content Load Error</h2>
          <p className="text-red-600 mb-4">{loadError}</p>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      ) : (
        renderContent()
      )}
    </MainLayout>
  );
};

export default Dashboard;