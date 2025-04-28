const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserChallenge = sequelize.define('UserChallenge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  challengeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Challenges',
      key: 'id'
    }
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'challengeId']
    }
  ]
});

module.exports = UserChallenge;
