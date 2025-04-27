import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Award } from 'lucide-react';
import { KindnessAct } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { analyzeKindnessSentiment } from '../../services/geminiService';

interface KindnessCardProps {
  act: KindnessAct;
}

const KindnessCard: React.FC<KindnessCardProps> = ({ act }) => {
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Only analyze sentiment for non-anonymous posts
    if (!act.anonymous && act.description) {
      const analyzeText = async () => {
        setIsAnalyzing(true);
        try {
          const score = await analyzeKindnessSentiment(act.description);
          setSentimentScore(score);
        } catch (error) {
          console.error("Failed to analyze sentiment:", error);
        } finally {
          setIsAnalyzing(false);
        }
      };
      
      analyzeText();
    }
  }, [act.anonymous, act.description]);

  return (
    <Card className="mb-4 transform transition-transform duration-300 hover:-translate-y-1">
      <CardContent>
        <div className="flex items-start mb-3">
          {act.anonymous ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">👤</span>
            </div>
          ) : (
            <img
              src={act.author?.avatar}
              alt={act.author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className="ml-3 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">
                  {act.anonymous ? 'Anonymous' : act.author?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(act.date))}
                  {' · '}
                  {act.location.name}
                </p>
              </div>
              <Badge variant="primary" className="ml-2">
                {act.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">{act.title}</h3>
        <p className="text-gray-700 mb-4">{act.description}</p>
        
        {sentimentScore !== null && !act.anonymous && (
          <div className="mb-4">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  sentimentScore > 80 ? 'bg-green-500' : 
                  sentimentScore > 60 ? 'bg-teal-500' : 
                  sentimentScore > 40 ? 'bg-yellow-500' : 
                  'bg-orange-500'
                }`} 
                style={{ width: `${sentimentScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              AI Kindness Rating: {sentimentScore}/100 {isAnalyzing && '(Analyzing...)'}
            </p>
          </div>
        )}
        
        {act.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {act.tags.map((tag) => (
              <Badge key={tag} variant="default">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        
        {act.media && (
          <div className="rounded-lg overflow-hidden mb-4">
            {act.media.type === 'image' && (
              <img
                src={act.media.url}
                alt={act.title}
                className="w-full h-64 object-cover"
              />
            )}
            {act.media.type === 'video' && (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <span>Video content</span>
              </div>
            )}
            {act.media.type === 'audio' && (
              <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
                <span>Audio recording</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5 mr-1" />
            <span>{act.reactions.hearts}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-teal-500 transition-colors">
            <Award className="h-5 w-5 mr-1" />
            <span>{act.reactions.inspired}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-purple-500 transition-colors">
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{act.reactions.thanks}</span>
          </button>
        </div>
        <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <Share2 className="h-5 w-5 mr-1" />
          <span className="text-sm">Share</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default KindnessCard;