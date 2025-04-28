const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Challenge, UserChallenge } = require('../models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware d'authentification
const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password // Le hook beforeCreate s'occupera du hash
    });
    
    // Create JWT token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    
    // Return user without password
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      kindnessStreak: newUser.kindnessStreak,
      kindnessCoins: newUser.kindnessCoins,
      acts: newUser.acts,
      isAmbassador: newUser.isAmbassador,
      joinedChallenges: [],
      language: newUser.language,
      role: newUser.role
    };
    
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Special case for admin/moderator test accounts
    if ((email === 'admin@kindnesschain.com' && password === 'admin123') || 
        (email === 'moderator@kindnesschain.com' && password === 'mod123')) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
      
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      
      // Get joined challenges
      const userChallenges = await UserChallenge.findAll({
        where: { userId: user.id },
        attributes: ['challengeId']
      });
      
      const joinedChallenges = userChallenges.map(uc => uc.challengeId);
      
      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        kindnessStreak: user.kindnessStreak,
        kindnessCoins: user.kindnessCoins,
        acts: user.acts,
        isAmbassador: user.isAmbassador,
        joinedChallenges,
        language: user.language,
        role: user.role
      };
      
      return res.json({ user: userWithoutPassword, token });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Get joined challenges
    const userChallenges = await UserChallenge.findAll({
      where: { userId: user.id },
      attributes: ['challengeId']
    });
    
    const joinedChallenges = userChallenges.map(uc => uc.challengeId);
    
    // Return user without password
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      kindnessStreak: user.kindnessStreak,
      kindnessCoins: user.kindnessCoins,
      acts: user.acts,
      isAmbassador: user.isAmbassador,
      joinedChallenges,
      language: user.language,
      role: user.role
    };
    
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Challenge,
          as: 'userChallenges',  // Nom d'association modifié
          through: { attributes: [] }
        }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Transformer les données pour maintenir la compatibilité frontend
    const joinedChallenges = user.userChallenges.map(challenge => challenge.id);
    
    // Return user without password
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      kindnessStreak: user.kindnessStreak,
      kindnessCoins: user.kindnessCoins,
      acts: user.acts,
      isAmbassador: user.isAmbassador,
      joinedChallenges,
      language: user.language,
      role: user.role
    };
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error in get current user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user preferences
    const allowedFields = ['name', 'avatar', 'language'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    }
    
    await user.save();
    
    // Get joined challenges
    const userChallenges = await UserChallenge.findAll({
      where: { userId: user.id },
      attributes: ['challengeId']
    });
    
    const joinedChallenges = userChallenges.map(uc => uc.challengeId);
    
    // Return updated user without password
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      kindnessStreak: user.kindnessStreak,
      kindnessCoins: user.kindnessCoins,
      acts: user.acts,
      isAmbassador: user.isAmbassador,
      joinedChallenges,
      language: user.language,
      role: user.role
    };
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error in update preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, auth };
