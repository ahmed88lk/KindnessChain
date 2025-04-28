import React, { useEffect, useState } from 'react';
import { BarChart2, Award, Users, Globe } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import { analyticsService, Analytics } from '../../services/analyticsService';

const ImpactMetrics: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getAnalytics();
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load analytics data');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <h3 className="font-bold mb-2">Erreur</h3>
        <p>{error || 'Erreur inconnue lors du chargement des données'}</p>
      </div>
    );
  }

  const stats = [
    {
      name: 'Actes',
      value: analytics.totalActs.toLocaleString(),
      icon: Award,
      color: 'text-teal-500',
      bgColor: 'bg-teal-100',
    },
    {
      name: 'Utilisateurs',
      value: analytics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Défis',
      value: analytics.totalChallenges.toLocaleString(),
      icon: BarChart2,
      color: 'text-rose-500',
      bgColor: 'bg-rose-100',
    },
    {
      name: 'Pays',
      value: analytics.totalCountries.toLocaleString(),
      icon: Globe,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acts by Category</h3>
            <div className="space-y-4">
              {analytics.actsByCategory.map((item) => (
                <div key={item.category} className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span className="text-gray-500">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-teal-500 h-2.5 rounded-full"
                      style={{ width: `${(item.count / analytics.totalActs) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Estimated Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Trees Planted</p>
                <p className="text-2xl font-bold text-green-800">
                  {analytics.impactEstimates.treesPlanted.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 mb-1">Meals Provided</p>
                <p className="text-2xl font-bold text-blue-800">
                  {analytics.impactEstimates.mealsProvided.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Hours Volunteered</p>
                <p className="text-2xl font-bold text-purple-800">
                  {analytics.impactEstimates.hoursVolunteered.toLocaleString()}
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-amber-700 mb-1">Money Donated</p>
                <p className="text-2xl font-bold text-amber-800">
                  ${analytics.impactEstimates.moneyDonated.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Challenges</h3>
          <div className="space-y-4">
            {analytics.topChallenges.map((challenge, index) => (
              <div key={challenge.name} className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-amber-100 text-amber-800' :
                  index === 1 ? 'bg-gray-200 text-gray-700' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{challenge.name}</span>
                    <span className="text-gray-500">{challenge.participants.toLocaleString()} participants</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-amber-500' :
                        index === 1 ? 'bg-gray-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${(challenge.participants / 15000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactMetrics;