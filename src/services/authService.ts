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
}

// Clé pour stocker les données utilisateur dans localStorage
const AUTH_USER_KEY = 'kindnesschain_user';

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

// Connecter un utilisateur avec email et mot de passe
export const login = async (email: string, password: string): Promise<AuthUser> => {
  // Simuler une requête API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Pour la démo, on accepte n'importe quel email/password
  // et on utilise les données de mockUser
  const authUser: AuthUser = {
    ...mockUser,
    email,
    language: 'fr',
  };
  
  // Stocker l'utilisateur dans localStorage
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
  
  return authUser;
};

// Inscrire un nouvel utilisateur
export const register = async (name: string, email: string, password: string): Promise<AuthUser> => {
  // Simuler une requête API
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Créer un nouvel utilisateur basé sur les infos fournies et mockUser
  const authUser: AuthUser = {
    ...mockUser,
    id: `user_${Date.now()}`,
    name,
    email,
    kindnessStreak: 0,
    kindnessCoins: 50, // Bonus de départ
    acts: 0,
    language: 'fr',
  };
  
  // Stocker l'utilisateur dans localStorage
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
  
  return authUser;
};

// Déconnecter l'utilisateur
export const logout = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

// Mettre à jour les préférences utilisateur
export const updateUserPreferences = (preferences: Partial<AuthUser>): AuthUser | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  const updatedUser = {
    ...currentUser,
    ...preferences,
  };
  
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};
