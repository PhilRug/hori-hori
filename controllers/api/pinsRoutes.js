const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Pin } = require('../../models');

//GOAL - we need to write an api route that our front end can call to get pin locations to put on a map. 
//example of a "pin location":
// {
//     latitude: 30.0002,
//     longitude: 60.4003,
//     plant: 'Kudzu',
//     description: 'This one is reaaaal bad!'
// }

//example localhost:3001/api/map?lat=90.00&lon=91
router.get('/pins', async (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    //get pins from the database based on some latitude and longitude
    //OPTION 1: do a findAll
    // const pinsData = await Pin.findAll({
    //     where: {
    //         //create a "distance constraint" that uses latitude and longitude variables 
    //     }
    // });
    //OPTION 2: do a sequelize literal (this one may be way easier because distance constraints are hard to write in sequelize)
    const pinsData = await sequelize.query('WRITE THE RAW SQL QUERY HERE', {
        model: Pin,
        mapToModel: true // pass true here if you have any mapped fields
    });
});

module.exports = router;