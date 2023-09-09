const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    }, 

    restaurant_id: {
        type: String,
        required: true
    },

    delivery_person_id: {
        type: String,
        required: false
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

    // Status of the order
    status: {
        type: String,
        enum: ["pending", "confirmed", "picked_up", "delivered"], // Use enum to restrict values
        default: "pending" // Default status when an order is created
    },

    date: {
        type: Date,
        default: Date.now
    },

    payment_method: {
        type: String,
        enum: ["cod", "card"],
        default: "cod"
    },

    total_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("order", OrderSchema);
