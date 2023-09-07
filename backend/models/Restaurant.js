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
    ratings: [
        {
         user: mongoose.Schema.Types.ObjectId, 
         rating: Number 
        }
    ],
    averageRating: 
    { 
        type: Number, default: 0 
    },
    reviews: [
        {
            user: mongoose.Schema.Types.ObjectId,
            username: String,
            review: String,
            date: {
                type: Date,
                default: Date.now
              }
        }
    ],
    hasStock: {
        type: Boolean,
        default: true,
      }
});

module.exports = mongoose.model("restaurants", RestaurantSchema);
