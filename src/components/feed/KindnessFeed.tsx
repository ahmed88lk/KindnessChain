import React, { useState, useEffect } from 'react';
import KindnessCard from './KindnessCard';
import FeedFilters from './FeedFilters';
import { SortOption, KindnessAct } from '../../types';
import { kindnessActService } from '../../services/kindnessActService';

const KindnessFeed: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortOption>('trending');
  const [acts, setActs] = useState<KindnessAct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActs = async () => {
      try {
        setLoading(true);
        // On peut passer le tri au backend dans un système plus élaboré
        const data = await kindnessActService.getAllActs();
        
        let sortedData = [...data];
        // Tri côté client
        if (activeSort === 'trending') {
          sortedData.sort((a, b) => 
            (b.reactions.hearts + b.reactions.inspired) - 
            (a.reactions.hearts + a.reactions.inspired)
          );
        } else if (activeSort === 'recent') {
          sortedData.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        }
        
        setActs(sortedData);
      } catch (err: any) {
        setError(err.message || 'Failed to load kindness acts');
        console.error('Error fetching kindness acts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActs();
  }, [activeSort]);
  
  // Gérer la réaction à un acte
  const handleReaction = async (id: string, type: 'hearts' | 'inspired' | 'thanks') => {
    try {
      const { reactions } = await kindnessActService.reactToAct(id, type);
      
      // Mettre à jour l'état local
      setActs(acts.map(act => 
        act.id === id ? { ...act, reactions } : act
      ));
    } catch (error) {
      console.error('Error while reacting to act:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <h3 className="font-bold mb-2">Erreur</h3>
        <p>{error}</p>
        <button 
          className="mt-4 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspiration Feed</h2>
      
      <FeedFilters activeSort={activeSort} setActiveSort={setActiveSort} />
      
      <div className="space-y-4">
        {acts.length === 0 ? (
          <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200">
            <p className="text-gray-600">Aucun acte de gentillesse trouvé</p>
          </div>
        ) : (
          acts.map((act) => (
            <KindnessCard 
              key={act.id} 
              act={act} 
              onReaction={handleReaction} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KindnessFeed;