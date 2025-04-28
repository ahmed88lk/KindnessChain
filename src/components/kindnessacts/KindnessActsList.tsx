import React, { useState, useEffect } from 'react';
import { actsService } from '../../services/actsService';
import { KindnessAct } from '../../types';
import KindnessActCard from './KindnessActCard';

const KindnessActsList: React.FC = () => {
  const [acts, setActs] = useState<KindnessAct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchActs = async () => {
      try {
        setLoading(true);
        const data = await actsService.getAllActs();
        setActs(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des actes de gentillesse');
        console.error('Failed to fetch kindness acts:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActs();
  }, []);
  
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
  
  if (acts.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700">Aucun acte de gentillesse disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {acts.map((act) => (
        <KindnessActCard key={act.id} act={act} onReaction={(id, type) => {
          actsService.reactToAct(id, type).then(({ reactions }) => {
            // Mettre à jour l'état local avec les nouvelles réactions
            setActs(acts.map(a => 
              a.id === id ? { ...a, reactions } : a
            ));
          }).catch(err => {
            console.error('Erreur lors de la réaction:', err);
          });
        }} />
      ))}
    </div>
  );
};

export default KindnessActsList;
