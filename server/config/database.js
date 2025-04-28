const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuration de la connexion à la base de données SQLite
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false, // Pour désactiver les logs SQL en production
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection à la base de données établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };
