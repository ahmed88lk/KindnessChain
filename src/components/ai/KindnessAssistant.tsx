import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { generateKindnessIdea } from '../../services/geminiService';
import { evaluateContent } from '../../services/contentGuidelines';
import Button from '../ui/Button';
import Card, { CardContent } from '../ui/Card';
import { SupportedLanguage } from '../../services/translationService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface KindnessAssistantProps {
  language?: SupportedLanguage;
}

const KindnessAssistant: React.FC<KindnessAssistantProps> = ({ language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'ar' 
        ? "مرحبًا! أنا مساعد السلام. كيف يمكنني مساعدتك في نشر اللطف والسلام اليوم؟"
        : "Hello! I'm your Peace Assistant. How can I help you promote kindness and harmony today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Check content against guidelines
      const contentEvaluation = evaluateContent(userMessage.text);
      if (!contentEvaluation.approved) {
        const guidelineMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: contentEvaluation.response,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, guidelineMessage]);
        setIsLoading(false);
        return;
      }
      
      const prompt = language === 'ar'
        ? `المستخدم يسأل عن اللطف والسلام: "${inputValue}". يرجى اقتراح أفكار للطف أو تقديم نصائح مفيدة حول كيفية نشر السلام والوئام.`
        : `The user is asking about kindness and peace: "${inputValue}". Please suggest peaceful acts or provide thoughtful advice related to promoting harmony and understanding between people.`;
      
      const response = await generateKindnessIdea(prompt, language);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'ar'
          ? "آسف، لم أتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا."
          : "I'm sorry, I couldn't process your request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen ? (
        <Button
          variant="primary"
          className="fixed bottom-24 right-8 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
          aria-label={language === 'ar' ? "افتح مساعد السلام" : "Open peace assistant"}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="fixed bottom-24 right-8 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ease-in-out z-20">
          <div className="flex items-center justify-between bg-teal-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">{language === 'ar' ? "مساعد السلام" : "Peace Assistant"}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-teal-700 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-grow max-h-96 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-teal-100 text-teal-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={language === 'ar' ? "اسأل عن أفكار للسلام والتسامح..." : "Ask for ideas about peace and kindness..."}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-teal-500 text-white p-2 rounded-r-md hover:bg-teal-600 transition-colors disabled:opacity-50"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default KindnessAssistant;
