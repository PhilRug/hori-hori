const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoute = require('./homeroute');
const dashRoutes = require('./dashRoutes');
const mapRoutes = require('./mapRoutes')

router.use('/', homeRoute);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes);
router.use('/map', mapRoutes);

module.exports = router;
