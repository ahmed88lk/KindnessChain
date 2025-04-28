import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { KindnessAct } from '../../types';
import { Heart, ThumbsUp, Award } from 'lucide-react';

interface KindnessActCardProps {
  act: KindnessAct;
  onReaction: (id: string, type: 'hearts' | 'inspired' | 'thanks') => void;
}

const KindnessActCard: React.FC<KindnessActCardProps> = ({ act, onReaction }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium text-lg mb-2">{act.title}</h3>
        <p className="text-gray-600 mb-4">{act.description}</p>
        
        {act.media && (
          <div className="mb-4">
            <img 
              src={act.media.url} 
              alt={act.title} 
              className="w-full h-48 object-cover rounded-md" 
            />
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{formatDate(act.date)}</span>
          {act.location && (
            <>
              <span className="mx-2">•</span>
              <span>{act.location.name}</span>
            </>
          )}
        </div>
        
        {!act.anonymous && act.author && (
          <div className="flex items-center mb-4">
            <img 
              src={act.author.avatar} 
              alt={act.author.name} 
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-700">{act.author.name}</span>
          </div>
        )}
        
        {act.tags && act.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {act.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-around mt-4 pt-4 border-t border-gray-100">
          <button 
            className="flex items-center text-rose-500 hover:text-rose-600" 
            onClick={() => onReaction(act.id, 'hearts')}
          >
            <Heart className="h-5 w-5 mr-1" />
            <span>{act.reactions.hearts}</span>
          </button>
          
          <button 
            className="flex items-center text-blue-500 hover:text-blue-600" 
            onClick={() => onReaction(act.id, 'inspired')}
          >
            <ThumbsUp className="h-5 w-5 mr-1" />
            <span>{act.reactions.inspired}</span>
          </button>
          
          <button 
            className="flex items-center text-amber-500 hover:text-amber-600"
            onClick={() => onReaction(act.id, 'thanks')}
          >
            <Award className="h-5 w-5 mr-1" />
            <span>{act.reactions.thanks}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KindnessActCard;
