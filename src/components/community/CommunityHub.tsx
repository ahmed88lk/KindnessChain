import React from 'react';
import { Search, MapPin, Users, Calendar } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

const CommunityHub: React.FC = () => {
  const localGroups = [
    {
      id: '1',
      name: 'Berlin Volunteers',
      members: 248,
      location: 'Berlin, Germany',
      category: 'Volunteering',
      image: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      name: 'NYC Clean Streets',
      members: 187,
      location: 'New York, USA',
      category: 'Environmental',
      image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      name: 'Sydney Food Bank',
      members: 142,
      location: 'Sydney, Australia',
      category: 'Donation',
      image: 'https://images.pexels.com/photos/6591154/pexels-photo-6591154.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      name: 'Tokyo Tech Mentors',
      members: 95,
      location: 'Tokyo, Japan',
      category: 'Education',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];
  
  const ambassadors = [
    {
      id: '1',
      name: 'Maria Rodriguez',
      location: 'Madrid, Spain',
      acts: 87,
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      name: 'Ali Hassan',
      location: 'Cairo, Egypt',
      acts: 64,
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      name: 'Leila Wong',
      location: 'Singapore',
      acts: 93,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];
  
  const upcomingEvents = [
    {
      id: '1',
      title: 'Beach Cleanup Day',
      date: '2025-05-25T09:00:00Z',
      location: 'Santa Monica Beach, CA',
      attendees: 78,
    },
    {
      id: '2',
      title: 'Senior Center Volunteering',
      date: '2025-05-30T14:00:00Z',
      location: 'Golden Days Senior Center, Chicago',
      attendees: 24,
    },
    {
      id: '3',
      title: 'Plant-a-Tree Initiative',
      date: '2025-06-05T10:00:00Z',
      location: 'Centennial Park, Atlanta',
      attendees: 42,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Hub</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for groups, events, or ambassadors..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Local Groups */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Groups</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localGroups.map((group) => (
              <Card key={group.id} className="h-full transform transition-all duration-300 hover:shadow-md">
                <div 
                  className="h-32 bg-cover bg-center rounded-t-lg" 
                  style={{ backgroundImage: `url(${group.image})` }}
                >
                  <div className="h-full w-full bg-black/30 rounded-t-lg flex items-end p-3">
                    <Badge variant="primary">{group.category}</Badge>
                  </div>
                </div>
                <CardContent>
                  <h4 className="font-medium text-gray-900 mb-1">{group.name}</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{group.members} members</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Kindness Ambassadors */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Kindness Ambassadors</h3>
            <Card>
              <CardContent className="p-0">
                {ambassadors.map((ambassador, index) => (
                  <div 
                    key={ambassador.id}
                    className={`flex items-center p-4 ${
                      index !== ambassadors.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <img
                      src={ambassador.avatar}
                      alt={ambassador.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{ambassador.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{ambassador.location}</span>
                      </div>
                      <p className="text-xs text-teal-600 mt-1">
                        {ambassador.acts} acts of kindness
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Events */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <Card>
              <CardContent className="p-0">
                {upcomingEvents.map((event, index) => {
                  const eventDate = new Date(event.date);
                  return (
                    <div 
                      key={event.id}
                      className={`p-4 ${
                        index !== upcomingEvents.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-teal-100 rounded-md p-2 text-center">
                          <p className="text-xs font-medium text-teal-800">
                            {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                          </p>
                          <p className="text-lg font-bold text-teal-800">
                            {eventDate.getDate()}
                          </p>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;