# 🌟 KindnessChain

KindnessChain est une plateforme qui connecte les personnes à travers des actes de gentillesse, permettant aux utilisateurs de partager, s'inspirer et suivre leur impact positif dans le monde.

## 📋 Fonctionnalités

- **Feed d'inspiration**: Découvrez et partagez des actes de gentillesse
- **Défis de gentillesse**: Participez à des défis communautaires pour faire le bien
- **Tableau de bord d'impact**: Visualisez l'impact collectif de la communauté
- **Communauté mondiale**: Connectez-vous avec des ambassadeurs de la gentillesse du monde entier
- **Carte de gentillesse**: Explorez comment les actes de gentillesse se répandent géographiquement
- **Assistant IA**: Recevez des suggestions d'actes de gentillesse personnalisées de notre assistant IA
- **Système de récompenses**: Gagnez des points et des badges pour vos actions positives

## 🛠️ Technologies

### Frontend
- React 18 avec hooks fonctionnels
- TypeScript pour un typage statique
- Tailwind CSS pour le style
- Vite comme outil de build et serveur de développement
- Lucide React pour les icônes

### Backend
- Node.js et Express pour l'API REST
- Sequelize comme ORM pour la base de données
- SQLite en développement (facilement migratable vers MySQL/PostgreSQL)
- JWT pour l'authentification
- bcrypt pour le hachage sécurisé des mots de passe

### Intégrations
- Google Gemini API pour les fonctionnalités d'IA
- Service d'avatars UI Avatars pour les images de profil par défaut

## 🚀 Installation

### Prérequis

- Node.js v18.14.0 ou supérieur
- npm ou yarn

### Configuration

1. Cloner le dépôt:
   ```bash
   git clone https://github.com/votre-nom/kindness-chain.git
   cd kindness-chain
   ```

2. Installer les dépendances du frontend:
   ```bash
   npm install
   ```

3. Installer les dépendances du backend:
   ```bash
   cd server
   npm install
   ```

4. Configurer les variables d'environnement:
   - Copiez `.env.example` vers `.env` dans le dossier racine
   - Ajoutez votre clé API Gemini (pour les fonctionnalités d'IA)
   - Configurez les paramètres de base de données si nécessaire

5. Initialiser la base de données:
   ```bash
   cd server
   npm run init-db
   ```

## 🏃‍♂️ Démarrage

1. Démarrer le serveur backend (depuis le dossier `server`):
   ```bash
   npm run dev
   ```

2. Démarrer le frontend (depuis le dossier racine):
   ```bash
   npm run dev
   ```

3. Accédez à l'application sur: http://localhost:5173

## 👥 Comptes de test

- **Admin**: admin@kindnesschain.com / admin123
- **Modérateur**: moderator@kindnesschain.com / mod123
- **Utilisateur**: Créez votre propre compte en vous inscrivant!

## 📱 Captures d'écran

![Dashboard](docs/images/dashboard.png)
![Feed](docs/images/feed.png)
![Challenges](docs/images/challenges.png)

## 📂 Structure du serveur

```
server/
├── config/            # Configuration de la base de données et initialisation
│   ├── database.js    # Configuration Sequelize
│   └── initDb.js      # Script d'initialisation de la DB avec données de démonstration
├── models/            # Modèles Sequelize
│   ├── Challenge.js   # Modèle pour les défis
│   ├── KindnessAct.js # Modèle pour les actes de gentillesse
│   ├── User.js        # Modèle utilisateur
│   └── index.js       # Configuration des relations entre modèles
├── routes/            # Routes API Express
│   ├── acts.js        # Endpoints pour les actes de gentillesse
│   ├── analytics.js   # Endpoints pour les statistiques et métriques
│   ├── auth.js        # Authentification et gestion des utilisateurs
│   ├── challenges.js  # Endpoints pour les défis
│   └── community.js   # Endpoints pour les données communautaires
├── database.sqlite    # Base de données SQLite (générée après initialisation)
├── server.js          # Point d'entrée du serveur
└── nodemon.json       # Configuration de Nodemon pour le développement
```

## 📡 API Documentation

L'API REST est disponible sur `http://localhost:5000/api/` avec les endpoints suivants:

### Authentication
- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/me` - Récupérer les données de l'utilisateur connecté
- `PUT /api/auth/preferences` - Mettre à jour les préférences utilisateur

### Actes de gentillesse
- `GET /api/acts` - Récupérer tous les actes de gentillesse
- `GET /api/acts/:id` - Récupérer un acte spécifique
- `POST /api/acts` - Créer un nouvel acte de gentillesse
- `POST /api/acts/:id/react` - Réagir à un acte de gentillesse

### Défis
- `GET /api/challenges` - Récupérer tous les défis
- `GET /api/challenges/:id` - Récupérer un défi spécifique
- `POST /api/challenges/:id/join` - Rejoindre un défi

### Analytics
- `GET /api/analytics` - Récupérer les statistiques générales
- `GET /api/analytics/heatmap` - Données pour la carte de chaleur

### Communauté
- `GET /api/community/ambassadors` - Liste des ambassadeurs
- `GET /api/community/leaderboard` - Classement des utilisateurs

## 🔧 Architecture technique

Le système est construit sur une architecture RESTful avec une séparation claire entre le frontend et le backend. Le serveur utilise une architecture en couches:

1. **Routes** - Points d'entrée de l'API qui délèguent aux contrôleurs
2. **Modèles** - Représentent les entités de données avec Sequelize
3. **Middleware** - Gestion de l'authentification et autorisations
4. **Utilitaires** - Fonctions helpers partagées

Le stockage des données utilise SQLite en développement pour faciliter la mise en place, mais peut facilement être migré vers MySQL ou PostgreSQL pour la production grâce à Sequelize.

## 🤝 Contribution

Les contributions sont les bienvenues! Veuillez consulter notre guide de contribution pour plus de détails.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 💖 Remerciements

Ce projet a été créé avec l'objectif de promouvoir la gentillesse et l'entraide à l'échelle mondiale.
