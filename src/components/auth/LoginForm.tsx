import React, { useState } from 'react';
import { User, LogIn } from 'lucide-react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import { login } from '../../services/authService';
import { SupportedLanguage } from '../../services/translationService';

interface LoginFormProps {
  onSuccess: (user: any) => void;
  onRegisterClick: () => void;
  language?: SupportedLanguage;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onRegisterClick, language = 'en' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const user = await login(email, password);
      onSuccess(user);
    } catch (err) {
      setError(language === 'ar' 
        ? 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.' 
        : 'Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-teal-50 text-center">
        <div className="flex justify-center mb-2">
          <User className="h-8 w-8 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-teal-800">
          {language === 'ar' ? "تسجيل الدخول إلى KindnessChain" : "Log in to KindnessChain"}
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? "عنوان البريد الإلكتروني" : "Email Address"}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                {language === 'ar' ? "تذكرني" : "Remember me"}
              </label>
            </div>
            
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                {language === 'ar' ? "نسيت كلمة المرور؟" : "Forgot password?"}
              </button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {language === 'ar' ? "جاري تسجيل الدخول..." : "Logging in..."}
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                {language === 'ar' ? "تسجيل الدخول" : "Log in"}
              </span>
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {language === 'ar' ? "ليس لديك حساب؟ " : "Don't have an account? "}
              <button
                type="button"
                onClick={onRegisterClick}
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                {language === 'ar' ? "سجل الآن" : "Sign up"}
              </button>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
