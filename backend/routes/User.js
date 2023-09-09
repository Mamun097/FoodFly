const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";
const Food = require("../models/Food");

router.get("/restaurants", async (req, res) => {
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

// A D D  F A V O R I T E S
router.post('/favorites/add', async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.favorites.push(restaurantId);
    await user.save();

    res.send('Added to favorites');
  } catch (error) {
    console.error("Save failed:", error);
  return res.status(500).json({ error: error.toString() });
    // res.status(500).send('Server error');
  }
});


// R E M O V E  F A V O R I T E S
router.post('/favorites/remove', async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.favorites = user.favorites.filter(id => id.toString() !== restaurantId);
    await user.save();

    res.send('Removed from favorites');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// F E T C H  F A V O R I T E S
router.get('/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
      const user = await User.findById(userId).select('favorites -_id');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the favorite restaurant IDs
      const favoriteRestaurantIds = user.favorites.map(fav => ({ _id: fav }));
  
      // Fetch all favorite restaurants by their IDs
      const favoriteRestaurants = await Restaurant.find({
        '_id': { $in: favoriteRestaurantIds }
      });
  
      res.json(favoriteRestaurants);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });  


  router.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      //database theke data fetch kortesi
      const user = await User.findById(userId);
  
      //backend theke frontend e data pathaitesi
      res.send(user);
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  });

  router.get("/food/:foodId", async (req, res) => {
    const foodId = req.params.foodId;
    try {
      //database theke data fetch kortesi
      const food = await Food.findById(foodId);
  
      //backend theke frontend e data pathaitesi
      res.send(food);
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  });

module.exports = router; 
