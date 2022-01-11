const mongoose = require('mongoose');
const yup = require("yup");


// restaurant schemas
const RestSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    cuisine: {
        type: String,
        required: true
    }

});

const validateRestaurant = restaurant => {
    const schema = yup.object().shape({
        restaurantName: yup.string().required().min(3, "Name has to be between 3 and 10 char!").max(100, "Name has to be between 3 and 10 char!")
    });

    return schema.validate(restaurant).then(restaurant => restaurant).catch(error => {
        return {
            message: error.message
        }
    });
};




// module.exports = new mongoose.model('Restaurants', RestSchema);
exports.Restaurants = new mongoose.model('Restaurants', RestSchema);
exports.validateRestaurant = validateRestaurant;
