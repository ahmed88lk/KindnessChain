/**
 * Simple utility to test if the Gemini API key is working
 */

export async function testGeminiApi(): Promise<{success: boolean; message: string}> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        message: "API key is missing. Please check your .env file."
      };
    }
    
    // Make a simple request to Gemini API
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        message: `API returned error: ${response.status} - ${errorText}`
      };
    }
    
    const data = await response.json();
    
    if (data && data.models && data.models.length > 0) {
      return {
        success: true,
        message: `API is working. Available models: ${data.models.length}`
      };
    } else {
      return {
        success: false,
        message: "API returned unexpected data format"
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error testing API: ${error?.message || "Unknown error"}`
    };
  }
}
