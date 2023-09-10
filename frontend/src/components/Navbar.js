import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { UserContext } from "../UserContext"; // Import your context

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const isLoggedIn = localStorage.getItem("user_id");
  const location = useLocation();
  const { foodCount, updateFoodCount } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const received_cart = await fetch("http://localhost:5000/api/getcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
        }),
      });
      const received_cart_json = await received_cart.json();
      updateFoodCount(received_cart_json.length);
    }
    fetchData();
  }, []);

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
          <Link className="navbar-brand fs-1 fst-italic text-warning" to="/">
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
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link fs-5 ${location.pathname === "/user/restaurant" ? "active" : ""
                        }`}
                      to="/user/restaurant"
                      style={{ color: location.pathname === "/user/restaurant" ? 'orange' : 'white' }}
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link fs-5 ${location.pathname === "/user/dashboard" ? "active" : ""
                        }`}
                      to="/user/dashboard"
                      style={{ color: location.pathname === "/user/dashboard" ? 'orange' : 'white' }}
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                ""
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
                      right: "4px", // Adjust the horizontal position as needed
                      background: "white",
                      color: "black",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "10px",
                    }}
                  >
                    {foodCount}
                  </span>
                  ) : (
                    ""
                  )}
                </div>
                {/* <button
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={handleOrder}
                >
                  Order Now
                </button> */}
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