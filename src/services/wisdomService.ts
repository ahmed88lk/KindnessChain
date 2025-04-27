import { GoogleGenAI, Modality } from "@google/genai";
import { SupportedLanguage } from "./translationService";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

/**
 * Helper function to generate full text from a streamed response
 */
const streamToText = async (stream: AsyncIterable<any>): Promise<string> => {
  let fullText = '';
  for await (const chunk of stream) {
    fullText += chunk.text || '';
  }
  return fullText.trim();
};

// Collection of authentic hadiths with sources and chains
const authenticHadiths = {
  en: [
    {
      text: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will have mercy upon you.",
      source: "Abdullah ibn Amr, Sunan al-Tirmidhī 1924, Sahih (authentic) according to Al-Tirmidhi"
    },
    {
      text: "Whoever removes a worldly grief from a believer, Allah will remove from him one of the griefs of the Day of Resurrection. And whoever alleviates the need of a needy person, Allah will alleviate his needs in this world and the Hereafter. Whoever shields a Muslim, Allah will shield him in this world and the Hereafter. And Allah will aid His slave so long as the slave aids his brother.",
      source: "Abu Hurairah, Sahih Muslim"
    },
    {
      text: "Take advantage of five before five: your youth before your old age, your health before your illness, your riches before your poverty, your free time before your work, and your life before your death.",
      source: "Ibn Abbas, Shu'ab al-Imān lil-Bayhaqī 10250, Sahih (authentic) according to Al-Albani"
    },
    {
      text: "None of you truly believes until he wishes for his brother what he wishes for himself.",
      source: "Anas bin Malik, Sahih Bukhari and Sahih Muslim"
    },
    {
      text: "When Allah decreed the creation, He wrote in His Book which is with Him on His Throne: My Mercy prevails over My Wrath.",
      source: "Abu Hurairah, Sahih Bukhari"
    },
    {
      text: "Allah has made mercy into one hundred parts. He kept with Himself ninety-nine parts and sent down one part to the earth, so because of that part the creation is merciful such that a horse raises its hoof over its child for fear of hurting it.",
      source: "Abu Hurairah, Sahih Bukhari"
    },
    {
      text: "The Prophet was merciful and no one would come to him in need except that he would promise to help him or he would give him something.",
      source: "Abdullah ibn Abbas, Al-Adab Al-Mufrad by Bukhari"
    },
    {
      text: "Be merciful to others and you will receive mercy. Forgive others and Allah will forgive you.",
      source: "Abdullah ibn Amr, Musnad Ahmad"
    }
  ],
  ar: [
    {
      text: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ.",
      source: "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو، سنن الترمذي 1924، حسن صحيح"
    },
    {
      text: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ، يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ، وَمَنْ سَتَرَ مُسْلِما سَتَرَهُ اللهُ فِي الدُّنْيَا وَالْآخِرَةِ، وَاَللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ.",
      source: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ، صحيح مسلم"
    },
    {
      text: "اغْتَنِمْ خَمْسًا قَبْلَ خَمْسٍ: شَبَابَكَ قَبْلَ هَرَمِكَ، وَصِحَّتَكَ قَبْلَ سَقَمِكَ، وَغِنَاكَ قَبْلَ فَقْرِكَ، وَفَرَاغَكَ قَبْلَ شُغُلِكَ، وَحَيَاتَكَ قَبْلَ مَوْتِكَ.",
      source: "عَنِ ابْنِ عَبَّاسٍ، شعب الإيمان للبيهقي 10250، صحيح حسب الألباني"
    },
    {
      text: "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.",
      source: "عن أنس بن مالك، صحيح البخاري وصحيح مسلم"
    },
    {
      text: "إِذَا قَضَى اللهُ الْخَلْقَ كَتَبَ فِي كِتَابِهِ فَهُوَ عِنْدَهُ فَوْقَ الْعَرْشِ: إِنَّ رَحْمَتِي سَبَقَتْ غَضَبِي.",
      source: "عن أبي هريرة، صحيح البخاري"
    },
    {
      text: "جَعَلَ اللهُ الرَّحْمَةَ مِائَةَ جُزْءٍ، فَأَمْسَكَ عِنْدَهُ تِسْعَةً وَتِسْعِينَ جُزْءًا، وَأَنْزَلَ فِي الْأَرْضِ جُزْءًا وَاحِدًا، فَمِنْ ذَلِكَ الْجُزْءِ تَتَرَاحَمُ الْخَلَائِقُ، حَتَّى تَرْفَعَ الْفَرَسُ حَافِرَهَا عَنْ وَلَدِهَا خَشْيَةَ أَنْ تُصِيبَهُ.",
      source: "عن أبي هريرة، صحيح البخاري"
    },
    {
      text: "كَانَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ رَحِيمًا، وَلَا يَأْتِيهِ أَحَدٌ بِحَاجَةٍ إِلَّا وَعَدَهُ بِمُسَاعَدَتِهِ أَوْ أَعْطَاهُ شَيْئًا.",
      source: "عن عبدالله بن عباس، الأدب المفرد للبخاري"
    },
    {
      text: "ارْحَمُوا تُرْحَمُوا، وَاغْفِرُوا يَغْفِرِ اللهُ لَكُمْ.",
      source: "عن عبدالله بن عمرو، مسند أحمد"
    }
  ],
  fr: [
    {
      text: "Les miséricordieux recevront la miséricorde du Tout Miséricordieux. Soyez miséricordieux envers ceux qui sont sur la terre, et Celui qui est au ciel sera miséricordieux envers vous.",
      source: "Abdullah ibn Amr, Sunan al-Tirmidhī 1924, Sahih (authentique) selon Al-Tirmidhi"
    },
    {
      text: "Quiconque dissipe une affliction d'un croyant, Allah dissipera de lui une affliction au Jour de la Résurrection. Quiconque allège la difficulté d'une personne en détresse, Allah allégera ses difficultés dans ce monde et dans l'au-delà.",
      source: "Abu Hurairah, Sahih Muslim"
    },
    {
      text: "Profitez de cinq choses avant cinq autres : votre jeunesse avant votre vieillesse, votre santé avant votre maladie, votre richesse avant votre pauvreté, votre temps libre avant votre occupation, et votre vie avant votre mort.",
      source: "Ibn Abbas, Shu'ab al-Imān lil-Bayhaqī 10250, Sahih selon Al-Albani"
    }
  ]
};

