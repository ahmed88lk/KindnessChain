import React, { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard';
import { getCurrentUser } from '../../services/authService';
import { challengeService } from '../../services/challengeService';
import { Challenge } from '../../types';

const ChallengesGrid: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await challengeService.getAllChallenges();
        setChallenges(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des défis');
        console.error('Failed to fetch challenges:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenges();
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
  
  if (challenges.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700">Aucun défi disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenges</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard 
            key={challenge.id} 
            challenge={challenge} 
            isJoined={currentUser?.joinedChallenges?.includes(challenge.id) || false}
            onJoinChallenge={async (challengeId) => {
              try {
                await challengeService.joinChallenge(challengeId);
                
                // Mettre à jour l'état local avec le nouveau nombre de participants
                setChallenges(challenges.map(c => 
                  c.id === challengeId ? { ...c, participants: c.participants + 1 } : c
                ));
                
                return true;
              } catch (error) {
                console.error("Failed to join challenge:", error);
                return false;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesGrid;