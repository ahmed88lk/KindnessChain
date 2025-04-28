const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { KindnessAct, User, Challenge, UserChallenge } = require('../models');
const { auth } = require('./auth');

// Get general analytics data
router.get('/', async (req, res) => {
  try {
    // Total acts
    const totalActs = await KindnessAct.count();
    
    // Total users
    const totalUsers = await User.count();
    
    // Total challenges
    const totalChallenges = await Challenge.count();
    
    // Total countries (unique locations)
    const distinctLocations = await KindnessAct.findAll({
      attributes: [[sequelize.fn('JSON_EXTRACT', sequelize.col('location'), '$.name'), 'location_name']],
      where: sequelize.literal('location IS NOT NULL'),
      group: [sequelize.fn('JSON_EXTRACT', sequelize.col('location'), '$.name')],
      raw: true
    });
    const totalCountries = distinctLocations.length;
    
    // Acts by category
    const actsByCategory = await KindnessAct.findAll({
      attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['category'],
      raw: true
    });
    
    // Transform to expected format
    const formattedActsByCategory = actsByCategory.map(item => ({
      category: item.category,
      count: parseInt(item.count, 10)
    }));
    
    // Top challenges by participants
    const topChallenges = await Challenge.findAll({
      attributes: ['title', 'participants'],
      order: [['participants', 'DESC']],
      limit: 3,
      raw: true
    });
    
    // Format top challenges
    const formattedTopChallenges = topChallenges.map(challenge => ({
      name: challenge.title,
      participants: challenge.participants
    }));
    
    // Calculate impact estimates based on categories
    const environmentalActs = await KindnessAct.count({ where: { category: 'Environmental' } });
    const donationActs = await KindnessAct.count({ where: { category: 'Donation' } });
    const volunteeringActs = await KindnessAct.count({ where: { category: 'Volunteering' } });
    
    // Estimate impact (these are simplified calculations)
    const impactEstimates = {
      treesPlanted: Math.floor(environmentalActs * 2.5),
      mealsProvided: Math.floor(donationActs * 4),
      hoursVolunteered: Math.floor(volunteeringActs * 3),
      moneyDonated: Math.floor((donationActs + environmentalActs) * 15)
    };
    
    // Recent activity
    const recentActs = await KindnessAct.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    // Format recent activity
    const recentActivity = recentActs.map(act => {
      const plainAct = act.get({ plain: true });
      
      // Parse JSON fields
      if (typeof plainAct.reactions === 'string') {
        plainAct.reactions = JSON.parse(plainAct.reactions);
      }
      
      // Handle author data
      if (!plainAct.anonymous && plainAct.user) {
        plainAct.author = plainAct.user;
        delete plainAct.user;
      } else if (plainAct.anonymous) {
        delete plainAct.user;
      }
      
      return plainAct;
    });
    
    res.json({
      totalActs,
      totalUsers,
      totalChallenges,
      totalCountries,
      actsByCategory: formattedActsByCategory,
      topChallenges: formattedTopChallenges,
      impactEstimates,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get heatmap data
router.get('/heatmap', async (req, res) => {
  try {
    // Get all acts with location data
    const acts = await KindnessAct.findAll({
      attributes: ['location'],
      where: sequelize.literal('location IS NOT NULL'),
      raw: true
    });
    
    // Extract location data and format for heatmap
    const heatmapData = acts
      .filter(act => act.location)
      .map(act => {
        let location;
        try {
          location = typeof act.location === 'string' ? JSON.parse(act.location) : act.location;
        } catch (e) {
          return null;
        }
        
        if (!location || !location.lat || !location.lng) return null;
        
        return {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
          weight: Math.floor(Math.random() * 50) + 30 // Random weight between 30-80
        };
      })
      .filter(Boolean); // Remove nulls
    
    res.json(heatmapData);
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
