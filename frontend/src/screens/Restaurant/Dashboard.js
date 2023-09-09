import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import Footer from "../../components/Footer";
import OrderCard_Rest from "../../components/OrderCard_Rest";

export default function Dashboard() {
  const [restaurants, setRestaurant] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const fetchData = async () => {
    let response = await fetch(
      "http://localhost:5000/api/restaurant/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    setRestaurant(response);

    response.map((item, index) => {
      if (item._id === localStorage.getItem("restaurant_id")) {
        setIsOpen(item.is_open);
      }
    });
    console.log(isOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  //Restaurant Open/Close Part
  const handleIsOpenToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurant/isopen/${localStorage.getItem(
          "restaurant_id"
        )}`,
        {
          method: "PUT",
        }
      );

      if (response.status === 200) {
        setIsOpen(!isOpen); // Toggle the is_open status
        console.log("is_open status updated successfully");
      } else {
        console.log("Failed to update is_open status");
      }
    } catch (error) {
      console.error("Error updating is_open status:", error);
    }
  };

  //Completed orders and active orders
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);

  const fetchCompletedOrders = async () => {
    let response = await fetch(
      `http://localhost:5000/api/restaurant/orders/${localStorage.getItem("restaurant_id")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    console.log("response", response);
    const complete = response.filter((order) => order.status === "delivered");
    setCompletedOrders(complete);

    const active = response.filter((order) => order.status !== "delivered");
    setActiveOrders(active);
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

//sorting orders by date
const sortedActiveOrders = activeOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
const sortedCompletedOrders = completedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div>
        {restaurants.map((item, index) => {
          if (item._id === localStorage.getItem("restaurant_id")) {
            const restaurant = item;

            return (
              <div>
                <Navbar_Restaurant />

                <img
                  key={restaurant._id}
                  src={restaurant.img}
                  alt=""
                  height="400px"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />

                <div className="container">
                  <div className="container mt-3 mx-6">
                    <div className="d-flex flex-row justify-content-between">
                      <h2>{restaurant.name}</h2>
                      <div
                        className="form-check form-switch mt-2"
                        style={{ fontSize: "22px" }}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            cursor: "pointer",
                            backgroundColor: isOpen ? "transparent" : "#ff8a00",
                          }}
                          type="checkbox"
                          id="is_open"
                          checked={!isOpen} // Use the state variable here
                          onChange={handleIsOpenToggle}
                        />
                        <label className="form-check-label" for="is_open">
                          Close Now
                        </label>
                      </div>
                    </div>

                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th scope="row">Restaurant ID</th>
                          <td>{restaurant._id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location</th>
                          <td>{restaurant.location}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail</th>
                          <td>{restaurant.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Contact No.</th>
                          <td>{restaurant.contact}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="row lg-6">
                      {/* Active Order gula show korsi */}
                      {sortedActiveOrders.length > 0 && (
                        <div className="row lg-6">
                          <h3 className="mt-4">Active Orders</h3>
                          <hr />
                          {sortedActiveOrders.map((order) => (
                            <div
                              key={order._id}
                              className="col-12 col-md-6 col-lg-6 mb-3"
                            >
                              <OrderCard_Rest
                                _id={order._id}
                                user_id={order.user_id}
                                restaurant_id={order.restaurant_id}
                                delivery_person_id={order.delivery_person_id}
                                status={order.status}
                                food_items={order.food_items}
                                total_price={order.total_price}
                                date={order.date}
                                payment_method={order.payment_method}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Completed Order gula show korsi */}
                      {sortedCompletedOrders.length > 0 && (
                        <div className="row lg-6">
                          <h3 className="mt-4">Previous Orders</h3>
                          <hr />
                          {sortedCompletedOrders.map((order) => (
                            <div
                              key={order._id}
                              className="col-12 col-md-6 col-lg-6 mb-3"
                            >
                              <OrderCard_Rest
                                _id={order._id}
                                user_id={order.user_id}
                                restaurant_id={order.restaurant_id}
                                delivery_person_id={order.delivery_person_id}
                                status={order.status}
                                food_items={order.food_items}
                                total_price={order.total_price}
                                date={order.date}
                                payment_method={order.payment_method}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Footer />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
