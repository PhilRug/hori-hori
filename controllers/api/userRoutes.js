const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find the user by their email address
  const user = await User.findOne({ where: { email } });
  
  // If the user doesn't exist, display an error message
  if (!user) {
    res.render('login', { error: 'Invalid email or password' });
    return;
  }
  
  // Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  // If the passwords don't match, display an error message
  if (!passwordMatch) {
    res.render('login', { error: 'Invalid email or password' });
    return;
  }
  
  // Store the user's ID in the session
  req.session.userId = user.id;
  
  // Redirect the user to the home page --this needs to change to dashboard/map
  res.redirect('/');
});

//this will be for creating user data once we get there
// router.post('/', async (req, res) => {
//   try {

//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

