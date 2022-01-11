const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const restaurantsRoute = require('./routes/restaurants');

const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/api/restaurants',restaurantsRoute);


// connect to mongodb atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}).then(() => {
    console.log("Connected to mongodb atlas");
});


// start server
app.listen(PORT, () => {
    console.log("Server started at ", PORT);
})