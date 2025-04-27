import React, { useEffect, useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { getSuggestedKindnessActs } from '../../services/geminiService';
import { SupportedLanguage } from '../../services/translationService';

interface KindnessSuggestionsProps {
  language?: SupportedLanguage;
}

const KindnessSuggestions: React.FC<KindnessSuggestionsProps> = ({ language = 'en' }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const acts = await getSuggestedKindnessActs(language);
      setSuggestions(acts);
    } catch (err) {
      setError(language === 'ar' ? 
        'تعذر تحميل الاقتراحات. يرجى المحاولة مرة أخرى.' : 
        'Unable to load suggestions. Please try again.');
      console.error('Error retrieving suggestions:', err);
      
      // Fallback suggestions based on Islamic teachings
      setSuggestions(language === 'ar' ? [
        "زيارة المريض كما حث عليه النبي صلى الله عليه وسلم",
        "التبسم في وجه أخيك صدقة",
        "إفشاء السلام بين الناس",
        "إماطة الأذى عن الطريق شعبة من شعب الإيمان",
        "تقديم الطعام للفقراء والمحتاجين"
      ] : [
        "Visit the sick as encouraged by the Prophet (peace be upon him)",
        "Smile at your brother as it is charity",
        "Spread the greeting of peace among people",
        "Remove harmful things from the path as it is a branch of faith",
        "Provide food for the poor and needy"
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [language]);

  return (
    <Card>
      <CardHeader className={`flex flex-row items-center justify-between bg-purple-50 ${language === 'ar' ? 'text-right' : ''}`}>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="font-medium text-gray-900">
            {language === 'ar' ? 'أعمال الخير المستوحاة من الإسلام' : 'Islamic Kindness Suggestions'}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{language === 'ar' ? 'تحديث' : 'Refresh'}</span>
        </Button>
      </CardHeader>
      <CardContent className={language === 'ar' ? 'text-right' : ''}>
        {error && !isLoading ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center">
                <div className="h-4 w-4 bg-purple-200 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <ul className={`space-y-2 ${language === 'ar' ? 'pr-0' : ''}`}>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-500 font-bold mr-2 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default KindnessSuggestions;
