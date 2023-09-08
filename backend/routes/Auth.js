const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const DeliveryPerson = require("../models/DeliveryPerson");
const { body, validationResult } = require("express-validator");
const Food = require("../models/Food");
const Cart = require("../models/Cart")
const Order = require("../models/Orders")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.post("/createuser",
  body("name", "Name is too short!").isLength({ min: 1 }),
  body("location", "Loacation is too short!").isLength({ min: 1 }),
  body("email", "Invalid email!").isEmail(),
  body("password", "Password is too short!").isLength({ min: 6 }),


  async (req, res) => {
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

        await User.create({ 
            name: req.body.name, 
            location: req.body.location,
            email: req.body.email,
            contact: req.body.contact,
            password: hashedPassword,
        })
        res.json({ message: "User Created" });
    } catch (error) {
      console.log(error);
      res.json({ message: "User Not Created" });
    }
  });


router.post("/login", async (req, res) => {
  try {
    const fetched_data = await User.findOne({ email: req.body.email });
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

    // console.log(fetched_data.name); 
    
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({
      success: true,
      authToken: authToken,
      userId: fetched_data.id,
      userName: fetched_data.name
    });
  
router.post("/addtocart", async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.body.user_id });

    //console.log(user._id);
    if (!user) {
      console.log("error occured here");
      return res.status(400).json({ errors: [{ message: "User doesn't exist!" }] });
    }
    console.log("user found");
    if(req.body.food_id==null){
      //return res.status(400).json({ errors: [{ message: "Food doesn't exist!" }] });
      console.log("food not found");
    }
    await Cart.create({
      user_id: req.body.user_id,
      food_id: req.body.food_id,
      restaurant_id: req.body.restaurant_id
    })
    res.json({ message: "Food added to cart!!" });
  }
  catch (error) {
    console.log("error occured here");
    console.log(error);
  }
});

router.post("/getcart", async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req.body.user_id });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/getfood", async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.body.food_id });
    console.log(food);
    res.json(food);
  } catch (error) {
    console.log(error);
  }
});

router.post("/removefromcart", async (req, res) => {
  try {
    const cart = await Cart.deleteMany({ user_id: req.body.user_id });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/removefoodfromcart", async (req, res) => {
  try {
    const cart = await Cart.deleteOne({ user_id: req.body.user_id, food_id: req.body.food_id });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/removeallfoodfromcart", async (req, res) => {
  try {
    const cart = await Cart.deleteMany({ user_id: req.body.user_id, food_id: req.body.food_id });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/placeorder", async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req.body.user_id });
    if (cart.length == 0) {
      return res.status(400).json({ errors: [{ message: "Cart is empty!" }] });
    }
    console.log(cart);
    food_id = [];
    restaurant_id = cart[0].restaurant_id;
    user_id = cart[0].user_id;
    for (let i = 0; i < cart.length; i++) {
      food_id.push(cart[i].food_id);
    }
    await Order.create({
      user_id: user_id,
      food_id: food_id,
      restaurant_id: restaurant_id
    })
    res.json({ message: "Order placed!!" });
    console.log("order placed");
  }
    catch (error) {
    console.log(error);
  }
});

module.exports = router;