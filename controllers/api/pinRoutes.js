const router = require('express').Router();
const { Pin } = require('../../models');

//GOAL - we need to write an api route that our front end can call to get pin locations to put on a map. 

//test route to see if we can render partial for map
router.get('/map', (req, res) => {
    console.log('map route hit');
    res.render('map');
  });

// Add a new POST route to handle form submissions
// app.post('/plants', async (req, res) => {
//   try {
//     // Create a new Plant record in the database using the form data
//     const plant = await Plant.create({
//       name: req.body.plantName,
//       description: req.body.description,
//       latitude: req.body.latitude,
//       longitude: req.body.longitude
//     });

//     // Send a success response to the client
//     res.status(201).json({ message: 'Plant record created successfully' });
//   } catch (err) {
//     // Handle errors and send an error response to the client
//     console.error(err);
//     res.status(500).json({ message: 'Server error occurred while creating plant record' });
//   }
// });

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

// // define a route to handle POST requests to create a new pin
// router.post('/pins', async (req, res) => {
//   try {
//     // create a new pin object using the data from the request body
//     const pin = await Pin.create(req.body);

//     // send a JSON response indicating success and including the new pin's data
//     res.status(201).json({ success: true, pin: pin });
//   } catch (error) {
//     // if there was an error, send a JSON response indicating failure
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// export the router so it can be mounted in the app
module.exports = router;