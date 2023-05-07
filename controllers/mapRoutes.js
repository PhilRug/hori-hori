const router = require('express').Router();

//test route to see if we can render partial for map
router.get('/', (req, res) => {
  console.log('map route hit');
  res.render('map');
});

module.exports = router;