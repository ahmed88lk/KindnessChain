import React, { useState } from 'react';
import { testGeminiApi } from '../../services/apiTest';

// A very simple component that should render without errors
const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [apiTestResult, setApiTestResult] = useState<{success: boolean; message: string} | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);
  
  const handleApiTest = async () => {
    setIsTestingApi(true);
    setApiTestResult(null);
    
    try {
      const result = await testGeminiApi();
      setApiTestResult(result);
    } catch (error: any) {
      setApiTestResult({
        success: false,
        message: `Unexpected error: ${error?.message || "Unknown error"}`
      });
    } finally {
      setIsTestingApi(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-teal-700">Test Component</h2>
      <p className="mb-4">If you can see this, basic React rendering is working correctly.</p>
      
      <div className="flex items-center justify-between">
        <button 
          className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          onClick={() => setCount(c => c + 1)}
        >
          Increment
        </button>
        <span className="font-bold text-lg">{count}</span>
        <button 
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
      
      <div className="mt-6 p-3 bg-gray-50 rounded">
        <h3 className="text-sm font-medium mb-2">Environment Info:</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>React is working ✅</li>
          <li>State management is working ✅</li>
          <li>Tailwind CSS is working ✅</li>
        </ul>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-medium mb-2">API Connection Test:</h3>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          onClick={handleApiTest}
          disabled={isTestingApi}
        >
          {isTestingApi ? 'Testing API...' : 'Test Gemini API Connection'}
        </button>
        
        {apiTestResult && (
          <div className={`mt-3 p-3 rounded ${apiTestResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="text-sm">
              <span className="font-bold">{apiTestResult.success ? 'Success: ' : 'Error: '}</span>
              {apiTestResult.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestComponent;
