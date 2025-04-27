import React from 'react';
import { TrendingUp, Clock, MapPin } from 'lucide-react';
import { SortOption } from '../../types';

interface FeedFiltersProps {
  activeSort: SortOption;
  setActiveSort: (sort: SortOption) => void;
}

const FeedFilters: React.FC<FeedFiltersProps> = ({ activeSort, setActiveSort }) => {
  const sortOptions: { id: SortOption; label: string; icon: React.ElementType }[] = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'nearby', label: 'Near You', icon: MapPin },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
      <div className="flex flex-wrap">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setActiveSort(option.id)}
              className={`flex items-center px-4 py-2 rounded-md mr-2 text-sm font-medium transition-colors ${
                activeSort === option.id
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4 mr-1" />
              {option.label}
            </button>
          );
        })}
        
        <div className="flex ml-auto">
          <select
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="community">Community Support</option>
            <option value="environmental">Environmental</option>
            <option value="donation">Donation</option>
            <option value="random">Random Acts</option>
            <option value="volunteering">Volunteering</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;