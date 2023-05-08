const router = require('express').Router();
const { Pin } = require('../../models');

// Add a new POST route to handle form submissions
//add authentication
router.post('/', async (req, res) => {
  try {
    // Create a new Plant record in the database using the form data
    const pin = await Pin.create({
      plant: req.body.plant,
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

//gets all pins
router.get('/', async (req, res) => {
  try {
    // Retrieve all Pin records from the database
    const pins = await Pin.findAll();

    // Send the Pin records to the client
    res.render('dashboard', { pins });
  } catch (err) {
    // Handle errors and send an error response to the client
    console.error(err);
    res.status(500).json({ message: 'Server error occurred while retrieving Pin records' });
  }
});

//Create a new route in your pins.js file that will render the pin view with the map and the popup form
  router.get('/:id', async (req, res) => { 
try {

    // find the pin by id
    const pinData = await Pin.findByPk(req.params.id);
    
    const pin = pinData.get({ plain: true });
    
    res.status(200).json(pin);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
