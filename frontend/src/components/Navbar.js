import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { UserContext } from "../UserContext"; // Import your context

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const isLoggedIn = localStorage.getItem("authToken");
  //const count = 5;
  //const [foodCount, setFoodCount] = useState(0); // State for food count
  const { foodCount, updateFoodCount } = useContext(UserContext);
  // useEffect(() => {
  //   // Update the food count from localStorage
  //   const storedFoodCount = parseInt(localStorage.getItem("food_count")) || 0;
  //   setFoodCount(storedFoodCount);
  // }, []);

  const handleOrder = async () => {
    try {

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
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 100,
          top: 0,
          borderBottom: "1px solid orange",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            FoodFly
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/user/restaurant"
                  >
                    Home
                  </Link>
                </li>
              )}
            </ul>
            {!isLoggedIn ? (
              <div className="d-flex">
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                    marginRight: "10px",
                  }}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                  }}
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <div className="d-flex">
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Link
                    className="btn"
                    style={{
                      background: "#ff8a00",
                      color: "white",
                      marginRight: "10px",
                    }}
                    to="/user/mycart"
                  >
                    {/* Replace "My Cart" text with the cart icon */}
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Link>
                  {foodCount > 0 ? (<span
                    style={{
                      position: "absolute",
                      top: "1px", // Adjust the vertical position as needed
                      right: "5px", // Adjust the horizontal position as needed
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "4px 8px",
                      fontSize: "8px",
                    }}
                  >
                    {foodCount}
                  </span>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={handleOrder}
                >
                  Order Now
                </button>
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                  }}
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user_id");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}