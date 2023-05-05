const router = require('express').Router();
// const { User, Plant, Pin } = require('../models');
const withAuth = require('../utils/auth');

// Route for protected dashboard page
//add authentication after
router.get('/', (req, res) => {
  console.log('route hit');
  res.render('dashboard');
});

// router.get('/map', (req, res) => {
//     // try {
//     //     const userData = await User.findAll({
//     //       attributes: { exclude: ['password'] },
//     //       order: [['name', 'ASC']],
//     //     });
//     //     const users = userData.map((project) => project.get({ plain: true }));  
//     //     res.render('dashboard', {
//     //       users,        
//     //       logged_in: req.session.logged_in,  
//     //     });
//    try { res.render('dashboard');
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     });

//     module.exports = router;

// all posts for dashboard
// router.get('/', withAuth, async (req, res) => {
//     try {
//       // store the results of the db query in a variable
//       const plantData = await Plant.findAll({
//         where:{"userId": req.session.userId},
//         include: [User]
//       });    
//       const plants = plantData.map((plant) => plant.get({ plain: true }));
//       console.log(plants);
//       // fill in the view
//       res.render('dashboard', {
//         // change layout
//         layout: 'dashboard',      
//         plants,
//       });
//     } catch (err) {
//       res.redirect('login');
//     }
//   });

  module.exports = router;