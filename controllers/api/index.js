const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
// const mapRoutes = require('./mapRoutes');

router.use('/users', userRoutes);
router.use('/plants', plantRoutes);
// router.use('/dashboard', mapRoutes)

module.exports = router;
