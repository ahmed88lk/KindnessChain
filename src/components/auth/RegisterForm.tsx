import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import { register } from '../../services/authService';
import { SupportedLanguage } from '../../services/translationService';

interface RegisterFormProps {
  onSuccess: (user: any) => void;
  onLoginClick: () => void;
  language?: SupportedLanguage;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onLoginClick, language = 'en' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const user = await register(name, email, password);
      onSuccess(user);
    } catch (err) {
      setError(language === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-purple-50 text-center">
        <div className="flex justify-center mb-2">
          <UserPlus className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-purple-800">
          {language === 'ar' ? "انضم إلى KindnessChain" : "Join KindnessChain"}
        </h2>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? "الاسم الكامل" : "Full Name"}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? "عنوان البريد الإلكتروني" : "Email Address"}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? "كلمة المرور" : "Password"}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              minLength={6}
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? "تأكيد كلمة المرور" : "Confirm Password"}
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              {language === 'ar' ? "أوافق على " : "I agree to the "}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                {language === 'ar' ? "الشروط والأحكام" : "terms and conditions"}
              </a>
            </label>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            variant="secondary"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {language === 'ar' ? "جاري التسجيل..." : "Signing up..."}
              </span>
            ) : (
              <span className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                {language === 'ar' ? "التسجيل" : "Sign up"}
              </span>
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {language === 'ar' ? "هل لديك حساب بالفعل؟ " : "Already have an account? "}
              <button
                type="button"
                onClick={onLoginClick}
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                {language === 'ar' ? "تسجيل الدخول" : "Log in"}
              </button>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
