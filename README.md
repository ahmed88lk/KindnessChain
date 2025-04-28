# 🌟 KindnessChain

KindnessChain is a platform that connects people through acts of kindness, allowing users to share, get inspired, and track their positive impact in the world.

## 📋 Features

- **Inspiration Feed**: Discover and share acts of kindness
- **Kindness Challenges**: Participate in community challenges to do good
- **Impact Dashboard**: Visualize the collective impact of the community
- **Global Community**: Connect with kindness ambassadors from around the world
- **Kindness Map**: Explore how acts of kindness are spreading geographically
- **AI Assistant**: Receive personalized kindness act suggestions from our AI assistant
- **Reward System**: Earn points and badges for your positive actions

## 🛠️ Technologies

### Frontend
- React 18 with functional hooks
- TypeScript for static typing
- Tailwind CSS for styling
- Vite as build tool and development server
- Lucide React for icons

### Backend
- Node.js and Express for the REST API
- Sequelize as ORM for the database
- SQLite for development (easily migratable to MySQL/PostgreSQL)
- JWT for authentication
- bcrypt for secure password hashing

### Integrations
- Google Gemini API for AI functionalities
- UI Avatars service for default profile pictures

## 🚀 Installation

### Prerequisites

- Node.js v18.14.0 or higher
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-name/kindness-chain.git
   cd kindness-chain
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

4. Configure environment variables:
   - Copy `.env.example` to `.env` in the root folder
   - Add your Gemini API key (for AI functionalities)
   - Configure database settings if necessary

5. Initialize the database:
   ```bash
   cd server
   npm run init-db
   ```

## 🏃‍♂️ Getting Started

1. Start the backend server (from the `server` folder):
   ```bash
   npm run dev
   ```

2. Start the frontend (from the root folder):
   ```bash
   npm run dev
   ```

3. Access the application at: http://localhost:5173

## 👥 Test Accounts

- **Admin**: admin@kindnesschain.com / admin123
- **Moderator**: moderator@kindnesschain.com / mod123
- **User**: Create your own account by signing up!

## 📱 Screenshots

![Dashboard](docs/images/dashboard.png)
![Feed](docs/images/feed.png)
![Challenges](docs/images/challenges.png)

## 📂 Server Structure

```
server/
├── config/            # Database configuration and initialization
│   ├── database.js    # Sequelize configuration
│   └── initDb.js      # Database initialization script with demo data
├── models/            # Sequelize models
│   ├── Challenge.js   # Model for challenges
│   ├── KindnessAct.js # Model for kindness acts
│   ├── User.js        # User model
│   └── index.js       # Configuration of model relationships
├── routes/            # Express API routes
│   ├── acts.js        # Endpoints for kindness acts
│   ├── analytics.js   # Endpoints for statistics and metrics
│   ├── auth.js        # Authentication and user management
│   ├── challenges.js  # Endpoints for challenges
│   └── community.js   # Endpoints for community data
├── database.sqlite    # SQLite database (generated after initialization)
├── server.js          # Server entry point
└── nodemon.json       # Nodemon configuration for development
```

## 📡 API Documentation

The REST API is available at `http://localhost:5000/api/` with the following endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user data
- `PUT /api/auth/preferences` - Update user preferences

### Kindness Acts
- `GET /api/acts` - Get all kindness acts
- `GET /api/acts/:id` - Get a specific act
- `POST /api/acts` - Create a new kindness act
- `POST /api/acts/:id/react` - React to a kindness act

### Challenges
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/:id` - Get a specific challenge
- `POST /api/challenges/:id/join` - Join a challenge

### Analytics
- `GET /api/analytics` - Get general statistics
- `GET /api/analytics/heatmap` - Data for the heat map

### Community
- `GET /api/community/ambassadors` - List of ambassadors
- `GET /api/community/leaderboard` - User rankings

## 🔧 Technical Architecture

The system is built on a RESTful architecture with a clear separation between frontend and backend. The server uses a layered architecture:

1. **Routes** - API entry points that delegate to controllers
2. **Models** - Represent data entities with Sequelize
3. **Middleware** - Authentication and authorization management
4. **Utilities** - Shared helper functions

Data storage uses SQLite in development for easy setup but can be easily migrated to MySQL or PostgreSQL for production thanks to Sequelize.

## 🤝 Contributing

Contributions are welcome! Please check our contribution guide for more details.

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 💖 Acknowledgements

This project was created with the goal of promoting kindness and mutual aid on a global scale.
