//You must this particular format
//Otherwise you will not be able to fetch data from MongoDB

const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://FoodFly:munshiCSE2019@cluster0.d4f7bw3.mongodb.net/FoodFly?retryWrites=true&w=majority"

const mongoDB = async() => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    // const fetchData = await mongoose.connection.db.collection("food_items");
    // const fetchFoodCategory = await mongoose.connection.db.collection("foodCategory");

    // const result = await fetchData.find().toArray();
    // const categoryResult = await fetchFoodCategory.find().toArray();

    // global.food_items = result;
    // global.food_category = categoryResult;
    // console.log(global.food_items);
    // console.log(result);
}

module.exports = mongoDB;