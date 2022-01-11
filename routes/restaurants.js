const express = require('express');
const router = express.Router();
const {Restaurants, validateRestaurant} = require('../models/restaurants');
// const restaurants = require('../models/restaurants');

//POST: create a new restaurant
router.post('/', async (req, res) => {
    const error = await validateRestaurant (req.body);
    if(error.message) res.status(400).send(error.message);

    restaurant = new Restaurants({
        address: req.body.restaurantAddress,
        name: req.body.restaurantName,        
        cuisine: req.body.restaurantCuisine
    });

    restaurant.save().then(restaurant => {
        res.send(restaurant);
    }).catch(error => {
        res.status(500).send("Restaurant was not stored in db");
    });

});

module.exports = router;