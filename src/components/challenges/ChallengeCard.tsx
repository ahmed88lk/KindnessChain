import React from 'react';
import { Users, Clock, Award } from 'lucide-react';
import { Challenge } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface ChallengeCardProps {
  challenge: Challenge;
  isJoined?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  challenge, 
  isJoined = false 
}) => {
  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'error',
  };

  return (
    <Card className="h-full flex flex-col transform transition-all duration-300 hover:shadow-lg">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${challenge.image})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white mb-1">{challenge.title}</h3>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={difficultyColors[challenge.difficulty] as any} 
              className="uppercase text-xs"
            >
              {challenge.difficulty}
            </Badge>
            {challenge.isTeamChallenge && (
              <Badge variant="secondary" className="uppercase text-xs">
                Team Challenge
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-4">{challenge.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
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
              Ends {formatDistanceToNow(new Date(challenge.deadline))}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={isJoined ? "outline" : "primary"}
          className="w-full"
        >
          {isJoined ? "View Progress" : "Join Challenge"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;