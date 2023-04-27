const router = require('express').Router();
const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');

router.use('/users', userRoutes);
router.use('/music', musicRoutes);

module.exports = router;
