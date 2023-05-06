const sequelize = require('../config/connection');
const { User, Plant, Pin } = require('../models');

const userData = require('./userData.json');
const plantData = require('./plantData.json');
const pinData = require('./pinData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const plants = await Plant.bulkCreate(plantData, {
  //   individualHooks: true,
  //   returning: true
  // });

  for (const pin of pinData) {
    await Pin.create({
      ...pin,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      // plant_id: plants[Math.floor(Math.random() * plants.length)].id,
    })
  }
  // for (const plant of plantData) {
  //   await Plant.create({
  //     ...plant,
  //     user_id: user_id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();