import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CartCard from "../../components/CartCard";
import Footer from "../../components/Footer";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function MyCart() {
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { foodCount, updateFoodCount } = useContext(UserContext);
  const navigate = useNavigate();
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

      localStorage.removeItem("food_count");
      try {
        // Fetch cart_data
        const cartResponse = await fetch("http://localhost:5000/api/getcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });

        const cartData = await cartResponse.json();
        setCartData(cartData);

        // Fetch food_items for each item in cart_data
        const foodPromises = cartData.map((cartItem) =>
          fetch("http://localhost:5000/api/getfood", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              food_id: cartItem.food_id,
            }),
          }).then((response) => response.json())
        );

        const foodResults = await Promise.all(foodPromises);
        // Calculate unique food items with quantity and total price
        const uniqueFoodItems = {};
        let totalPrice = 0;

        foodResults.forEach((foodItem) => {
          if (!uniqueFoodItems[foodItem._id]) {
            uniqueFoodItems[foodItem._id] = {
              id: foodItem._id,
              name: foodItem.name,
              type: foodItem.CategoryName,
              quantity: 1,
              price: Number(foodItem.price),
            };
          } else {
            uniqueFoodItems[foodItem._id].quantity += 1;
          }
          totalPrice += Number(foodItem.price);
        });

        // Convert the object into an array of unique food items
        const uniqueFoodItemsArray = Object.values(uniqueFoodItems);

        setFoodItems(uniqueFoodItemsArray);
        console.log("checkin changes");
        foodItems.forEach((foodItem) => {
          console.log(foodItem);
        });
        setTotalPrice(totalPrice);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [foodItems]);

  const handleIncreaseQuantity = async (foodItemId, user_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          food_id: foodItemId,
          restaurant_id: localStorage.getItem("restaurant_id"),
        }),
      });
      const data = await response.json();
      updateFoodCount(foodCount + 1);
      if (data.success) {
        setFoodItems((prevFoodItems) =>
          prevFoodItems.map((foodItem) =>
            foodItem.id === foodItemId
              ? { ...foodItem, quantity: foodItem.quantity + 1 }
              : foodItem
          )
        );
        //navigate("/user/mycart");
      } else {
        console.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecreaseQuantity = async (foodItemId, user_id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/removefoodfromcart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
            food_id: foodItemId,
          }),
        }
      );
      const data = await response.json();
      updateFoodCount(foodCount - 1);
      if (data.success) {
        setFoodItems((prevFoodItems) =>
          prevFoodItems.map((foodItem) =>
            foodItem.id === foodItemId && foodItem.quantity > 1
              ? { ...foodItem, quantity: foodItem.quantity - 1 }
              : foodItem
          )
        );
        //navigate("/user/mycart");
      } else {
        console.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuantity = async (foodItemId, user_id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/removeallfoodfromcart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
            food_id: foodItemId,
          }),
        }
      );
      const data = await response.json();
      for (let i = 0; i < foodItems.length; i++) {
        if (foodItems[i].id === foodItemId) {
          updateFoodCount(foodCount - foodItems[i].quantity);
        }
      }
      if (data.success) {
        setFoodItems((prevFoodItems) =>
          prevFoodItems.filter((foodItem) => foodItem.id !== foodItemId)
        );
      } else {
        console.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/user/mycart");
  };

  const [payment_method, setPaymentMethod] = useState("cod");
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleOrder = async () => {
    try {
      fetch("http://localhost:5000/api/orders/neworder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          total_price: totalPrice,
          food_items: foodItems,
          restaurant_id: localStorage.getItem("restaurant_id"),
          payment_method: payment_method,
        }),
      });
      navigate("/user/dashboard");
    } catch (error) {
      console.error(error);
    }

    await fetch("http://localhost:5000/api/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
      }),
    });
    updateFoodCount(0);
    
  };
  return (
    <div>
      <div>
        <Navbar />
        <div
          className="container"
          style={{ position: "relative", top: "100px" }}
        >
          <div>
            {foodItems.length > 0 ? (
              <div>
                <h3>My Cart</h3>
                <hr />

                <div className="row lg-6">
                  {foodItems.map((foodItem, index) => (
                    <div className="col-12 col-md-6 col-lg-6 mb-3">
                      <CartCard
                        key={index}
                        id={foodItem.id}
                        name={foodItem.name}
                        type={foodItem.type}
                        price={foodItem.price}
                        quantity={foodItem.quantity}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        handleDeleteQuantity={handleDeleteQuantity}
                      />
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <h5>Total: Tk {totalPrice.toFixed(2)}</h5> <br />
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <button
                    className="btn btn-md float-end"
                    style={{ backgroundColor: "#ff8a00", color: "white" }}
                    data-bs-toggle="modal"
                    data-bs-target="#paymentModal"
                  >
                    Review Payment Method
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="text-center"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
                  alt=""
                />
              </div>
            )}

            <div
              className="modal fade"
              id="paymentModal"
              tabindex="-1"
              aria-labelledby="paymentModalLabel"
              aria-hidden="true"
              size="lg"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                  <h5 className="text-center"> Choose Payment Method</h5>
                  </div>
                  <div className="modal-body">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        style={{ width: "20px", height: "20px" }}
                        value="cod" // Set the value to "cod" for Cash on Delivery
                        checked={payment_method === "cod"} // Check if payment_method is "cod"
                        onChange={handlePaymentMethodChange} // Call this function when selected
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                        style={{ fontSize: "20px" }}
                      >
                        <FontAwesomeIcon
                          icon={faMoneyBillAlt}
                          className="mr-2"
                          color="#ff8a00"
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        style={{ width: "20px", height: "20px" }}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="card" // Set the value to "card" for Card
                        checked={payment_method === "card"} // Check if payment_method is "card"
                        onChange={handlePaymentMethodChange} // Call this function when selected
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
                        style={{ fontSize: "20px" }}
                      >
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          className="mr-2"
                          color="#ff8a00"
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Card
                      </label>

                      <div className="collapse" id="collapseExample">
                        <div>
                          <input
                            type="number"
                            className="form-control mt-3"
                            id="cardNumber"
                            placeholder="Card No."
                          />
                          <input
                            type="password"
                            className="form-control mt-3"
                            id="cardPassword"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-sm" data-bs-dismiss="modal" aria-label="Close" style={{ backgroundColor: "#ff8a00", color: "white"}} onClick={handleOrder}>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {foodItems.length > 0 ? <Footer /> : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default MyCart;
