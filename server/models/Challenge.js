const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Challenge = sequelize.define('Challenge', {
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    defaultValue: () => `challenge_${Date.now()}`
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  participants: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isTeamChallenge: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Challenge;
