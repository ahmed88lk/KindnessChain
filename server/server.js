const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { router: authRoutes } = require('./routes/auth');
const actsRoutes = require('./routes/acts');
const challengesRoutes = require('./routes/challenges');
const usersRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');
const communityRoutes = require('./routes/community');
const path = require('path');
require('dotenv').config();

// Importer la connexion à la base de données
const { sequelize, testConnection } = require('./config/database');

// Création du serveur Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logger pour le développement
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/acts', actsRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/community', communityRoutes);

// Route de test
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// Tester la connexion à la base de données puis démarrer le serveur
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});
