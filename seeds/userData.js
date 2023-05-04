const { User } = require('../models');

const userdata =
[
  {
    "name": "frank",
    "email": "warthog@aol.com",
    "password": "paddyspub"
  },
  {
    "name": "charlie",
    "email": "ratking@hotmail.com",
    "password": "paddyspub"  
  },
  {
    "name": "dee",
    "email": "birdgirl@msn.com",
    "password": "paddyspub"   
  },
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
