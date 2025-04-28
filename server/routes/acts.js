const express = require('express');
const router = express.Router();
const { KindnessAct, User } = require('../models');
const { auth } = require('./auth');

// Get all kindness acts
router.get('/', async (req, res) => {
  try {
    const acts = await KindnessAct.findAll({
      include: [
        {
          model: User,
          as: 'user', // Changed from 'author' to 'user'
          attributes: ['id', 'name', 'avatar'] // Exclude sensitive fields
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    // Format data for the frontend
    const formattedActs = acts.map(act => {
      const plainAct = act.get({ plain: true });
      
      // Convert JSON fields
      if (typeof plainAct.location === 'string') {
        plainAct.location = JSON.parse(plainAct.location);
      }
      
      if (typeof plainAct.media === 'string') {
        plainAct.media = JSON.parse(plainAct.media);
      }
      
      if (typeof plainAct.tags === 'string') {
        plainAct.tags = JSON.parse(plainAct.tags);
      }
      
      if (typeof plainAct.reactions === 'string') {
        plainAct.reactions = JSON.parse(plainAct.reactions);
      }
      
      // Handle anonymity and rename user to author for frontend compatibility
      if (plainAct.anonymous) {
        delete plainAct.user;
      } else if (plainAct.user) {
        plainAct.author = plainAct.user;
        delete plainAct.user;
      }
      
      return plainAct;
    });
    
    res.json(formattedActs);
  } catch (error) {
    console.error('Error fetching acts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single kindness act by ID
router.get('/:id', async (req, res) => {
  try {
    const act = await KindnessAct.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user', // Changed from 'author' to 'user'
          attributes: ['id', 'name', 'avatar']
        }
      ]
    });
    
    if (!act) {
      return res.status(404).json({ message: 'Act not found' });
    }
    
    // Format act for the frontend
    const plainAct = act.get({ plain: true });
    
    // Convert JSON fields
    if (typeof plainAct.location === 'string') {
      plainAct.location = JSON.parse(plainAct.location);
    }
    
    if (typeof plainAct.media === 'string') {
      plainAct.media = JSON.parse(plainAct.media);
    }
    
    if (typeof plainAct.tags === 'string') {
      plainAct.tags = JSON.parse(plainAct.tags);
    }
    
    if (typeof plainAct.reactions === 'string') {
      plainAct.reactions = JSON.parse(plainAct.reactions);
    }
    
    // Handle anonymity and rename user to author for frontend compatibility
    if (plainAct.anonymous) {
      delete plainAct.user;
    } else if (plainAct.user) {
      plainAct.author = plainAct.user;
      delete plainAct.user;
    }
    
    res.json(plainAct);
  } catch (error) {
    console.error('Error fetching act:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new kindness act
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, location, tags, anonymous, media } = req.body;
    
    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }
    
    // Get user
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prepare data
    const actData = {
      title,
      description,
      category,
      location: location ? JSON.stringify(location) : null,
      date: new Date(),
      tags: tags ? JSON.stringify(tags) : JSON.stringify([]),
      anonymous: !!anonymous,
      media: media ? JSON.stringify(media) : null,
      userId: anonymous ? null : user.id,
      reactions: JSON.stringify({
        hearts: 0,
        inspired: 0,
        thanks: 0,
      })
    };
    
    // Create act
    const newAct = await KindnessAct.create(actData);
    
    // Update user stats
    user.acts += 1;
    user.kindnessCoins += 10;
    user.kindnessStreak += 1;
    await user.save();
    
    // Format response
    const plainAct = newAct.get({ plain: true });
    
    // Convert JSON fields
    if (typeof plainAct.location === 'string') {
      plainAct.location = JSON.parse(plainAct.location);
    }
    
    if (typeof plainAct.media === 'string') {
      plainAct.media = JSON.parse(plainAct.media);
    }
    
    if (typeof plainAct.tags === 'string') {
      plainAct.tags = JSON.parse(plainAct.tags);
    }
    
    if (typeof plainAct.reactions === 'string') {
      plainAct.reactions = JSON.parse(plainAct.reactions);
    }
    
    // Add author info if not anonymous
    if (!anonymous) {
      plainAct.author = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      };
    }
    
    res.status(201).json(plainAct);
  } catch (error) {
    console.error('Error creating act:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// React to a kindness act
router.post('/:id/react', auth, async (req, res) => {
  try {
    const { reactionType } = req.body;
    const validReactions = ['hearts', 'inspired', 'thanks'];
    
    if (!validReactions.includes(reactionType)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }
    
    // Get act
    const act = await KindnessAct.findByPk(req.params.id);
    
    if (!act) {
      return res.status(404).json({ message: 'Act not found' });
    }
    
    // Update reaction count
    let reactions = typeof act.reactions === 'string' ? 
      JSON.parse(act.reactions) : act.reactions;
    
    reactions[reactionType] += 1;
    
    act.reactions = JSON.stringify(reactions);
    await act.save();
    
    res.json({ success: true, reactions });
  } catch (error) {
    console.error('Error reacting to act:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
