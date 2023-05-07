const router = require('express').Router();
const { Pin } = require('../../models');

//GOAL - we need to write an api route that our front end can call to get pin locations to put on a map.

// Add a new POST route to handle form submissions
//add authentication
router.post('/', async (req, res) => {
  try {
    // Create a new Plant record in the database using the form data
    const pin = await Pin.create({
      plant: req.body.plantName,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });

    // Send a success response to the client
    res.status(201).json({ success: true, pin: pin });
    console.log('success');
  } catch (err) {
    // Handle errors and send an error response to the client
    console.error(err);
    res.status(500).json({ message: 'Server error occurred while creating plant record' });
  }
});

//test route
router.get('/', async (req, res) => {
  try {
    // Retrieve all Pin records from the database
    const pins = await Pin.findAll();

    // Send the Pin records to the client
    res.json(pins);
  } catch (err) {
    // Handle errors and send an error response to the client
    console.error(err);
    res.status(500).json({ message: 'Server error occurred while retrieving Pin records' });
  }
});

module.exports = router;

// //example localhost:3001/api/map?lat=90.00&lon=91
// router.get('/pins', async (req, res) => {
//     const latitude = req.query.lat;
//     const longitude = req.query.lon;
//     //get pins from the database based on some latitude and longitude
//     //OPTION 1: do a findAll
//     // const pinsData = await Pin.findAll({
//     //     where: {
//     //         //create a "distance constraint" that uses latitude and longitude variables
//     //     }
//     // });
//     //OPTION 2: do a sequelize literal (this one may be way easier because distance constraints are hard to write in sequelize)
//     const pinsData = await sequelize.query('WRITE THE RAW SQL QUERY HERE', {
//         model: Pin,
//         mapToModel: true // pass true here if you have any mapped fields
//     });
// });