const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
require('dotenv').config();
const restaurantsRoute = require('./routes/restaurants');

const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({ filename: 'error.log' ,level:'error' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log'})
    ]
});


// routes
app.use('/api/restaurants',restaurantsRoute);



// connect to mongodb atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}).then(() => {
    logger.log("info","connected to mongoDb atlas");
    // console.log("Connected to mongodb atlas");
}).catch((error) => {
    logger.error(error.message);
});


// start server
app.listen(PORT, () => {
    logger.info(`Server started at PORT ${PORT}`);
});