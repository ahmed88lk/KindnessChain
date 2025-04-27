/**
 * Service for interacting with Google's Gemini AI API
 */
import { GoogleGenAI, Modality } from "@google/genai";
import { SupportedLanguage } from "./translationService";
import { evaluateContent } from './contentGuidelines';

// Correctly initialize the API with the key from environment variables
// Add error handling for the API key
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No Gemini API key found. Please set VITE_GEMINI_API_KEY in .env file");
    return "missing-api-key";
  }
  return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

// Helper function to generate full text from a streamed response
const streamToText = async (stream: AsyncIterable<any>): Promise<string> => {
  let fullText = '';
  try {
    for await (const chunk of stream) {
      fullText += chunk.text || '';
    }
    return fullText.trim();
  } catch (error) {
    console.error("Error in streamToText:", error);
    return "Error processing response";
  }
};

/**
 * Generates a kindness idea based on a prompt in English or Arabic
 */
export const generateKindnessIdea = async (
  userInput: string,
  language: SupportedLanguage = 'en'
): Promise<string> => {
  try {
    // First check content against guidelines
    const contentEvaluation = evaluateContent(userInput);
    if (!contentEvaluation.approved) {
      return contentEvaluation.response;
    }
    
    // Add guidance to prompt
    const guidedPrompt = `
      You are an AI assistant focusing on Islamic values and traditional principles.
      Please suggest acts of kindness based on traditional Islamic teachings.
      Focus on: family, community, charity, and natural roles as defined in Islamic teachings.
      Avoid promoting Western liberal ideologies.
      
      User query: ${userInput}
    `;
    
    const languageSpecifier = language === 'ar' ? "أجب باللغة العربية: " : "";
    const kindnessPrompt = `${languageSpecifier}${guidedPrompt}. Focus on peaceful, kind actions that promote harmony and understanding. Suggest practical ways to foster peace, help others, and create a more compassionate world. Ensure the content is uplifting and appropriate for all ages.`;

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: kindnessPrompt }] }],
    });

    const text = await streamToText(stream);
    return text;
  } catch (error) {
    console.error("Error generating kindness idea:", error);
    return language === 'ar'
      ? "حدث خطأ أثناء توليد فكرة. يرجى المحاولة مرة أخرى."
      : "An error occurred while generating an idea. Please try again.";
  }
};

/**
 * Analyzes the sentiment of a kindness act description
 */
export const analyzeKindnessSentiment = async (text: string): Promise<number> => {
  try {
    const sentimentPrompt = `Analyze the sentiment of this kindness act description and return a score between 0 and 100, where 0 is very negative and 100 is very positive. Only return the number. Text: "${text}"`;

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: sentimentPrompt }] }],
    });

    const scoreText = await streamToText(stream);
    const score = parseInt(scoreText, 10);

    return !isNaN(score) ? Math.min(Math.max(score, 0), 100) : 75;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 75; // Default positive sentiment if analysis fails
  }
};

/**
 * Gets suggested kindness acts in English or Arabic
 */
