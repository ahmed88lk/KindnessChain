const express = require('express');
const router = express.Router();
const { Challenge, User, UserChallenge } = require('../models');
const { auth } = require('./auth');

// Get all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single challenge by ID
router.get('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a challenge
router.post('/:id/join', auth, async (req, res) => {
  try {
    // Get challenge
    const challenge = await Challenge.findByPk(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Get user
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has already joined
    const existingJoin = await UserChallenge.findOne({
      where: { userId: user.id, challengeId: challenge.id }
    });
    
    if (existingJoin) {
      return res.status(400).json({ message: 'User has already joined this challenge' });
    }
    
    // Create user-challenge join
    await UserChallenge.create({
      userId: user.id,
      challengeId: challenge.id
    });
    
    // Update user's coins (bonus for joining)
    user.kindnessCoins += 5;
    await user.save();
    
    // Update challenge participants count
    challenge.participants += 1;
    await challenge.save();
    
    res.json({ success: true, challenge });
  } catch (error) {
    console.error('Error joining challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
