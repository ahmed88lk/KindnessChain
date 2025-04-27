export interface KindnessAct {
  id: string;
  title: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  date: string;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  };
  tags: string[];
  anonymous: boolean;
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
  reactions: {
    hearts: number;
    inspired: number;
    thanks: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  participants: number;
  deadline: string;
  isTeamChallenge: boolean;
  image: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  kindnessStreak: number;
  kindnessCoins: number;
  acts: number;
  isAmbassador: boolean;
  joinedChallenges: string[];
}

export type SortOption = 'trending' | 'recent' | 'nearby';