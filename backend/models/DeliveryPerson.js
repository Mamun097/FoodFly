const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeliveryPersonSchema = new Schema({
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
    contact: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_available: {
        type: Boolean,
        default: true,
    },

});

module.exports = mongoose.model("delivery_persons", DeliveryPersonSchema);
