const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoute = require('./homeroute');
const dashRoutes = require('./dashRoutes');

router.use('/dashboard', dashRoutes);
router.use('/', homeRoute);
router.use('/api', apiRoutes);


module.exports = router;
