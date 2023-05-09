const router = require('express').Router();
const { Pin } = require('../models'); // add user withAuth
const withAuth = require('../utils/auth');

//renders all pins - working
router.get('/', withAuth, async (req, res) => {
  try {
    // find all pins
    const pinsData = await Pin.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    const pins = pinsData.map((pin) => pin.get({ plain: true }));

    res.render('dashboard', {
      pins,
      logged_in: req.session.logged_in,
      userName: req.session.username
    }); // pass the pins data to the dashboard view

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;