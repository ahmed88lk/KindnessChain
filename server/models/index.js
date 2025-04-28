const User = require('./User');
const KindnessAct = require('./KindnessAct');
const Challenge = require('./Challenge');
const UserChallenge = require('./UserChallenge');

// Relations avec noms uniques pour éviter les collisions
User.hasMany(KindnessAct, { foreignKey: 'userId', as: 'userActs' });
KindnessAct.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.belongsToMany(Challenge, { through: UserChallenge, foreignKey: 'userId', otherKey: 'challengeId', as: 'userChallenges' });
Challenge.belongsToMany(User, { through: UserChallenge, foreignKey: 'challengeId', otherKey: 'userId', as: 'challengeUsers' });

module.exports = {
  User,
  KindnessAct,
  Challenge,
  UserChallenge
};
