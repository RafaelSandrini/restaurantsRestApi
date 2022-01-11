const mongoose = require('mongoose');


// restaurant schemas
const RestSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required:true
    },
    cuisine:{
        type: String,
        required:true
    }

});

module.exports = new mongoose.model('Restaurants',RestSchema);
