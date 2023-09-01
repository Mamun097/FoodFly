const mongoose = require("mongoose");
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    is_open: {
        type: Boolean,
        default: true, 
    }, 
    is_homekitchen: {
        type: Boolean, 
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("restaurants", RestaurantSchema);
