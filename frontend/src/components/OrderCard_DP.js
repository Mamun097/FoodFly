import React, { useState, useEffect } from "react";

export default function FoodCard_Restaurant(props) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //fetching all foods
  const [foods, setFoods] = useState([]);
  const fetchFoods = async () => {
    let response = await fetch("https://foodfly.onrender.com/api/foods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoods(response);
    console.log(foods);
  };

  //fetching restaurant
  const [restaurant, setRestaurant] = useState([]);
  const fetchRestaurants = async () => {
    let response = await fetch(
      `https://foodfly.onrender.com/api/restaurant/${props.restaurant_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setRestaurant(response);
  };

  //fetching user
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    let response = await fetch(
      `https://foodfly.onrender.com/api/user/${props.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setUser(response);
  };

  useEffect(() => {
    fetchFoods();
    fetchRestaurants();
    fetchUser();
  }, []);

  const handlePickup = async () => {
    let response = await fetch(
      `https://foodfly.onrender.com/api/orders/pickeduporder/${props._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setTimeout(() => {
        window.location.reload("http://localhost:3000/deliveryperson/dashboard");
      }, 1000); // 1000 milliseconds (1 second) delay
  };

  const handleDeliver = async () => {
    let response = await fetch(
      `https://foodfly.onrender.com/api/orders/deliveredorder/${props._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setTimeout(() => {
        window.location.reload("http://localhost:3000/deliveryperson/dashboard");
      }, 1000); // 1000 milliseconds (1 second) delay
  };

  const cardStyle = {
    width: "100%",
    height: "100%",
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
  };

  return (
    <div
      className="card mt-3"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-body"
        style={{
          boxShadow: "0px 4px 8px rgba(1, 1, 1, 0.2)",
          marginBottom: "0px",
        }}
      >
        <div className="row">
          <div className="col-6">
            <h5>
              <u>Ordered Foods</u>
            </h5>
            {foods.map((food) => {
              const orderedFood = props.food_items.find(
                (food_item) => food_item.food_id === food._id
              );

              if (orderedFood) {
                const subtotal = orderedFood.quantity * food.price;

                return (
                  <div className="row">
                    <div className="col-6">&bull; {food.name}</div>
                    <div className="col-2">X{orderedFood.quantity}</div>
                    <div className="col-4">Tk {subtotal}</div>
                  </div>
                );
              }
              return null;
            })}
            <h6 className="mt-4">Total: Tk {props.total_price}</h6>
            {
              props.payment_method === "card" ? (
                <p style={{ fontSize: "1rem", marginBottom: "0px" , marginTop: "-5px" }}>
                  Paid With Card
                </p>
              ) : (
                <p style={{ fontSize: "1rem", marginBottom: "0px" , marginTop: "-5px"}}>
                  Cash on Delivery
                </p>
              )
            }
            <p style={{ fontSize: "0.8rem", marginBottom: "0px" , marginTop: "10px"}}>
              {new Date(props.date).toLocaleString()}
            </p>
          </div>

          <div className="col-3">
            <div>
              <h5 className="mb-1">
                <u>Pick Up Address</u>
              </h5>
              <p style={{ fontSize: "1.1rem" }}>{restaurant.name}</p>
              <p style={{ fontSize: "0.8rem", marginBottom: "0px" }}>
                Address: {restaurant.location}
                <br />
                Contact: {restaurant.contact}
              </p>
            </div>
          </div>

          <div className="col-3">
            <div>
              <h5 className="mb-1">
                <u>Delivery Address</u>
              </h5>
              <p style={{ fontSize: "1.1rem" }}>{user.name}</p>
              <p style={{ fontSize: "0.8rem", marginBottom: "0px" }}>
                Address: {user.location}
                <br />
                Contact: {user.contact}
              </p>

              {props.status === "confirmed" && (
                <div className="d-flex flex-row justify-content-left mt-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handlePickup()}
                  >
                    Order Picked Up
                  </button>
                </div>
              )}

              {props.status === "picked_up" && (
                <div className="d-flex flex-row justify-content-left mt-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDeliver()}
                  >
                    Order Delivered
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
