import React from 'react';
import { TrendingUp, Users, Award, Globe, Calendar, Heart } from 'lucide-react';
import { mockAnalytics } from '../../data/mockData';
import Card, { CardContent } from '../ui/Card';

const ImpactMetrics: React.FC = () => {
  const stats = [
    {
      name: 'Total Acts',
      value: mockAnalytics.totalActs.toLocaleString(),
      icon: Heart,
      color: 'text-teal-500',
      bgColor: 'bg-teal-100',
    },
    {
      name: 'Total Users',
      value: mockAnalytics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Challenges',
      value: mockAnalytics.totalChallenges.toLocaleString(),
      icon: Award,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      name: 'Countries',
      value: mockAnalytics.totalCountries.toLocaleString(),
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
        {/* Acts by Category Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acts by Category</h3>
            <div className="space-y-4">
              {mockAnalytics.actsByCategory.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span className="text-gray-500">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-teal-500 h-2.5 rounded-full"
                      style={{ width: `${(item.count / mockAnalytics.totalActs) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Impact Estimates */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Estimated Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Trees Planted</p>
                <p className="text-2xl font-bold text-green-800">
                  {mockAnalytics.impactEstimates.treesPlanted.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 mb-1">Meals Provided</p>
                <p className="text-2xl font-bold text-blue-800">
                  {mockAnalytics.impactEstimates.mealsProvided.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Hours Volunteered</p>
                <p className="text-2xl font-bold text-purple-800">
                  {mockAnalytics.impactEstimates.hoursVolunteered.toLocaleString()}
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-amber-700 mb-1">Money Donated</p>
                <p className="text-2xl font-bold text-amber-800">
                  ${mockAnalytics.impactEstimates.moneyDonated.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Challenges */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Challenges</h3>
          <div className="space-y-4">
            {mockAnalytics.topChallenges.map((challenge, index) => (
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