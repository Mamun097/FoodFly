const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    // Add a favorites field which is an array of Restaurant ObjectIds
    favorites: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
        }
    ],
    contact: {
        type: String,
        required: false,
    },

});

module.exports = mongoose.model("user", UserSchema);
