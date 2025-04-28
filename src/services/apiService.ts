import { getToken } from './authService';

const API_URL = '/api';

/**
 * Service pour gérer les appels API au backend
 */
export const apiService = {
  /**
   * Fetch générique avec gestion des erreurs et authentification
   */
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'x-auth-token': token } : {}),
      ...options.headers
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      let errorMessage = 'Une erreur est survenue';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Si la réponse n'est pas du JSON valide, on garde le message d'erreur par défaut
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  },
  
  /**
   * GET request
   */
  get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint);
  },
  
  /**
   * POST request
   */
  post<T>(endpoint: string, data: any): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  /**
   * PUT request
   */
  put<T>(endpoint: string, data: any): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  /**
   * DELETE request
   */
  delete<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'DELETE',
    });
  },
};
