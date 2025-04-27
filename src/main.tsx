import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/errorhandling/ErrorBoundary';

// Add better error logging
console.log("Application starting...");

// Get the root element
const rootElement = document.getElementById('root');

// Make sure root element exists
if (!rootElement) {
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element not found!</div>';
  throw new Error('Root element not found');
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary fallback={
        <div className="p-4 m-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <h2 className="text-lg font-bold mb-2">Application Error</h2>
          <p>Something went wrong while loading the application.</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      }>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
  console.log("React app mounted successfully");
} catch (error) {
  console.error("Failed to render React application:", error);
  // Affiche l'erreur complète dans la page
  document.body.innerHTML = `
    <div style="max-width: 600px; margin: 50px auto; padding: 20px; background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; font-family: Arial, sans-serif;">
      <h1 style="color: #b91c1c; font-size: 24px; margin-bottom: 16px;">Application Error</h1>
      <p>The application failed to initialize. Please try refreshing the page.</p>
      <pre style="background: #fff; padding: 10px; margin-top: 16px; overflow: auto; font-size: 12px; color: #b91c1c;">${error?.stack || error?.toString()}</pre>
      <button style="background: #b91c1c; color: white; border: none; padding: 8px 16px; margin-top: 16px; cursor: pointer; border-radius: 4px;" onclick="window.location.reload()">Refresh Page</button>
    </div>
  `;
}
