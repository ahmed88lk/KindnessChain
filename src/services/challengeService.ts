import { apiService } from './apiService';
import { Challenge } from '../types';

/**
 * Service pour gérer les défis
 */
export const challengeService = {
  /**
   * Récupérer tous les défis
   */
  async getAllChallenges(): Promise<Challenge[]> {
    return apiService.get<Challenge[]>('/challenges');
  },
  
  /**
   * Récupérer un défi par son ID
   */
  async getChallengeById(id: string): Promise<Challenge> {
    return apiService.get<Challenge>(`/challenges/${id}`);
  },
  
  /**
   * Rejoindre un défi
   */
  async joinChallenge(id: string): Promise<{success: boolean; challenge: Challenge}> {
    return apiService.post<{success: boolean; challenge: Challenge}>(`/challenges/${id}/join`, {});
  }
};
