import React, { useState } from 'react';
import { Award, Users, Clock } from 'lucide-react';
import Card, { CardContent, CardFooter } from '../ui/Card';
import { Challenge } from '../../types';
import Button from '../ui/Button';
import { getCurrentUser } from '../../services/authService';

interface ChallengeCardProps {
  challenge: Challenge;
  isJoined: boolean;
  onJoinChallenge: (challengeId: string) => Promise<boolean>;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isJoined, onJoinChallenge }) => {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(isJoined);
  
  const formatDistanceToNow = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffTime = dateObj.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `in ${diffDays} days` : 'today';
  };

  const handleJoinChallenge = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert("Veuillez vous connecter pour rejoindre ce défi");
      return;
    }
    
    if (joined) {
      // Si déjà rejoint, on pourrait implémenter une navigation vers le détail du défi
      return;
    }
    
    try {
      setLoading(true);
      const success = await onJoinChallenge(challenge.id);
      if (success) {
        setJoined(true);
      }
    } catch (error: any) {
      console.error('Failed to join challenge:', error);
      alert(error.message || "Erreur lors de la participation au défi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="h-40 bg-cover bg-center rounded-t-lg" style={{backgroundImage: `url(${challenge.image})`}}>
        <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <span className={`text-white text-sm font-medium px-2 py-1 rounded ${
            challenge.difficulty === 'easy' ? 'bg-green-500' : 
            challenge.difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
          }`}>
            {challenge.difficulty.toUpperCase()}
          </span>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge.description}</p>
        
        <div>
          <div className="flex justify-between text-sm mb-4">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span>{challenge.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Award className="h-4 w-4 mr-1" />
              <span>{challenge.points} points</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              Ends {formatDistanceToNow(challenge.deadline)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={joined ? "outline" : "primary"}
          className="w-full"
          disabled={loading}
          onClick={handleJoinChallenge}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-current rounded-full mr-2"></span>
              Chargement...
            </span>
          ) : (
            joined ? "Voir la progression" : "Rejoindre le défi"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;