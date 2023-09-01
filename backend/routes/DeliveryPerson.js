const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const DeliveryPerson = require('../models/DeliveryPerson');



const jwt = require("jsonwebtoken");
const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.post("/deliveryperson/signup",
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

        await DeliveryPerson.create({
            name: req.body.name, 
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword,
            contact: req.body.contact,
        })
        res.json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Not registered!" });
    }
});


router.post("/deliveryperson/login", async (req, res) => {
    try {
      const fetched_data = await DeliveryPerson.findOne({ email: req.body.email });
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


  router.get("/deliveryperson/dashboard", async (req, res) => {
    try {
      //database theke data fetch kortesi
      const fetched_data = await mongoose.connection.db.collection("delivery_persons");
      const delivery_persons = await fetched_data.find({}).toArray();
  
      //backend theke frontend e data pathaitesi
      res.send(delivery_persons);
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  });


module.exports = router;