const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const DeliveryPerson = require('../models/DeliveryPerson');
const Food = require('../models/Food');
const FoodCategory = require('../models/FoodCategory');



const jwt = require("jsonwebtoken");
const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.post("/restaurant/signup",
async(req, res) => {
    try {
        // Check if the email exists in User, Restaurant, and DeliveryPerson tables
        const user = await User.findOne({ email: req.body.email });
        const restaurant = await Restaurant.findOne({ email: req.body.email });
        const deliveryPerson = await DeliveryPerson.findOne({ email: req.body.email });

        if (user || restaurant || deliveryPerson) {
            return res.status(400).json({ errors: [{ message: "Email already exists" }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await Restaurant.create({
            name: req.body.name, 
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword,
            contact: req.body.contact,
            is_homekitchen: req.body.is_homekitchen,
            img: req.body.img,
        })
        res.json({ message: "Congratulations! You have successfully registered your restaurant." });
    } catch (error) {
        console.log(error);
        res.json({ message: "Restaurant not registered!" });
    }
});


router.post("/restaurant/login", async (req, res) => {
    try {
      const fetched_data = await Restaurant.findOne({ email: req.body.email });
      if (!fetched_data) {
        return res
          .status(400)
          .json({ errors: [{ message: "Email doesn't exist!" }] });
      }
  
      const salt = fetched_data.salt;
      const isMatch = await bcrypt.compare(req.body.password, fetched_data.password, salt);
  
      if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ message: "Enter valid credentials!" }] });
        }
  
      const data = { 
          user: {
            id: fetched_data.id, 
          },
        };
      
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true , authToken  : fetched_data._id});
    } catch (error) {
      console.log(error);  }
      return res.json({ success: false });
  });





// D A S H B O A R D    P A G E

router.get("/restaurant/dashboard", async (req, res) => {
  try {
    //database theke data fetch kortesi
    const fetched_data = await mongoose.connection.db.collection("restaurants");
    const restaurants = await fetched_data.find({}).toArray();

    //backend theke frontend e data pathaitesi
    res.send(restaurants);
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});


// F O O D S    P A G E
router.get("/restaurant/foods", async (req, res) => {
  try {
    //database theke data fetch kortesi
    const fetched_data = await mongoose.connection.db.collection("foods");
    const food_items = await fetched_data.find({}).toArray();

    const fetchFoodCategory = await mongoose.connection.db.collection("foodCategory");
    const food_category = await fetchFoodCategory.find({}).toArray();

    const fetched_restaurant = await mongoose.connection.db.collection("restaurants");
    const restaurant = await fetched_restaurant.find({}).toArray();

    //backend theke frontend e data pathaitesi
    res.send([food_items, food_category, restaurant]);
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});


// A D D    F O O D
router.post("/restaurant/addfood", 
async(req, res) => {
    try {
        const category = await FoodCategory.findOne({ CategoryName: req.body.CategoryName });
        if (!category) {
            await FoodCategory.create({
                CategoryName: req.body.CategoryName,
            })
        }

        await Food.create({
            name: req.body.name, 
            restaurant_id: req.body.restaurant_id,
            CategoryName: req.body.CategoryName,
            price: req.body.price,
            img: req.body.img,
        })
        res.json({ message: "New food added!" });
    } catch (error) {
        console.log(error);
        res.json({ message: "food not added!" });
    }
});


// D E L E T E    F O O D
// routes/Restaurant.js 
router.delete("/restaurant/deletefood/:foodId", async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json({ message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// E D I T    F O O D
router.put('/restaurant/editfood/:foodId', async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const updatedData = req.body;

    // Find the food item by ID and update its data
    const updatedFood = await Food.findByIdAndUpdate(foodId, updatedData, { new: true });

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    return res.json({ message: 'Food item updated successfully', updatedFood });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating food item' });
  }
});


// S T O C K   O U T
router.put('/fooditems/stockout/:foodId', async (req, res) => {
  const { foodId } = req.params;

  try {
    // Find the food item by ID
    const foodItem = await Food.findById(foodId);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Toggle the is_instock field
    foodItem.is_instock = !foodItem.is_instock;

    // Save the updated food item
    await foodItem.save();

    return res.json({ message: "Stock Out status updated", isStockOut: foodItem.is_instock });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;