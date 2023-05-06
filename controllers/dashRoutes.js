// Import necessary modules
const router = require('express').Router();
const { User, Plant, Pin } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');

// Define a route for the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Retrieve the logged-in user's data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Plant,
          attributes: ['id', 'name', 'image_url'],
        },
        {
          model: Pin,
          attributes: ['id', 'name'],
        },
      ],
    });

    // Serialize the user's data to plain objects
    const user = userData.get({ plain: true });

    // Render the dashboard template with the user's data
    res.render('dashboard', { user, logged_in: true });

  } catch (err) {
    // Handle errors with a 500 status code
    res.status(500).json(err);
  }
});

// Export the router object
module.exports = router;