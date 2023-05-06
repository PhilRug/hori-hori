const router = require('express').Router();
// const { User, Plant, Pin } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

// Route for protected dashboard page
//ROUTE FOR TESTING PARTIAL SO IT'S NOT AUTHENTICATED, BUT CAN ADD WithAuth after
router.get('/', (req, res) => {
  console.log('route hit');
  res.render('dashboard');
});

//PJ'S ROUTE CODE 
// Define a route for the dashboard page
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Retrieve the logged-in user's data
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [
//         {
//           model: Plant,
//           attributes: ['id', 'name', 'image_url'],
//         },
//         {
//           model: Pin,
//           attributes: ['id', 'name'],
//         },
//       ],
//     });

//     // Serialize the user's data to plain objects
//     const user = userData.get({ plain: true });

//     // Render the dashboard template with the user's data
//     res.render('dashboard', { user, logged_in: true });

//   } catch (err) {
//     // Handle errors with a 500 status code
//     res.status(500).json(err);
//   }
// });


//JACKS CODE
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