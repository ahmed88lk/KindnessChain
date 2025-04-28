const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KindnessAct = sequelize.define('KindnessAct', {
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    defaultValue: () => `act_${Date.now()}`
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
  location: {
    type: DataTypes.JSON,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  media: {
    type: DataTypes.JSON,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  anonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  reactions: {
    type: DataTypes.JSON,
    defaultValue: {
      hearts: 0,
      inspired: 0,
      thanks: 0
    }
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: true, // C'est null seulement pour les actes anonymes
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = KindnessAct;
