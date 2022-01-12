const express = require('express');
const router = express.Router();
const {Restaurants, validateRestaurant} = require('../models/restaurants');

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
router.get("/", async (req,res) => {
    try {
        let {page,size} = req.query
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }

        const limit = parseInt(size)
        const skip = (page -1) * size;

        const restaurants = await Restaurants.find({},{},{limit: limit, skip: skip})
        res.send({
            page,
            size,
            data: restaurants,
        });
    } catch (error) {
            res.status(500).send("Something went wrong");
        }
});

// get restaurant by ID
router.get("/:restaurantId", async (req,res) => {
    try {
        let {page,size} = req.query
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }

        const limit = parseInt(size)
        const skip = (page -1) * size;

        const restaurants = await Restaurants.findById(req.params.restaurantId).limit(limit).skip(skip)
        res.send({
            page,
            size,
            data: restaurants,
        });
    } catch (error) {
            res.status(500).send("Something went wrong");
        }
});


// get restaurant by CUISINE
router.get("/cuisine/:id", async (req,res) => {
    try {
        let {page,size} = req.query
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }

        const limit = parseInt(size)
        const skip = (page -1) * size;

        const id = req.params === undefined ? req.id : req.params.id

        const restaurants = await Restaurants.find({cuisine : id}).limit(limit).skip(skip)
        res.send({
            page,
            size,
            data: restaurants,
        });
    } catch (error) {
            res.status(500).send("Something went wrong");
        }
});

// get restaurant by NAME
router.get("/name/:id", async (req,res) => {
    try {
        let {page,size} = req.query
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }

        const limit = parseInt(size)
        const skip = (page -1) * size;

        const id = req.params === undefined ? req.id : req.params.id

        const restaurants = await Restaurants.find({name : id}).limit(limit).skip(skip)
        res.send({
            page,
            size,
            data: restaurants,
        });
    } catch (error) {
            res.status(500).send("Something went wrong");
        }
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

        if(!updatedRestaurant) return res.status(404).send("Restaurant not found");
        res.send(updatedRestaurant);
});

// delete a restaurant based on ID
router.delete("/:restaurantId", async (req,res) => {
    const restaurant = await Restaurants.findByIdAndRemove(req.params.restaurantId);
    if(!restaurant) return res.status(404).send("Restaurant with Id not found");
    res.send(restaurant);
});


module.exports = router;