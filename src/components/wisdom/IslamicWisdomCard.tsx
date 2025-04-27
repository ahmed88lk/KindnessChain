import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, HelpCircle, BookOpen, Book } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { getWisdomSuggestion, getQuranicVerse } from '../../services/wisdomService';
import { SupportedLanguage } from '../../services/translationService';

interface IslamicWisdomCardProps {
  language: SupportedLanguage;
}

const IslamicWisdomCard: React.FC<IslamicWisdomCardProps> = ({ language }) => {
  const [wisdom, setWisdom] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSource, setShowSource] = useState<boolean>(false);
  const [source, setSource] = useState<string>('');
  const [contentType, setContentType] = useState<'hadith' | 'quran'>('hadith');
  const [surahInfo, setSurahInfo] = useState<string>('');
  const [ayahNumber, setAyahNumber] = useState<string>('');

  const fetchWisdom = async (type: 'hadith' | 'quran' = 'hadith') => {
    setIsLoading(true);
    setShowSource(false);
    setContentType(type);
    
    try {
      if (type === 'hadith') {
        const response = await getWisdomSuggestion(language);
        setWisdom(response.text);
        setSource(response.source || '');
      } else {
        const response = await getQuranicVerse(language);
        setWisdom(response.text);
        setSurahInfo(response.surahName || '');
        setAyahNumber(response.ayahNumber || '');
      }
    } catch (error) {
      console.error('Error retrieving Islamic wisdom:', error);
      
      // Fallback wisdom quotes
      if (type === 'hadith') {
        setWisdom(language === 'ar'
          ? 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ.'
          : 'The merciful are shown mercy by the Most Merciful. Be merciful to those on the earth and the One above the heavens will have mercy upon you.');
        setSource(language === 'ar'
          ? 'عَبْدِ اللَّهِ بْنِ عَمْرٍو، سنن الترمذي 1924، حسن صحيح'
          : 'Abdullah ibn Amr, Sunan al-Tirmidhi 1924, Sahih');
      } else {
        setWisdom(language === 'ar'
          ? 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ'
          : 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."');
        setSurahInfo(language === 'ar' ? 'سورة الزمر' : 'Surah Az-Zumar');
        setAyahNumber('53');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWisdom(Math.random() > 0.5 ? 'hadith' : 'quran');
  }, [language]);

  return (
    <Card className="mb-6 border-2 border-green-200 shadow-lg">
      <CardHeader className={language === 'ar' ? 'bg-green-50 text-right' : 'bg-green-50'}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-green-800 flex items-center">
            {contentType === 'hadith' ? 
              <><BookOpen className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'حديث نبوي عن الرحمة' : 'Prophetic Hadith on Mercy'}</> :
              <><Book className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'آية قرآنية عن الرحمة' : 'Quranic Verse on Mercy'}</>
            }
          </h2>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => fetchWisdom('hadith')}
              disabled={isLoading}
              className={`text-green-700 hover:bg-green-100 ${contentType === 'hadith' ? 'bg-green-200' : ''}`}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              {language === 'ar' ? 'حديث' : 'Hadith'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => fetchWisdom('quran')}
              disabled={isLoading}
              className={`text-green-700 hover:bg-green-100 ${contentType === 'quran' ? 'bg-green-200' : ''}`}
            >
              <Book className="h-4 w-4 mr-1" />
              {language === 'ar' ? 'قرآن' : 'Quran'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => fetchWisdom(contentType)}
              disabled={isLoading}
              className="text-green-700 hover:bg-green-100"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              {language === 'ar' ? 'تحديث' : 'Refresh'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`p-6 ${language === 'ar' ? 'text-right' : ''}`}>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <blockquote className={`text-lg italic text-${contentType === 'hadith' ? 'green' : 'teal'}-900 border-${language === 'ar' ? 'right' : 'left'}-4 border-${contentType === 'hadith' ? 'green' : 'teal'}-500 p${language === 'ar' ? 'r' : 'l'}-4 font-serif mb-4`}>
              <span className="block mb-2">"{wisdom}"</span>
            </blockquote>
            
            <div className={`text-sm text-${contentType === 'hadith' ? 'green' : 'teal'}-700 mt-4`}>
              {contentType === 'hadith' ? (
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span><b>{language === 'ar' ? 'المصدر:' : 'Source:'}</b> {source}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  <span><b>{language === 'ar' ? 'المصدر:' : 'Source:'}</b> {surahInfo} {ayahNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className={`bg-gray-50 p-4 flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSource(!showSource)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          {language === 'ar' ? 'معلومات عن المصدر' : 'Source information'}
        </Button>
      </CardFooter>
      {showSource && (
        <div className={`px-6 pb-4 text-sm text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>
          <p>
            {language === 'ar'
              ? 'جميع الأحاديث والآيات القرآنية مأخوذة من مصادر صحيحة وموثوقة. إذا وجدت أي خطأ، يرجى مراجعة المصدر الأصلي:'
              : 'All hadiths and Quranic verses are from authentic and reliable sources. If you find any error, please check the original source:'}
            <br />
            <a
              href="https://www.iium.edu.my/deed/hadith/other/hadithnawawi.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline"
            >
              {language === 'ar' ? 'الأربعون النووية' : 'Al-Nawawi\'s Forty Hadiths'}
            </a>
            <br />
            <a
              href="https://sunnah.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline"
            >
              Sunnah.com
            </a>
            <br />
            <a
              href="https://quran.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline"
            >
              Quran.com
            </a>
          </p>
        </div>
      )}
    </Card>
  );
};

export default IslamicWisdomCard;
