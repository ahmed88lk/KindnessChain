import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import { SupportedLanguage } from '../../services/translationService';

interface HadithOnMercyProps {
  language: SupportedLanguage;
  active?: boolean;
}

const hadiths = {
  en: [
    {
      text: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will have mercy upon you.",
      source: "Sunan al-Tirmidhī 1924",
      narrator: "Abdullah ibn Amr",
      grade: "Sahih (authentic) according to Al-Tirmidhi"
    },
    {
      text: "Whoever removes a worldly grief from a believer, Allah will remove from him one of the griefs of the Day of Judgment. And whoever alleviates the need of a needy person, Allah will alleviate his needs in this world and the Hereafter. Whoever shields a Muslim, Allah will shield him in this world and the Hereafter. And Allah will aid His slave so long as he aids his brother. And whoever follows a path to seek knowledge therein, Allah will make easy for him a path to Paradise. No people gather together in one of the Houses of Allah, reciting the Book of Allah and studying it among themselves, except that tranquility descends upon them, mercy envelops them, the angels surround them, and Allah mentions them amongst those who are with Him. And whoever is slowed down by his actions, will not be hastened forward by his lineage.",
      source: "Sahih Muslim",
      narrator: "Abu Hurairah",
      grade: "Sahih (authentic)"
    }
  ],
  ar: [
    {
      text: "الرَّاحِمُونَ يَرْحَمُهُمْ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
      source: "سنن الترمذي 1924",
      narrator: "عَبْدِ اللَّهِ بْنِ عَمْرٍو",
      grade: "حسن صحيح حسب الترمذي"
    },
    {
      text: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ، يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ، وَمَنْ سَتَرَ مُسْلِما سَتَرَهُ اللهُ فِي الدُّنْيَا وَالْآخِرَةِ ، وَاَللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ، وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إلَى الْجَنَّةِ، وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللَّهِ يَتْلُونَ كِتَابَ اللَّهِ، وَيَتَدَارَسُونَهُ فِيمَا بَيْنَهُمْ؛ إلَّا نَزَلَتْ عَلَيْهِمْ السَّكِينَةُ، وَغَشِيَتْهُمْ الرَّحْمَةُ، وَ حَفَّتهُمُ المَلاَئِكَة، وَذَكَرَهُمْ اللَّهُ فِيمَنْ عِنْدَهُ، وَمَنْ أَبَطْأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ",
      source: "صحيح مسلم",
      narrator: "أَبِي هُرَيْرَةَ",
      grade: "صحيح"
    }
  ]
};

const HadithOnMercy: React.FC<HadithOnMercyProps> = ({ language, active = true }) => {
  const hadithIndex = active ? 1 : 0; // Use different hadith based on active state
  const currentHadith = language === 'ar' ? hadiths.ar[hadithIndex] : hadiths.en[hadithIndex];

  return (
    <Card className="mb-6 border-2 border-red-200 shadow-lg">
      <CardHeader className={`bg-red-50 ${language === 'ar' ? 'text-right' : ''}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-red-800 flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            {language === 'ar' ? '٣٠ حديث عن الرحمة' : '30 Hadiths on Mercy'}
          </h2>
          <div className="text-sm text-red-700">
            {language === 'ar' ? 'حديث ' + (hadithIndex + 1) : 'Hadith ' + (hadithIndex + 1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className={`p-6 ${language === 'ar' ? 'text-right' : ''}`}>
        <blockquote className="text-lg italic text-red-900 border-l-4 border-red-500 pl-4 font-serif">
          <span className="block mb-4">{currentHadith.text}</span>
        </blockquote>
        
        <div className="mt-6 text-sm text-red-700">
          <div className="mb-1">
            <strong>{language === 'ar' ? 'الراوي: ' : 'Narrator: '}</strong>
            {currentHadith.narrator}
          </div>
          <div className="mb-1">
            <strong>{language === 'ar' ? 'المصدر: ' : 'Source: '}</strong>
            {currentHadith.source}
          </div>
          <div>
            <strong>{language === 'ar' ? 'الدرجة: ' : 'Grade: '}</strong>
            {currentHadith.grade}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-red-50 p-4">
        <p className="text-xs text-red-600 w-full text-center">
          {language === 'ar' 
            ? 'جميع الأحاديث في هذا القسم هي أحاديث صحيحة من مصادر موثوقة'
            : 'All hadiths in this section are authentic hadiths from reliable sources'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default HadithOnMercy;
