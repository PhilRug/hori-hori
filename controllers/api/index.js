const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const plantRoutes = require('./plantRoutes');
const pinRoutes = require('./pinRoutes');

router.use('/users', userRoutes);
// router.use('/plants', plantRoutes);
router.use('/', pinRoutes)

module.exports = router;
