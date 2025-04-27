import React, { useState } from 'react';
import { ImageIcon, RefreshCw, Download, X } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { generatePeaceImage } from '../../services/geminiService';
import { SupportedLanguage } from '../../services/translationService';

interface PeaceImageGeneratorProps {
  language: SupportedLanguage;
}

const PeaceImageGenerator: React.FC<PeaceImageGeneratorProps> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Islamic-themed peaceful suggestions
  const suggestionPrompts = language === 'ar' ? [
    'مسجد جميل مع غروب الشمس في تونس',
    'حدائق وأشجار خضراء ترمز للسلام والتعاون',
    'تمثيل للتعاون بين المسلمين في تونس',
    'المدينة القديمة في تونس في ضوء هادئ',
    'كتاب قرآني مفتوح مع زهور',
    'جامع الزيتونة التاريخي في تونس'
  ] : [
    'Beautiful mosque with sunset in Tunisia',
    'Green gardens and trees symbolizing peace in Tunisian style', 
    'Representation of cooperation between Muslims in Tunisia',
    'The old medina of Tunisia in peaceful light',
    'Open Quranic book with flowers',
    'The historic Zitouna Mosque in Tunisia'
  ];

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const imageData = await generatePeaceImage(prompt, language);
      setImage(imageData);
    } catch (error) {
      console.error('Error generating image:', error);
      setError(language === 'ar' ? 
        'حدث خطأ أثناء إنشاء الصورة. يرجى المحاولة مرة أخرى.' : 
        'Error generating image. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${image}`;
      link.download = 'islamic-peace-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <Card className="mb-6 border-2 border-blue-200 shadow-lg">
      <CardHeader className={`bg-blue-50 ${language === 'ar' ? 'text-right' : ''}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-800 flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            {language === 'ar' ? 'مولد صور السلام الإسلامية' : 'Islamic Peace Image Creator'}
          </h2>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className={`mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
          <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'ar' ? 'وصف الصورة الإسلامية السلمية التي تريد إنشاءها:' : 'Describe the Islamic peaceful image you want to create:'}
          </label>
          <input
            id="image-prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'ar' ? 'مثال: منظر طبيعي جميل في تونس مع آية قرآنية عن السلام' : 'Example: Beautiful landscape in Tunisia with Quranic verse about peace'}
          />
        </div>
        
        <div className={`mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
          <p className="text-sm text-gray-600 mb-2">
            {language === 'ar' ? 'أو اختر من الاقتراحات:' : 'Or choose from suggestions:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestionPrompts.map((suggestion, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          <Button
            variant="primary"
            className="px-4"
            onClick={handleGenerateImage}
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                {language === 'ar' ? 'جاري الإنشاء...' : 'Generating...'}
              </span>
            ) : (
              <span className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إنشاء صورة' : 'Create Islamic Peace Image'}
              </span>
            )}
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {image && (
          <div className="relative">
            <img 
              src={`data:image/png;base64,${image}`}
              alt="Generated Islamic peace image" 
              className="w-full rounded-md shadow-md"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="bg-white bg-opacity-75 hover:bg-opacity-100"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white bg-opacity-75 hover:bg-opacity-100"
                onClick={() => setImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <p className="text-sm text-gray-500 w-full text-center">
          {language === 'ar' ? 'استخدم هذه الأداة لإنشاء صور تلهم السلام والتعاون بما يتوافق مع التعاليم الإسلامية' : 
          'Use this tool to create images that inspire peace and cooperation in accordance with Islamic teachings'}
        </p>
        <p className="text-xs text-gray-400 w-full text-center mt-1">
          {language === 'ar' ? 'جميع الصور تتوافق مع القيم الإسلامية وتتجنب تصوير الوجوه البشرية' : 
          'All images comply with Islamic values and avoid depicting human faces'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PeaceImageGenerator;
