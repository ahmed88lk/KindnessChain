import { apiService } from './apiService';

export interface Analytics {
  totalActs: number;
  totalUsers: number;
  totalChallenges: number;
  totalCountries: number;
  actsByCategory: Array<{category: string; count: number}>;
  topChallenges: Array<{name: string; participants: number}>;
  impactEstimates: {
    treesPlanted: number;
    mealsProvided: number;
    hoursVolunteered: number;
    moneyDonated: number;
  };
  recentActivity: Array<any>;
  heatmapData?: Array<{lat: number; lng: number; weight: number}>;
}

/**
 * Service pour récupérer les données analytiques
 */
export const analyticsService = {
  /**
   * Récupérer les données analytiques générales
   */
  async getAnalytics(): Promise<Analytics> {
    return apiService.get<Analytics>('/analytics');
  },
  
  /**
   * Récupérer les données de carte de chaleur
   */
  async getHeatmapData(): Promise<Array<{lat: number; lng: number; weight: number}>> {
    return apiService.get<Array<{lat: number; lng: number; weight: number}>>('/analytics/heatmap');
  }
};
