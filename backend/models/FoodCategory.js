const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true,
    },
}, { collection: "foodCategory" }); // Define the collection name here

module.exports = mongoose.model("foodCategory", CategorySchema);
