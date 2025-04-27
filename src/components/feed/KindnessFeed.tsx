import React, { useState } from 'react';
import KindnessCard from './KindnessCard';
import FeedFilters from './FeedFilters';
import { SortOption, KindnessAct } from '../../types';
import { mockKindnessActs } from '../../data/mockData';

const KindnessFeed: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortOption>('trending');
  
  // Simulated sorting based on the active sort option
  const getSortedActs = (): KindnessAct[] => {
    if (activeSort === 'trending') {
      return [...mockKindnessActs].sort((a, b) => 
        (b.reactions.hearts + b.reactions.inspired) - 
        (a.reactions.hearts + a.reactions.inspired)
      );
    } else if (activeSort === 'recent') {
      return [...mockKindnessActs].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      // 'nearby' sort would use geolocation in a real app
      return mockKindnessActs;
    }
  };
  
  const sortedActs = getSortedActs();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspiration Feed</h2>
      
      <FeedFilters activeSort={activeSort} setActiveSort={setActiveSort} />
      
      <div className="space-y-4">
        {sortedActs.map((act) => (
          <KindnessCard key={act.id} act={act} />
        ))}
      </div>
    </div>
  );
};

export default KindnessFeed;