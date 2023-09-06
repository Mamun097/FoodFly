const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const DeliveryPerson = require("../models/DeliveryPerson");
const {body, validationResult} = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.post("/createuser", 
    body("name", "Name is too short!").isLength({ min: 1 }),
    body("location", "Loacation is too short!").isLength({ min: 1 }),
    body("email", "Invalid email!").isEmail(),
    body("password", "Password is too short!").isLength({ min: 6 }),


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

        await User.create({
            name: req.body.name, 
            location: req.body.location,
            email: req.body.email,
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

    console.log(fetched_data.name);
    
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({
      success: true,
      authToken: authToken,
      userId: fetched_data.id,
      userName: fetched_data.name
    });
    
  } catch (error) {
    console.log(error);  }
    return res.json({ success: false });
});

module.exports = router;