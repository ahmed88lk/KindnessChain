import { apiService } from './apiService';

export interface CommunityMember {
  id: string;
  name: string;
  location: string;
  acts: number;
  avatar: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
}

/**
 * Service pour gérer les données communautaires
 */
export const communityService = {
  /**
   * Récupérer les ambassadeurs de la communauté
   */
  async getAmbassadors(): Promise<CommunityMember[]> {
    return apiService.get<CommunityMember[]>('/community/ambassadors');
  },
  
  /**
   * Récupérer le classement
   */
  async getLeaderboard(type: 'acts' | 'coins' = 'acts', limit: number = 10): Promise<LeaderboardEntry[]> {
    return apiService.get<LeaderboardEntry[]>(`/community/leaderboard?type=${type}&limit=${limit}`);
  }
};
