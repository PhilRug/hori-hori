const sequelize = require('../config/connection');
const seedPlant = require('./plantData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedPlant();
  await seedUser();
  process.exit(0);
};

seedAll();