import { translateToArabic } from './wisdomService';

// Type for supported languages
export type SupportedLanguage = 'en' | 'ar';

// Interface for translations
interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Translation storage
const translations: Translations = {
  // Navigation
  'feed': {
    en: 'Feed',
    ar: 'آخر المستجدات'
  },
  'map': {
    en: 'Map',
    ar: 'خريطة'
  },
  'challenges': {
    en: 'Challenges',
    ar: 'تحديات'
  },
  'community': {
    en: 'Community',
    ar: 'مجتمع'
  },
  'impact': {
    en: 'Impact',
    ar: 'تأثير'
  },
  // Actions
  'share': {
    en: 'Share',
    ar: 'شارك'
  },
  'join': {
    en: 'Join',
    ar: 'انضم'
  },
  'login': {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'register': {
    en: 'Register',
    ar: 'التسجيل'
  },
  'logout': {
    en: 'Logout',
    ar: 'تسجيل الخروج'
  },
  // General
  'app_name': {
    en: 'KindnessChain',
    ar: 'سلسلة الطيبة'
  },
  'add_act': {
    en: 'Add a kindness act',
    ar: 'إضافة عمل من أعمال الخير'
  },
  'trending': {
    en: 'Trending',
    ar: 'الشائع'
  },
  'recent': {
    en: 'Recent',
    ar: 'حديث'
  },
  'nearby': {
    en: 'Nearby',
    ar: 'قريب'
  },
  // Wisdom-related
  'wisdom_suggestion': {
    en: 'Get an inspiring suggestion',
    ar: 'الحصول على اقتراح ملهم'
  },
  // Dashboard sections
  'inspiration_feed': {
    en: 'Inspiration Feed',
    ar: 'مصدر الإلهام'
  },
  'global_kindness_map': {
    en: 'Global Kindness Map',
    ar: 'خريطة اللطف العالمية'
  },
  'impact_dashboard': {
    en: 'Impact Dashboard',
    ar: 'لوحة تحليلات التأثير'
  },
  'community_hub': {
    en: 'Community Hub',
    ar: 'مركز المجتمع'
  },
  // Act categories
  'Community Support': {
    en: 'Community Support',
    ar: 'دعم المجتمع'
  },
  'Environmental': {
    en: 'Environmental',
    ar: 'بيئي'
  },
  'Donation': {
    en: 'Donation',
    ar: 'تبرع'
  },
  'Random Acts': {
    en: 'Random Acts',
    ar: 'أعمال عشوائية'
  },
  'Volunteering': {
    en: 'Volunteering',
    ar: 'تطوع'
  },
  // Peaceful additions
  'peace': {
    en: 'Peace',
    ar: 'سلام'
  },
  'harmony': {
    en: 'Harmony',
    ar: 'وئام'
  },
  'humanity': {
    en: 'Humanity',
    ar: 'إنسانية'
  },
  'understanding': {
    en: 'Understanding',
    ar: 'تفاهم'
  },
  'compassion': {
    en: 'Compassion',
    ar: 'رحمة'
  }
};

// Get translation for a key and language
export const getTranslation = (key: string, language: SupportedLanguage = 'en'): string => {
  const translation = translations[key];
  if (!translation) return key;
  return translation[language] || translation.en || key;
};

// Dynamically translate text not in predefined translations
export const translateText = async (text: string, targetLanguage: SupportedLanguage): Promise<string> => {
  if (targetLanguage === 'ar') {
    try {
      return await translateToArabic(text);
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
  return text; // Return original text for English
};
