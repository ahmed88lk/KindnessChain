import { apiService } from './apiService';
import { KindnessAct } from '../types';

/**
 * Service pour gérer les actes de gentillesse
 */
export const kindnessActService = {
  /**
   * Récupérer tous les actes
   */
  async getAllActs(): Promise<KindnessAct[]> {
    return apiService.get<KindnessAct[]>('/acts');
  },
  
  /**
   * Récupérer un acte par son ID
   */
  async getActById(id: string): Promise<KindnessAct> {
    return apiService.get<KindnessAct>(`/acts/${id}`);
  },
  
  /**
   * Créer un nouvel acte de gentillesse
   */
  async createAct(act: Omit<KindnessAct, 'id' | 'date' | 'reactions' | 'author'>): Promise<KindnessAct> {
    return apiService.post<KindnessAct>('/acts', act);
  },
  
  /**
   * Réagir à un acte de gentillesse
   */
  async reactToAct(id: string, reactionType: 'hearts' | 'inspired' | 'thanks'): Promise<{success: boolean; reactions: Record<string, number>}> {
    return apiService.post<{success: boolean; reactions: Record<string, number>}>(`/acts/${id}/react`, { reactionType });
  },
  
  /**
   * Récupérer des actes filtrés et triés
   */
  async getFilteredActs(filters: { category?: string, sortBy?: string, anonymous?: boolean }): Promise<KindnessAct[]> {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.anonymous !== undefined) queryParams.append('anonymous', filters.anonymous.toString());
    
    const queryString = queryParams.toString();
    return apiService.get<KindnessAct[]>(`/acts?${queryString}`);
  }
};
