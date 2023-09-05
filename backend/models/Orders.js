const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true,
    // },
    // location: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }

    user_id: {
        type: String,
        required: true
    }, 

    food_id: [
        {
            type: String,
            required: true
        }
    ],

    restaurant_id: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("order", OrderSchema);