// Collection of Quranic verses about mercy
const quranicVerses = {
  en: [
    {
      text: "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'",
      surahName: "Surah Az-Zumar",
      ayahNumber: "53"
    },
    {
      text: "My mercy encompasses all things.",
      surahName: "Surah Al-A'raf",
      ayahNumber: "156"
    },
    {
      text: "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
      surahName: "Surah Al-Anbiya",
      ayahNumber: "107"
    },
    {
      text: "Say, 'In the bounty of Allah and in His mercy - in that let them rejoice; it is better than what they accumulate.'",
      surahName: "Surah Yunus",
      ayahNumber: "58"
    },
    {
      text: "And We send down of the Qur'an that which is healing and mercy for the believers, but it does not increase the wrongdoers except in loss.",
      surahName: "Surah Al-Isra",
      ayahNumber: "82"
    }
  ],
  ar: [
    {
      text: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
      surahName: "سورة الزمر",
      ayahNumber: "53"
    },
    {
      text: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
      surahName: "سورة الأعراف",
      ayahNumber: "156"
    },
    {
      text: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
      surahName: "سورة الأنبياء",
      ayahNumber: "107"
    },
    {
      text: "قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا هُوَ خَيْرٌ مِّمَّا يَجْمَعُونَ",
      surahName: "سورة يونس",
      ayahNumber: "58"
    },
    {
      text: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ وَلَا يَزِيدُ الظَّالِمِينَ إِلَّا خَسَارًا",
      surahName: "سورة الإسراء",
      ayahNumber: "82"
    }
  ],
  fr: [
    {
      text: "Dis : 'Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d'Allah. Car Allah pardonne tous les péchés. Oui, c'est Lui le Pardonneur, le Très Miséricordieux.'",
      surahName: "Sourate Az-Zumar",
      ayahNumber: "53"
    },
    {
      text: "Et Ma miséricorde embrasse toute chose.",
      surahName: "Sourate Al-A'raf",
      ayahNumber: "156"
    },
    {
      text: "Et Nous ne t'avons envoyé, [Ô Muhammad], qu'en miséricorde pour l'univers.",
      surahName: "Sourate Al-Anbiya",
      ayahNumber: "107"
    }
  ]
};

/**
 * Obtains an Islamic wisdom quote in specified language
 * @returns Both text and source of the hadith
 */
export const getWisdomSuggestion = async (language: SupportedLanguage = 'en'): Promise<{text: string, source: string}> => {
  try {
    // Use a random authentic hadith from our collection
    const hadiths = authenticHadiths[language] || authenticHadiths.en;
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    return hadiths[randomIndex];
    
  } catch (error) {
    console.error('Error in retrieving hadith:', error);
    
    // Fallback hadith if collection access fails
    return {
      text: language === 'ar' ? 
        "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ." : 
        language === 'fr' ?
        "Les miséricordieux recevront la miséricorde du Tout Miséricordieux. Soyez miséricordieux envers ceux qui sont sur la terre, et Celui qui est au ciel sera miséricordieux envers vous." :
        "The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will have mercy upon you.",
      source: language === 'ar' ? 
        "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو، سنن الترمذي 1924، حسن صحيح" : 
        language === 'fr' ?
        "Abdullah ibn Amr, Sunan al-Tirmidhī 1924, Sahih (authentique) selon Al-Tirmidhi" :
        "Abdullah ibn Amr, Sunan al-Tirmidhī 1924, Sahih (authentic) according to Al-Tirmidhi"
    };
  }
};

