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

// get all restaurants
router.get("/",(req,res) => {
    Restaurants.find()
        .then((restaurant) => res.send(restaurant))
        .catch((error) => {
            res.status(500).send("Something went wrong");
    });
});

// get restaurant by ID
router.get("/:restaurantId", async (req,res) => {
    const restaurant = await Restaurants.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    res.send(restaurant);
    //     .then((restaurant) => {
    //         if(restaurant) return res.send(restaurant);
    //         // added the return to avoid the error=> code: 'ERR_HTTP_HEADERS_SENT' after try to get some restaurant
    //         res.status(404).send("Restaurant not found");
    //     })
    //     .catch((error) => {
    //         res.status(500).send(error.message);
    //     });
});

// update restaurant based on ID
router.put("/:restaurantId", async(req,res) => {
    const updatedRestaurant = await Restaurants.findByIdAndUpdate(
        req.params.restaurantId, 
        {
            name:req.body.restaurantName,
            address:req.body.restaurantAddress,
            cuisine:req.body.restaurantCuisine
        },
        {new:true}
        );

        if(!updatedRestaurant) return res.status(404).send("Book not found");
        res.send(updatedRestaurant);
});

// delete a book based on ID
router.delete("/:restaurantId", async (req,res) => {
    const restaurant = await Restaurants.findByIdAndRemove(req.params.restaurantId);
    if(!restaurant) return res.status(404).send("Restaurant with Id not found");
    res.send(restaurant);
});


module.exports = router;