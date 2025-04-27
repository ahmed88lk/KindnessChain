import React, { useState, useRef } from 'react';
import { Camera, MapPin, Tag, X, Upload, PenLine, Heart } from 'lucide-react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { getWisdomSuggestion } from '../../services/wisdomService';
import { SupportedLanguage } from '../../services/translationService';

interface AddKindnessActFormProps {
  onSubmit: (act: any) => void;
  onCancel: () => void;
  language?: SupportedLanguage;
}

const AddKindnessActForm: React.FC<AddKindnessActFormProps> = ({ onSubmit, onCancel, language = 'en' }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wisdomSuggestion, setWisdomSuggestion] = useState('');
  const [wisdomSource, setWisdomSource] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Islamic-focused categories
  const categories = language === 'ar' ? [
    'صدقة', 
    'بيئي', 
    'تعليم', 
    'أعمال سلام', 
    'تطوع',
    'مساعدة الفقراء',
    'نشر العلم',
    'صحة ورعاية',
  ] : [
    'Sadaqah (Charity)', 
    'Environmental', 
    'Education', 
    'Peace Building', 
    'Volunteering',
    'Helping the Poor',
    'Spreading Knowledge',
    'Healthcare',
  ];

  const handleGetWisdom = async () => {
    setLoading(true);
    try {
      const wisdom = await getWisdomSuggestion(language);
      setWisdomSuggestion(wisdom.text);
      setWisdomSource(wisdom.source);
    } catch (error) {
      console.error('Error getting suggestion:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);

      // Create URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Structure data for kindness act
      const act = {
        id: `act_${Date.now()}`,
        title,
        description,
        category,
        location: {
          name: location,
          lat: 36.8065, // Tunisia's approximate coordinates
          lng: 10.1815,
        },
        date: new Date().toISOString(),
        tags,
        anonymous,
        media: mediaPreview ? {
          type: media?.type.startsWith('image/') ? 'image' : 'video',
          url: mediaPreview,
        } : undefined,
        reactions: {
          hearts: 0,
          inspired: 0,
          thanks: 0,
        }
      };
      
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(act);
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-teal-50 border-b border-teal-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-teal-800 flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            {language === 'ar' ? 'مشاركة عمل من أعمال الخير' : 'Share an Act of Kindness'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? 'عنوان عمل الخير الخاص بك' : 'Title of your kind act'}
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={language === 'ar' ? 
                'مثال: ساعدت شخصًا محتاجًا في تونس' : 
                'Ex: I helped someone in need in Tunisia'}
              required
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </label>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={handleGetWisdom}
                disabled={loading}
                className="text-xs"
              >
                {language === 'ar' ? 'الحصول على حديث ملهم' : 'Get an inspiring hadith'}
              </Button>
            </div>
            {wisdomSuggestion && (
              <div className="mb-2 p-3 bg-yellow-50 border border-yellow-100 rounded-md text-sm italic text-gray-700">
                <p>"{wisdomSuggestion}"</p>
                {wisdomSource && (
                  <p className="text-xs text-gray-500 mt-1">— {wisdomSource}</p>
                )}
              </div>
            )}
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-24"
              placeholder={language === 'ar' ? 
                'صِف عمل الخير الخاص بك وكيف يساهم في نشر السلام والرحمة...' : 
                'Describe your kind act and how it promotes peace and mercy...'}
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 inline mr-1" />
                {language === 'ar' ? 'الموقع' : 'Location'}
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={language === 'ar' ? 'مثال: تونس العاصمة، تونس' : 'Ex: Tunis, Tunisia'}
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الفئة' : 'Category'}
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">{language === 'ar' ? 'اختر فئة' : 'Select a category'}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              <Tag className="h-4 w-4 inline mr-1" />
              {language === 'ar' ? 'العلامات (اضغط على Enter للإضافة)' : 'Tags (press Enter to add)'}
            </label>
            <input
              id="tags"
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={language === 'ar' ? 'مثال: صدقة، رحمة، سلام...' : 'Ex: sadaqah, mercy, peace...'}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="primary" className="flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-teal-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Camera className="h-4 w-4 inline mr-1" />
              {language === 'ar' ? 'إضافة صورة أو فيديو (اختياري)' : 'Add a photo or video (optional)'}
            </label>
            
            {mediaPreview ? (
              <div className="relative">
                <img
                  src={mediaPreview}
                  alt="Media preview"
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveMedia}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">{language === 'ar' ? 'انقر أو اسحب وأفلت الملف' : 'Click or drag and drop a file'}</p>
                <p className="text-xs text-gray-400 mt-1">{language === 'ar' ? 'PNG، JPG، GIF حتى 10 ميغابايت' : 'PNG, JPG, GIF up to 10MB'}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <input
              id="anonymous"
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
              {language === 'ar' ? 'نشر بشكل مجهول (صدقة خفية)' : 'Post anonymously (hidden charity)'}
            </label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              language === 'ar' ? 'جاري النشر...' : 'Sharing...'
            ) : (
              language === 'ar' ? 'نشر' : 'Share'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddKindnessActForm;
