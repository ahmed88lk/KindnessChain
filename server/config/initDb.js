const bcrypt = require('bcryptjs');
require('dotenv').config();

const { sequelize } = require('./database');
const { User, KindnessAct, Challenge } = require('../models');

// Fonction pour initialiser la base de données
const initializeDatabase = async () => {
  try {
    // Synchroniser les modèles avec la base de données
    console.log('Synchronisation des modèles...');
    await sequelize.sync({ force: true }); // Attention: { force: true } supprime toutes les tables existantes
    console.log('Synchronisation terminée.');
    
    // Créer les utilisateurs admin et modérateur
    console.log('Création des utilisateurs spéciaux...');
    const salt = await bcrypt.genSalt(10);
    
    await User.create({
      id: 'admin_1',
      name: 'Admin',
      email: 'admin@kindnesschain.com',
      password: await bcrypt.hash('admin123', salt),
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=purple',
      kindnessStreak: 0,
      kindnessCoins: 1000,
      acts: 0,
      isAmbassador: true,
      language: 'fr',
      role: 'admin'
    });
    
    await User.create({
      id: 'mod_1',
      name: 'Modérateur',
      email: 'moderator@kindnesschain.com',
      password: await bcrypt.hash('mod123', salt),
      avatar: 'https://ui-avatars.com/api/?name=Moderator&background=blue',
      kindnessStreak: 0,
      kindnessCoins: 500,
      acts: 0,
      isAmbassador: true,
      language: 'fr',
      role: 'moderator'
    });
    
    // Créer quelques utilisateurs de test
    const testUsers = await Promise.all([
      User.create({
        name: 'Mark Johnson',
        email: 'mark@example.com',
        password: await bcrypt.hash('password123', salt),
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
      }),
      User.create({
        name: 'Sarah Lee',
        email: 'sarah@example.com',
        password: await bcrypt.hash('password123', salt),
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
      }),
      User.create({
        name: 'David Chen',
        email: 'david@example.com',
        password: await bcrypt.hash('password123', salt),
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300'
      })
    ]);
    
    console.log('Utilisateurs créés.');
    
    // Créer des défis
    console.log('Création des défis...');
    const challenges = await Promise.all([
      Challenge.create({
        title: 'Compliment 3 Strangers',
        description: 'Brighten someone\'s day with a genuine compliment. Do this for three different people this week.',
        category: 'Social',
        difficulty: 'easy',
        points: 50,
        participants: 0,
        deadline: new Date('2025-12-31'),
        isTeamChallenge: false,
        image: 'https://images.pexels.com/photos/7062550/pexels-photo-7062550.jpeg?auto=compress&cs=tinysrgb&w=800'
      }),
      Challenge.create({
        title: 'Community Clean-up',
        description: 'Gather a team and clean up litter in your local park or beach. Take before and after photos!',
        category: 'Environmental',
        difficulty: 'medium',
        points: 150,
        participants: 0,
        deadline: new Date('2025-11-25'),
        isTeamChallenge: true,
        image: 'https://images.pexels.com/photos/7656461/pexels-photo-7656461.jpeg?auto=compress&cs=tinysrgb&w=800'
      }),
      Challenge.create({
        title: 'Write Thank You Notes',
        description: 'Write 5 handwritten thank you notes to people who have made a difference in your life.',
        category: 'Gratitude',
        difficulty: 'easy',
        points: 75,
        participants: 0,
        deadline: new Date('2025-12-20'),
        isTeamChallenge: false,
        image: 'https://images.pexels.com/photos/7087668/pexels-photo-7087668.jpeg?auto=compress&cs=tinysrgb&w=800'
      })
    ]);
    console.log('Défis créés.');
    
    // Créer des actes de gentillesse
    console.log('Création des actes de gentillesse...');
    await Promise.all([
      KindnessAct.create({
        title: 'Helped an elderly neighbor with groceries',
        description: 'I noticed my elderly neighbor struggling with her shopping bags and offered to help carry them to her apartment. We had a lovely chat, and she shared stories about her life.',
        category: 'Community Support',
        location: JSON.stringify({
          lat: 40.7128,
          lng: -74.006,
          name: 'New York, USA'
        }),
        date: new Date(),
        media: JSON.stringify({
          type: 'image',
          url: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=800'
        }),
        tags: JSON.stringify(['elderly', 'community', 'groceries']),
        anonymous: false,
        userId: testUsers[0].id,
        reactions: JSON.stringify({
          hearts: 23,
          inspired: 12,
          thanks: 8
        })
      }),
      KindnessAct.create({
        title: 'Planted 5 trees in my local park',
        description: 'Joined a community initiative to increase green spaces in our neighborhood. We planted native species that will help support local wildlife.',
        category: 'Environmental',
        location: JSON.stringify({
          lat: 51.5074,
          lng: -0.1278,
          name: 'London, UK'
        }),
        date: new Date(),
        media: JSON.stringify({
          type: 'image',
          url: 'https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=800'
        }),
        tags: JSON.stringify(['environment', 'trees', 'community']),
        anonymous: true,
        reactions: JSON.stringify({
          hearts: 45,
          inspired: 32,
          thanks: 15
        })
      }),
      KindnessAct.create({
        title: 'Donated to local food bank',
        description: "Gathered non-perishable food items and donated them to the local food bank. There's a growing need in our community, especially during these challenging times.",
        category: 'Donation',
        location: JSON.stringify({
          lat: 43.6532,
          lng: -79.3832,
          name: 'Toronto, Canada'
        }),
        date: new Date(),
        media: JSON.stringify({
          type: 'image',
          url: 'https://images.pexels.com/photos/6994992/pexels-photo-6994992.jpeg?auto=compress&cs=tinysrgb&w=800'
        }),
        tags: JSON.stringify(['donation', 'foodbank', 'community']),
        anonymous: false,
        userId: testUsers[1].id,
        reactions: JSON.stringify({
          hearts: 67,
          inspired: 41,
          thanks: 23
        })
      })
    ]);
    console.log('Actes de gentillesse créés.');
    
    console.log('Base de données initialisée avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

// Exécuter l'initialisation
initializeDatabase();
