import React, { useState, useEffect } from 'react';

export default function Myorder() {
  const [orderPlaced, setOrderPlaced] = useState(false); // State variable to track order placement

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orderPlaced) { // Check if order hasn't been placed yet
          // Make the API request to place the order
          fetch("http://localhost:5000/api/placeorder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: localStorage.getItem("user_id"),
            }),
          });

          // Handle the response or move the alert to an appropriate place
          console.log("sachin is here");
          // Set the orderPlaced flag to true to prevent further orders
          setOrderPlaced(true);

          // Make the API request to remove items from the cart (if needed)
          await fetch("http://localhost:5000/api/removefromcart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: localStorage.getItem("user_id"),
            }),
          });

          // Handle the response or move the alert to an appropriate place

          alert("Order Placed"); // Move this alert to the appropriate place
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // Add orderPlaced as a dependency to prevent double orders

  return <div>Myorder</div>;
}
