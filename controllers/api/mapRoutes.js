// const router = require('express').Router();
// const { User, Plant, Pin } = require('../../models');
// const withAuth = require('../../utils/auth');

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