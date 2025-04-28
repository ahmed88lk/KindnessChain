import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Flag, 
  Settings, 
  BarChart2, 
  Shield
} from 'lucide-react';
import { getCurrentUser, AuthUser } from '../../services/authService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(getCurrentUser());
  
  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart2 },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'content', label: 'Contenu', icon: FileText },
    { id: 'reports', label: 'Signalements', icon: Flag },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  // Statistiques simulées pour le tableau de bord
  const stats = [
    { label: 'Utilisateurs', value: '2,540', change: '+12%' },
    { label: 'Actes de gentillesse', value: '28,475', change: '+24%' },
    { label: 'Signalements', value: '18', change: '-5%' },
    { label: 'Défis', value: '145', change: '+8%' },
  ];

  // Liste simulée des utilisateurs pour l'administration
  const mockUsers = [
    { id: '1', name: 'Mohamed Ali', email: 'mohamed@example.com', role: 'user', status: 'active', date: '2023-04-15' },
    { id: '2', name: 'Leila Ahmad', email: 'leila@example.com', role: 'moderator', status: 'active', date: '2023-03-21' },
    { id: '3', name: 'Omar Farooq', email: 'omar@example.com', role: 'user', status: 'inactive', date: '2023-05-02' },
    { id: '4', name: 'Fatima Khan', email: 'fatima@example.com', role: 'user', status: 'active', date: '2023-01-30' },
    { id: '5', name: 'Yusuf Ibrahim', email: 'yusuf@example.com', role: 'user', status: 'pending', date: '2023-06-11' },
  ];

  // Contenu du tableau de bord en fonction de l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} par rapport au mois dernier
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Activité récente</h3>
              <div className="space-y-4">
                <div className="p-3 bg-teal-50 border-l-4 border-teal-500 rounded">
                  <p className="text-sm">Mohamed Ali a publié un nouvel acte de gentillesse</p>
                  <p className="text-xs text-gray-500 mt-1">Il y a 23 minutes</p>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm">Nouveau signalement sur le contenu #4532</p>
                  <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm">5 nouveaux utilisateurs se sont inscrits</p>
                  <p className="text-xs text-gray-500 mt-1">Aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h2>
            
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b flex justify-between items-center">
                <input 
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  className="px-3 py-2 border rounded-md w-64"
                />
                <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                  + Ajouter un utilisateur
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'moderator' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                              user.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-teal-600 hover:text-teal-900 mr-3">Modifier</button>
                          <button className="text-red-600 hover:text-red-900">Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-3 flex items-center justify-between border-t">
                <div className="text-sm text-gray-700">
                  Affichage des résultats <span className="font-medium">1-5</span> sur <span className="font-medium">28</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">Précédent</button>
                  <button className="px-3 py-1 border rounded bg-teal-50 text-teal-600 text-sm">1</button>
                  <button className="px-3 py-1 border rounded text-sm">2</button>
                  <button className="px-3 py-1 border rounded text-sm">3</button>
                  <button className="px-3 py-1 border rounded text-sm">Suivant</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'content':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Gestion de contenu</h2>
            {/* Contenu pour l'onglet Contenu */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p>Interface de gestion de contenu - À implémenter</p>
            </div>
          </div>
        );
      
      case 'reports':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Signalements</h2>
            {/* Contenu pour l'onglet Signalements */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p>Interface de gestion des signalements - À implémenter</p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Paramètres d'administration</h2>
            {/* Contenu pour l'onglet Paramètres */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p>Interface de paramètres d'administration - À implémenter</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête d'admin */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">
              Administration KindnessChain
            </h1>
          </div>
          {currentUser && (
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">{currentUser.name}</span>
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Barre latérale */}
          <div className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium 
                      ${activeTab === tab.id 
                        ? 'bg-teal-100 text-teal-800' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="md:ml-6 flex-grow">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
