import { KindnessAct, Challenge, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Jane Doe',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
  kindnessStreak: 7,
  kindnessCoins: 435,
  acts: 23,
  isAmbassador: false,
  joinedChallenges: ['1', '3'],
};

export const mockKindnessActs: KindnessAct[] = [
  {
    id: '1',
    title: 'Helped an elderly neighbor with groceries',
    description: 'I noticed my elderly neighbor struggling with her shopping bags and offered to help carry them to her apartment. We had a lovely chat, and she shared stories about her life.',
    category: 'Community Support',
    location: {
      lat: 40.7128,
      lng: -74.006,
      name: 'New York, USA',
    },
    date: '2025-05-15T14:32:00Z',
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    tags: ['elderly', 'community', 'groceries'],
    anonymous: false,
    author: {
      id: '2',
      name: 'Mark Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    reactions: {
      hearts: 23,
      inspired: 12,
      thanks: 8,
    },
  },
  {
    id: '2',
    title: 'Planted 5 trees in my local park',
    description: 'Joined a community initiative to increase green spaces in our neighborhood. We planted native species that will help support local wildlife.',
    category: 'Environmental',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      name: 'London, UK',
    },
    date: '2025-05-14T09:15:00Z',
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    tags: ['environment', 'trees', 'community'],
    anonymous: true,
    reactions: {
      hearts: 45,
      inspired: 32,
      thanks: 15,
    },
  },
  {
    id: '3',
    title: 'Donated books to children\'s hospital',
    description: 'Collected children\'s books from friends and neighbors to donate to the pediatric ward at our local hospital. Reading brings so much joy to the kids during their stay.',
    category: 'Donation',
    location: {
      lat: 48.8566,
      lng: 2.3522,
      name: 'Paris, France',
    },
    date: '2025-05-13T16:45:00Z',
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    tags: ['books', 'children', 'hospital', 'donation'],
    anonymous: false,
    author: {
      id: '3',
      name: 'Sarah Williams',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    reactions: {
      hearts: 67,
      inspired: 41,
      thanks: 23,
    },
  },
  {
    id: '4',
    title: 'Paid for a stranger\'s coffee',
    description: 'Was in line at the coffee shop and decided to pay for the person behind me. It was a small gesture but hopefully brightened their day!',
    category: 'Random Acts',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: 'San Francisco, USA',
    },
    date: '2025-05-15T08:20:00Z',
    tags: ['coffee', 'payitforward'],
    anonymous: true,
    reactions: {
      hearts: 19,
      inspired: 15,
      thanks: 7,
    },
  },
  {
    id: '5',
    title: 'Volunteered at animal shelter',
    description: 'Spent the afternoon walking dogs and caring for cats at the local animal shelter. These animals need love and attention while they wait for their forever homes.',
    category: 'Volunteering',
    location: {
      lat: 35.6762,
      lng: 139.6503,
      name: 'Tokyo, Japan',
    },
    date: '2025-05-12T13:10:00Z',
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    tags: ['animals', 'volunteer', 'shelter'],
    anonymous: false,
    author: {
      id: '4',
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    reactions: {
      hearts: 82,
      inspired: 63,
      thanks: 29,
    },
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Compliment 3 Strangers',
    description: 'Brighten someone\'s day with a genuine compliment. Do this for three different people this week.',
    category: 'Social',
    difficulty: 'easy',
    points: 50,
    participants: 1243,
    deadline: '2025-05-22T23:59:59Z',
    isTeamChallenge: false,
    image: 'https://images.pexels.com/photos/7062550/pexels-photo-7062550.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Community Clean-up',
    description: 'Gather a team and clean up litter in your local park or beach. Take before and after photos!',
    category: 'Environmental',
    difficulty: 'medium',
    points: 150,
    participants: 568,
    deadline: '2025-05-25T23:59:59Z',
    isTeamChallenge: true,
    image: 'https://images.pexels.com/photos/7656461/pexels-photo-7656461.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Write Thank You Notes',
    description: 'Write 5 handwritten thank you notes to people who have made a difference in your life.',
    category: 'Gratitude',
    difficulty: 'easy',
    points: 75,
    participants: 892,
    deadline: '2025-05-20T23:59:59Z',
    isTeamChallenge: false,
    image: 'https://images.pexels.com/photos/7087668/pexels-photo-7087668.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Schools vs. Corporations',
    description: 'Join a massive kindness competition between schools and corporations. Perform acts of kindness and log them to earn points for your team!',
    category: 'Competition',
    difficulty: 'hard',
    points: 300,
    participants: 12568,
    deadline: '2025-06-01T23:59:59Z',
    isTeamChallenge: true,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

export const mockHeatmapData = [
  { lat: 40.7128, lng: -74.006, weight: 85 }, // New York
  { lat: 34.0522, lng: -118.2437, weight: 67 }, // Los Angeles
  { lat: 51.5074, lng: -0.1278, weight: 93 }, // London
  { lat: 48.8566, lng: 2.3522, weight: 78 }, // Paris
  { lat: 35.6762, lng: 139.6503, weight: 62 }, // Tokyo
  { lat: -33.8688, lng: 151.2093, weight: 45 }, // Sydney
  { lat: 55.7558, lng: 37.6173, weight: 38 }, // Moscow
  { lat: 19.4326, lng: -99.1332, weight: 72 }, // Mexico City
  { lat: -22.9068, lng: -43.1729, weight: 56 }, // Rio de Janeiro
  { lat: 28.6139, lng: 77.209, weight: 83 }, // New Delhi
  { lat: 37.7749, lng: -122.4194, weight: 91 }, // San Francisco
  { lat: 1.3521, lng: 103.8198, weight: 59 }, // Singapore
  { lat: 25.2048, lng: 55.2708, weight: 47 }, // Dubai
  { lat: 41.9028, lng: 12.4964, weight: 64 }, // Rome
  { lat: 52.52, lng: 13.405, weight: 71 }, // Berlin
];

export const mockAnalytics = {
  totalActs: 28475,
  totalUsers: 12543,
  totalChallenges: 145,
  totalCountries: 83,
  actsByCategory: [
    { category: 'Community Support', count: 8976 },
    { category: 'Environmental', count: 5432 },
    { category: 'Donation', count: 6891 },
    { category: 'Random Acts', count: 4327 },
    { category: 'Volunteering', count: 2849 },
  ],
  topChallenges: [
    { name: 'Schools vs. Corporations', participants: 12568 },
    { name: 'Global Cleanup Day', participants: 8765 },
    { name: 'Gratitude Chain', participants: 7654 },
  ],
  impactEstimates: {
    treesPlanted: 1245,
    mealsProvided: 8732,
    hoursVolunteered: 23541,
    moneyDonated: 78250,
  },
};