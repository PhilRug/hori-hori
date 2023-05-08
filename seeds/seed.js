const sequelize = require('../config/connection');
const { User, Pin } = require('../models');

const userData = require('./userData.json');
const pinData = require('./pinData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pin of pinData) {
    await Pin.create({
      ...pin,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }
  process.exit(0);
};

seedDatabase();