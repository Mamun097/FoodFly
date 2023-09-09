const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Orders = require("../models/Orders");
const Food = require("../models/Food");

//Fetching orders of a particular user
router.get("/user/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find all orders for the specified userId
    const orders = await Orders.find({ user_id: userId });

    if (!orders) {
      return res
        .json({ message: "No orders found for this user." });
    }

    // Send the orders as a response
    res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Fetching orders of a particular restaurant
router.get("/restaurant/orders/:restaurantId", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    // Find all orders for the specified restaurantId
    const orders = await Orders.find({ restaurant_id: restaurantId });

    if (!orders) {
      return res
        .json({ message: "No orders found for this restaurant." });
    }

    // Send the orders as a response
    res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/deliveryperson/:deliverypersonId", async (req, res) => {
  try {
    const dp = await DeliveryPerson.findById(req.params.deliverypersonId);
    res.status(200).json({ success: true, dp });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

//Fetching orders of a particular restaurant
router.get("/deliveryperson/orders/:deliverypersonId", async (req, res) => {
  const deliverypersonId = req.params.deliverypersonId;
  try {
    // Find all orders for the specified deliverypersonId
    const orders = await Orders.find({ delivery_person_id: deliverypersonId });

    if (!orders || orders.length === 0) {
      return res
        .json({ message: "No orders found for this delivery person." });
    }

    // Send the orders as a response
    res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Placing a new order
router.post("/orders/neworder", async (req, res) => {
  received_food_items= []
  for(let i = 0; i < req.body.food_items.length; i++){
    received_food_items.push({
      food_id: req.body.food_items[i].id,
      quantity: req.body.food_items[i].quantity
    })
  }
  try {
    await Orders.create({
      user_id: req.body.user_id,
      restaurant_id: req.body.restaurant_id,
      food_items: received_food_items,
      total_price: req.body.total_price,
    });
    res.json({ message: "New order placed!" });
  } catch (error) {
    console.log(error);
    res.json({ message: "order not placed!" });
  }
});

//Restaurant theke cancel korle order ta delete kora lagbe
router.delete("/restaurant/deleteorder/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "order deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Restaurant theke order confirm korle status change kora lagbe+delivery person id add kora lagbe
router.put(
  "/orders/confirmorder/:orderId/:deliverypersonId",
  async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const deliverypersonId = req.params.deliverypersonId;
      const confirmedOrder = await Orders.findByIdAndUpdate(orderId, {
        status: "confirmed",
        delivery_person_id: deliverypersonId,
      });

      if (!confirmedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ message: "order confirmed" });
    } catch (error) {
      console.error("Error confirming order:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

//Delivery person theke order pick up korle status change kora lagbe
router.put("/orders/pickeduporder/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const pickedupOrder = await Orders.findByIdAndUpdate(orderId, {
      status: "picked_up",
    });

    if (!pickedupOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "order status changed: picked_up" });
  } catch (error) {
    console.error("Error changing order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Delivery person theke order delivered korle status change kora lagbe
router.put("/orders/deliveredorder/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deliveredOrder = await Orders.findByIdAndUpdate(orderId, {
      status: "delivered",
    });

    if (!deliveredOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "order status changed: delivered" });
  } catch (error) {
    console.error("Error changing order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/foods", async (req, res) => {
  try {
    //database theke data fetch kortesi
    const fetched_data = await mongoose.connection.db.collection("foods");
    const foods = await fetched_data.find({}).toArray();

    //backend theke frontend e data pathaitesi
    res.send(foods);
  } catch (error) {
    console.log(error); 
    return res.json({ success: false });
  }
});

module.exports = router;