/**
 * Gets a Quranic verse about mercy
 */
export const getQuranicVerse = async (language: SupportedLanguage = 'en'): Promise<{text: string, surahName: string, ayahNumber: string}> => {
  try {
    const verses = quranicVerses[language] || quranicVerses.en;
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  } catch (error) {
    console.error('Error retrieving Quranic verse:', error);
    
    // Fallback verse
    return {
      text: language === 'ar' ? 
        "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ" : 
        language === 'fr' ?
        "Dis : 'Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d'Allah. Car Allah pardonne tous les péchés. Oui, c'est Lui le Pardonneur, le Très Miséricordieux.'" :
        "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'",
      surahName: language === 'ar' ? "سورة الزمر" : language === 'fr' ? "Sourate Az-Zumar" : "Surah Az-Zumar",
      ayahNumber: "53"
    };
  }
};

/**
 * Gets suggestions for kind acts based on Islamic wisdom
 */
export const getWisdomBasedKindnessIdeas = async (count: number = 3, language: SupportedLanguage = 'en'): Promise<string[]> => {
  try {
    const prompt = language === 'ar' ? 
      `اقترح ${count} أفعال بسيطة للطف يمكن للمسلم القيام بها بناءً على تعاليم الإسلام والأحاديث النبوية الصحيحة. يجب أن تكون كل فكرة موجزة وعملية للحياة اليومية، ومستوحاة من القرآن والسنة، وباللغة العربية.` :
      `Suggest ${count} simple acts of kindness a Muslim can do based on authentic hadiths. Each idea should be peaceful, concise and practical for daily life, inspired by the Quran and Sunnah, in English.`;

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = await streamToText(stream);
    
    // Parse numbered list
    const ideas = text.split(/\d+\.\s+/).filter(Boolean);
    return ideas.map(idea => idea.trim());
  } catch (error) {
    console.error('Error generating kindness ideas:', error);
    
    // Fallback ideas in English or Arabic based on Islamic teachings
    const fallbackIdeas = language === 'ar' ? [
      "زيارة المريض وتقديم الدعم له، فقد حثنا الرسول صلى الله عليه وسلم على زيارة المرضى",
      "إطعام الفقير والمحتاج، فإطعام الطعام من صفات المؤمنين كما جاء في القرآن",
      "الابتسامة في وجه أخيك صدقة، كما علمنا النبي صلى الله عليه وسلم",
      "نشر السلام وإفشاء السلام على من تعرف ومن لا تعرف",
      "إماطة الأذى عن الطريق فهي من شعب الإيمان"
    ] : [
      "Visit the sick and offer support, as the Prophet (peace be upon him) encouraged visiting the ill",
      "Feed the poor and needy, as feeding others is among the qualities of believers mentioned in the Quran",
      "Smile at your brother, as the Prophet taught us that a smile is charity",
      "Spread peace by offering greetings to those you know and don't know",
      "Remove harmful objects from the path, as it is a branch of faith"
    ];
    
    return fallbackIdeas.slice(0, count);
  }
};

/**
 * Generate peace-related images with Islamic elements
 */
export const generatePeaceImage = async (prompt: string, language: SupportedLanguage = 'en'): Promise<string> => {
  try {
    const enhancedPrompt = language === 'ar' ?
      `قم بإنشاء صورة سلمية وملهمة حول: ${prompt}. اجعلها مناسبة لتعزيز السلام والرحمة والتعاون بما يتوافق مع القيم الإسلامية. لا تصور وجوهًا أو أشخاصًا بشكل واضح.` :
      `Create a peaceful and inspiring image about: ${prompt}. Make it suitable for promoting peace, mercy, and cooperation in alignment with Islamic values. Do not depict clear faces or people.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Extract base64 image data from response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image was generated");
  } catch (error) {
    console.error('Error generating peace image:', error);
    throw error;
  }
};

/**
 * Translate text to Arabic
 */
export const translateToArabic = async (text: string): Promise<string> => {
  try {
    const prompt = `Translate this text to Arabic: "${text}"`;

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return await streamToText(stream);
  } catch (error) {
    console.error('Error during translation:', error);
    return text; // Return original text if translation fails
  }
};
