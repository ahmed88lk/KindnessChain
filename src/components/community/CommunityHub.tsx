import React, { useState, useEffect } from 'react';
import { Award, Users, Trophy } from 'lucide-react';
import { communityService, CommunityMember, LeaderboardEntry } from '../../services/communityService';

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'ambassadors'>('leaderboard');
  const [ambassadors, setAmbassadors] = useState<CommunityMember[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'ambassadors') {
          const data = await communityService.getAmbassadors();
          setAmbassadors(data);
        } else {
          const data = await communityService.getLeaderboard('acts', 10);
          setLeaderboard(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load community data');
        console.error('Error fetching community data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h3 className="font-bold mb-2">Erreur</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (activeTab === 'ambassadors') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ambassadors.map((ambassador) => (
            <div key={ambassador.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src={ambassador.avatar}
                  alt={ambassador.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-lg">{ambassador.name}</h3>
                  <p className="text-gray-500">{ambassador.location}</p>
                </div>
              </div>
              <div className="flex items-center text-amber-500">
                <Award className="h-5 w-5 mr-1" />
                <span>{ambassador.acts} acts of kindness</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {leaderboard.map((entry) => (
          <div
            key={entry.userId}
            className="flex items-center py-4 px-6 border-b border-gray-100 hover:bg-gray-50"
          >
            <div
              className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold mr-4 ${
                entry.rank === 1
                  ? 'bg-amber-100 text-amber-800'
                  : entry.rank === 2
                  ? 'bg-gray-200 text-gray-800'
                  : entry.rank === 3
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {entry.rank}
            </div>
            <img
              src={entry.avatar}
              alt={entry.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-4 flex-grow">
              <div className="font-medium">{entry.name}</div>
            </div>
            <div className="flex items-center text-teal-600 font-medium">
              <Trophy className="h-4 w-4 mr-1" />
              {entry.score}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Community</h2>
      
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === 'leaderboard'
              ? 'bg-teal-100 text-teal-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy className="h-5 w-5 mr-2" />
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === 'ambassadors'
              ? 'bg-teal-100 text-teal-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('ambassadors')}
        >
          <Users className="h-5 w-5 mr-2" />
          Ambassadors
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default CommunityHub;