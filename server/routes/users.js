const express = require('express');
const router = express.Router();
const { User, KindnessAct } = require('../models');
const { auth } = require('./auth');

// Admin middleware
const admin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    
    next();
  } catch (error) {
    console.error('Error in admin middleware:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats for admin
router.get('/dashboard-stats', auth, admin, async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.count();
    
    // Get total acts
    const totalActs = await KindnessAct.count();
    
    // Get users by role
    const adminUsers = await User.count({ where: { role: 'admin' } });
    const moderatorUsers = await User.count({ where: { role: 'moderator' } });
    const regularUsers = await User.count({ where: { role: 'user' } });
    
    // Get acts by category (with grouping)
    const actsByCategory = await KindnessAct.findAll({
      attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['category'],
      raw: true
    });
    
    // Get recently joined users
    const recentUsers = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    // Get recent acts
    const recentActs = await KindnessAct.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    // Format recent acts
    const formattedRecentActs = recentActs.map(act => {
      const plainAct = act.get({ plain: true });
      
      // Convert JSON fields
      if (typeof plainAct.reactions === 'string') {
        plainAct.reactions = JSON.parse(plainAct.reactions);
      }
      
      // Handle anonymity
      if (plainAct.anonymous) {
        delete plainAct.author;
      }
      
      return plainAct;
    });
    
    res.json({
      totalUsers,
      totalActs,
      usersByRole: {
        admin: adminUsers,
        moderator: moderatorUsers,
        user: regularUsers
      },
      actsByCategory,
      recentUsers,
      recentActs: formattedRecentActs
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if requester is admin or the user themselves
    if (req.user.id !== user.id) {
      const requester = await User.findByPk(req.user.id);
      if (!requester || requester.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to access this user data' });
      }
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Make sure role is not changed to admin
    if (req.body.role === 'admin' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Cannot upgrade user to admin role' });
    }
    
    // Update allowed fields
    const allowedFields = ['name', 'email', 'role', 'isAmbassador', 'language', 'avatar', 'kindnessCoins'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    }
    
    await user.save();
    
    // Return user without password
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent deletion of admin accounts
    if (user.role === 'admin' && user.id !== req.user.id) {
      return res.status(403).json({ message: 'Cannot delete other admin accounts' });
    }
    
    // Delete user
    await user.destroy();
    
    res.json({ message: 'User deleted successfully', id: user.id });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
