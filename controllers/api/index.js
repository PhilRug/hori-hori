const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pinRoutes = require('./pinRoutes');

router.use('/users', userRoutes);
router.use('/pins', pinRoutes);

module.exports = router;
