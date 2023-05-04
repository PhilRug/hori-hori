const { Plant } = require('../models');

const userdata =
[
  {
    "name": "poison ivy",
    "description": "3 leaves"    
  },
  {
    "name": "kudzu",
    "description": "its stupid"    
  },
  {
    "name": "japanese knotweed",
    "description": "plant straight out of avatar"    
  },
];

const seedPlant = () => Plant.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedPlant;