export const getSuggestedKindnessActs = async (language: SupportedLanguage = 'en'): Promise<string[]> => {
  try {
    const langSpecifier = language === 'ar' ? "in Arabic" : "in English";
    const suggestionsPrompt = `Generate 5 simple acts of kindness that promote peace and harmony between people, ${langSpecifier}. Format as a JSON array of strings. Each act should be brief (under 15 words) and start with a verb.`;

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: suggestionsPrompt }] }],
    });

    const text = await streamToText(stream);

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]) as string[];
      } catch (jsonError) {
        console.error('Error parsing JSON from Gemini response:', jsonError);
      }
    }

    // Fallback suggestions
    return language === 'ar' ? [
      "ساعد شخصًا مسنًا في حمل مشترياته البقالة",
      "تبرع بالطعام أو الملابس للأسر المحتاجة في مجتمعك",
      "اكتب رسالة شكر لشخص يقدم خدمات أساسية",
      "شارك مهاراتك أو معرفتك مجانًا مع شخص يحتاج إليها",
      "زرع شجرة أو نبات للمساعدة في حماية البيئة"
    ] : [
      "Listen attentively to someone with a different perspective",
      "Share a meal with someone from another culture or background",
      "Send a handwritten note of appreciation to a peacemaker in your community",
      "Teach children about respecting different cultures and beliefs",
      "Create art that celebrates diversity and peaceful coexistence"
    ];
  } catch (error) {
    console.error('Error getting kindness suggestions:', error);
    return language === 'ar' ? [
      "ساعد شخصًا مسنًا في حمل مشترياته البقالة",
      "تبرع بالطعام أو الملابس للأسر المحتاجة في مجتمعك",
      "اكتب رسالة شكر لشخص يقدم خدمات أساسية",
      "شارك مهاراتك أو معرفتك مجانًا مع شخص يحتاج إليها",
      "زرع شجرة أو نبات للمساعدة في حماية البيئة"
    ] : [
      "Listen attentively to someone with a different perspective",
      "Share a meal with someone from another culture or background",
      "Send a handwritten note of appreciation to a peacemaker in your community",
      "Teach children about respecting different cultures and beliefs",
      "Create art that celebrates diversity and peaceful coexistence"
    ];
  }
};

/**
 * Generate peace-themed images
 */
export const generatePeaceImage = async (prompt: string, language: SupportedLanguage = 'en'): Promise<string | null> => {
  try {
    const langPrompt = language === 'ar' ? 
      `قم بإنشاء صورة سلمية وملهمة حول: ${prompt}. اجعلها مناسبة لتعزيز الوئام والتفاهم بين الناس.` :
      `Create a peaceful and inspiring image about: ${prompt}. Make it suitable for promoting harmony, understanding, and compassion between people.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [{ role: "user", parts: [{ text: langPrompt }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Extract base64 image data
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating peace image:", error);
    return null;
  }
};

/**
 * Generates structured kindness ideas with titles and descriptions
 */
export const getStructuredKindnessIdeas = async (count: number = 3, language: SupportedLanguage = 'en'): Promise<{title: string, description: string}[]> => {
  try {
    const langSpecifier = language === 'ar' ? "in Arabic" : "in English";
    const structuredPrompt = `Generate ${count} peaceful acts that people can do to foster harmony and understanding between people, ${langSpecifier}. Format the response as a JSON array of objects, each with 'title' and 'description' fields.`;

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: structuredPrompt }] }],
    });

    const text = await streamToText(stream);

    const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback manual parsing
    const ideas = text.split(/\d+\.\s+/).filter(Boolean);
    return ideas.map(idea => {
      const titleMatch = idea.match(/^([^:\.]+)[:\.]?/);
      const title = titleMatch ? titleMatch[1].trim() : "Peaceful Act";
      const description = idea.replace(titleMatch ? titleMatch[0] : "", "").trim();
      return { title, description };
    });
  } catch (error) {
    console.error("Error generating structured kindness ideas:", error);
    return language === 'ar' ? [
      { title: "مساعدة الجيران", description: "ساعد جارًا مسنًا في أعمال منزله أو مهام البقالة." },
      { title: "التبرع بالكتب", description: "تبرع بالكتب التي قرأتها بالفعل إلى مدرسة أو مكتبة محلية." },
      { title: "إرسال رسالة شكر", description: "اكتب رسالة شكر مكتوبة بخط اليد لشخص أثر بشكل إيجابي في حياتك." }
    ] : [
      { title: "Host a peace dialogue", description: "Invite people from different backgrounds to share their perspectives in a respectful conversation." },
      { title: "Create a community garden", description: "Develop a space where neighbors of all backgrounds can work together growing food and flowers." },
      { title: "Start a book exchange", description: "Share books that promote understanding of different cultures and peaceful conflict resolution." }
    ];
  }
};

/**
 * Tests the connection to Gemini
 */
export const testGeminiConnection = async (): Promise<boolean> => {
  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: "Hello, are you working?" }] }],
    });

    const text = await streamToText(stream);
    console.log("Gemini test response:", text);
    return true;
  } catch (error) {
    console.error("Gemini connection test failed:", error);
    return false;
  }
};
