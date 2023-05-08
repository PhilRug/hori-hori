const router = require('express').Router();
const { User, Pin } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');

//homepage route
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['username', 'ASC']],
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

  //login route
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  //route for each pin to render as a map
    router.get('/pins/:id', async (req, res) => { 
    try {
      
      // find the pin by id
      const pinData = await Pin.findByPk(req.params.id);
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
      
      const pin = pinData.get({ plain: true });
      
      res.render('pin', {
        ...pin,
        // logged_in: req.session.logged_in
        })
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    });

  module.exports = router;