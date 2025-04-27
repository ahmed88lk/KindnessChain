import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

// Simple error catcher component
const ErrorCatcher = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setErrorDetails(event.error?.toString() || 'Unknown error');
      setHasError(true);
      event.preventDefault();
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return (
      <div className="p-6 bg-red-100 border-2 border-red-400 rounded-lg max-w-3xl mx-auto my-8 text-red-800">
        <h2 className="text-2xl font-bold mb-4">Application Error</h2>
        <p className="mb-4">The application encountered an error while loading:</p>
        <div className="bg-white p-4 rounded overflow-auto max-h-40 mb-4">
          <pre className="text-red-600 whitespace-pre-wrap">{errorDetails}</pre>
        </div>
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
          <h3 className="font-bold text-yellow-800 mb-2">Common Solutions:</h3>
          <ul className="list-disc pl-5 space-y-1 text-yellow-800">
            <li>Check that your API key is correctly set in the .env file</li>
            <li>Make sure you're using Node.js version 18.14.0 or higher</li>
            <li>Try clearing your browser cache</li>
            <li>Restart the development server</li>
          </ul>
        </div>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
};

// Very simplified App component
const App: React.FC = () => {
  const [phase, setPhase] = useState<'testing-api-key' | 'ready' | 'error'>('testing-api-key');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Test if the API key is configured
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      setErrorMessage('Missing Gemini API key. Please check your .env file.');
      setPhase('error');
      return;
    }
    
    // Very basic validation of the API key format
    if (apiKey.length < 20) {
      setErrorMessage('The Gemini API key appears to be invalid (too short).');
      setPhase('error');
      return;
    }
    
    console.log("API key validation passed");
    setPhase('ready');
  }, []);
  
  // Display loading state
  if (phase === 'testing-api-key') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing KindnessChain...</p>
          <p className="text-sm text-gray-500">Checking API configuration...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (phase === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 rounded-md p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-3">Configuration Error</h2>
          <p className="mb-4">{errorMessage}</p>
          <div className="bg-white p-3 rounded mb-4">
            <h3 className="font-medium text-gray-800 mb-2">VITE_GEMINI_API_KEY Issues:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Make sure the .env file exists in the project root</li>
              <li>The API key should be in format: VITE_GEMINI_API_KEY=YourAPIKeyHere</li>
              <li>No quotes or spaces should be used in the assignment</li>
            </ul>
          </div>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
  
  // Render the main app inside our error catcher
  return (
    <ErrorCatcher>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Dashboard />
      </div>
    </ErrorCatcher>
  );
};

export default App;