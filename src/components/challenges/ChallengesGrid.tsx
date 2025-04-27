import React from 'react';
import ChallengeCard from './ChallengeCard';
import { mockChallenges } from '../../data/mockData';
import { mockUser } from '../../data/mockData';

const ChallengesGrid: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenges</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockChallenges.map((challenge) => (
          <ChallengeCard 
            key={challenge.id} 
            challenge={challenge} 
            isJoined={mockUser.joinedChallenges.includes(challenge.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesGrid;