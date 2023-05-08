const User = require('./User');
const Pin = require('./Pin');

//Pin-User Associations
//a pin can only have one user associated to it
Pin.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Pin, {
  through: {
    model: Pin,
    foreignKey: 'user_id',
  }
});

module.exports = { User, Pin };

