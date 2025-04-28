const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { User, KindnessAct } = require('../models');

// Get ambassadors
router.get('/ambassadors', async (req, res) => {
  try {
    const ambassadors = await User.findAll({
      where: { isAmbassador: true },
      attributes: ['id', 'name', 'avatar', 'acts'],
      limit: 10,
      order: [['acts', 'DESC']],
      raw: true
    });
    
    // Format with additional info
    const formattedAmbassadors = ambassadors.map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      acts: user.acts,
      location: ['Cairo, Egypt', 'Madrid, Spain', 'New York, USA', 'Singapore', 'London, UK', 'Paris, France'][Math.floor(Math.random() * 6)] // Random location for demo
    }));
    
    res.json(formattedAmbassadors);
  } catch (error) {
    console.error('Error fetching ambassadors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { type = 'acts', limit = 10 } = req.query;
    
    // Set order field based on type
    const orderField = type === 'acts' ? 'acts' : 'kindnessCoins';
    
    const leaderboard = await User.findAll({
      attributes: ['id', 'name', 'avatar', orderField],
      order: [[orderField, 'DESC']],
      limit: parseInt(limit, 10),
      raw: true
    });
    
    // Format with ranking
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      score: user[orderField],
      rank: index + 1
    }));
    
    res.json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
