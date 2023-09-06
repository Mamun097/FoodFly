const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    }, 

    // Array of food items with quantity
    food_items: [
        {
            food_id: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    restaurant_id: {
        type: String,
        required: true
    },

    delivery_person_id: {
        type: String,
        required: true
    },

    // Status of the order
    status: {
        type: String,
        enum: ["placed", "on_the_way", "delivered"], // Use enum to restrict values
        default: "placed" // Default status when an order is created
    },

    // Date field with default value set to Date.now
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("order", OrderSchema);
