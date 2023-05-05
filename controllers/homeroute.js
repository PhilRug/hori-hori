const router = require('express').Router();
const { User, Plant, Pin } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
      const users = userData.map((project) => project.get({ plain: true }));  
      res.render('homepage', {
        users,        
        logged_in: req.session.logged_in,  
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // router.get('/:id', withAuth, async (req, res) => {
  //   try {
  //       const onePlant = await Plant.findByPk(req.params.id, {
  //       });
  //       res.status(200).json(onePlant);
  //       } catch (err) {
  //         res.status(500).json(err);
  //       }
  //     });

  router.get('/login', (req, res) => {
  // pick where to redirect when logged in
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

module.exports = router;