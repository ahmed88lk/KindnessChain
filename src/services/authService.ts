import { mockUser } from '../data/mockData';

// Interface utilisateur avec info d'authentification
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  kindnessStreak: number;
  kindnessCoins: number;
  acts: number;
  isAmbassador: boolean;
  joinedChallenges: string[];
  language: 'fr' | 'ar' | 'en';
  role: 'user' | 'moderator' | 'admin';
}

// Clés de stockage pour le localStorage
const AUTH_USER_KEY = 'kindnesschain_user';
const AUTH_TOKEN_KEY = 'kindnesschain_token';

// API URL
const API_URL = '/api';

// Obtenir l'utilisateur actuel depuis localStorage ou null si non connecté
export const getCurrentUser = (): AuthUser | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as AuthUser;
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return null;
  }
};

// Obtenir le token JWT depuis localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Vérifier si l'utilisateur est administrateur
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

// Vérifier si l'utilisateur est modérateur ou administrateur
export const isModerator = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin' || user?.role === 'moderator';
};

// Connecter un utilisateur avec email et mot de passe
export const login = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Stocker l'utilisateur et le token dans localStorage
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Inscrire un nouvel utilisateur
export const register = async (name: string, email: string, password: string): Promise<AuthUser> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    
    // Stocker l'utilisateur et le token dans localStorage
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    
    return data.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Déconnecter l'utilisateur
export const logout = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Mettre à jour les préférences utilisateur
export const updateUserPreferences = async (preferences: Partial<AuthUser>): Promise<AuthUser | null> => {
  try {
    const token = getToken();
    if (!token) return null;
    
    const response = await fetch(`${API_URL}/auth/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(preferences)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update preferences failed');
    }

    const updatedUser = await response.json();
    
    // Mettre à jour l'utilisateur dans localStorage
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Update preferences error:', error);
    return null;
  }
};
