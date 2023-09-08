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
    let response = await fetch("http://localhost:5000/api/foods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoods(response);
    console.log(foods);
  };

  //fetching user
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    let response = await fetch(
      `http://localhost:5000/api/user/${props.user_id}`,
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
    fetchUser();
  }, []);

  const handleReject = async () => {
    let response = await fetch(
      `http://localhost:5000/api/restaurant/deleteorder/${props._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setTimeout(() => {
      window.location.reload("http://localhost:3000/restaurant/dashboard");
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  //Handle accept

  const [deliverypersons, setDeliverypersons] = useState([]);
  const fetchDeliverypersons = async () => {
    let response = await fetch(
      "http://localhost:5000/api/deliveryperson/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setDeliverypersons(response);
    console.log(deliverypersons);
  };

  const [restaurant, setRestaurant] = useState([]);
  const fetchRestaurant = async () => {
    let response = await fetch(
      `http://localhost:5000/api/restaurant/${props.restaurant_id}`,
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

  useEffect(() => {
    fetchDeliverypersons();
    fetchRestaurant();
  }, []);

  const handleAccept = async () => {
    let dp_id = "";
    deliverypersons.map((deliveryperson) => {
      if (deliveryperson.location === restaurant.location && deliveryperson.is_available === true) {
        dp_id = deliveryperson._id;
      }
    });
    console.log("props.res", restaurant._id);
    let response = await fetch(
      `http://localhost:5000/api/orders/confirmorder/${props._id}/${dp_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setTimeout(() => {
      window.location.reload("http://localhost:3000/restaurant/dashboard");
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
          <div className="col-8">
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
            <h5 className="mt-4">Total Price: Tk </h5>
            <p style={{ fontSize: "0.8rem", marginBottom: "0px" }}>
              {new Date(props.date).toLocaleString()}
            </p>
          </div>

          <div className="col-4">
            <div>
              <h5 className="mb-1">
                <u>Customer</u>
              </h5>
              <p style={{ fontSize: "1.1rem" }}>{user.name}</p>
              <p style={{ fontSize: "0.8rem", marginBottom: "0px" }}>
                Address: {user.location}
                <br />
                Contact: {user.contact}
              </p>

              <div
                className="d-flex flex-row justify-content-left mt-4"
                style={{ alignItems: "center", marginBottom: "0px" }}
              >
                {props.status === "confirmed" && (
                  <h5>
                    <span
                      className="badge bg-success text-white badge-lg"
                      style={{ alignSelf: "flex-start" }}
                    >
                      Confirmed
                    </span>
                  </h5>
                )}
                {props.status === "picked_up" && (
                  <h5>
                    <span
                      className="badge bg-warning text-white badge-lg"
                      style={{ alignSelf: "flex-start" }}
                    >
                      On The Way
                    </span>
                  </h5>
                )}
              </div>
            </div>
          </div>

          {props.status === "pending" && (
            <div className="d-flex flex-row justify-content-end mt-2">
              <button
                className="btn btn-outline-danger btn-sm me-4"
                onClick={() => handleReject()}
              >
                Reject
              </button>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => handleAccept()}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
