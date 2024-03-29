import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import Footer from "../../components/Footer";
import { Modal, Button } from "react-bootstrap";
import OrderCard_Rest from "../../components/OrderCard_Rest";

export default function Dashboard() {
  const [restaurants, setRestaurant] = useState([]);
  const [averageRating, setAverageRating] = useState(0); // Add this line
  const [reviews, setReviews] = useState([]); // Add this line
  const [authToken, setAuthToken] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchData = async () => {
    let response = await fetch(
      "https://foodfly.onrender.com/api/restaurant/dashboard",
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

  const fetchRating = async () => {
    //average rating will be fetched from the database
    const desired_restaurant_id = localStorage.getItem("restaurant_id");
    console.log("resturant id", desired_restaurant_id);
    const response = await fetch(
      `https://foodfly.onrender.com/api/restaurant/rating/${desired_restaurant_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setAverageRating(data.averageRating); // Update the rating in the state
    } else {
      console.error("Failed to fetch the average rating");
    }
  };

  // New function to fetch reviews
  const fetchReviews = async () => {
    const desired_restaurant_id = localStorage.getItem("restaurant_id");
    console.log("resturant id", desired_restaurant_id);
    const response = await fetch(
      `https://foodfly.onrender.com/api/restaurant/review/${desired_restaurant_id}`
    );
    const data = await response.json();
    if (data.success) {
      setReviews(data.reviews);
    }
  };

  // Function to render stars
  const renderStars = (averageRating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(averageRating)) {
        stars.push(
          <i className="bi bi-star-fill" style={{ color: "#ff8a00" }}></i>
        );
      } else if (i === Math.ceil(averageRating)) {
        const percentage = ((averageRating % 1) * 100).toFixed(2);
        stars.push(
          <div style={{ position: "relative", display: "inline-block" }}>
            <i className="bi bi-star" style={{ color: "#ff8a00" }}></i>
            <div
              style={{
                position: "absolute",
                overflow: "hidden",
                top: 0,
                left: 0,
                width: `${percentage}%`,
                zIndex: 1,
              }}
            >
              <i className="bi bi-star-fill" style={{ color: "#ff8a00" }}></i>
            </div>
          </div>
        );
      } else {
        stars.push(<i className="bi bi-star" style={{ color: "#ff8a00" }}></i>);
      }
    }
    return stars;
  };

  useEffect(() => {
    fetchData();
    fetchRating();
    fetchReviews();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  //Restaurant Open/Close Part
  const handleIsOpenToggle = async () => {
    try {
      const response = await fetch(
        `https://foodfly.onrender.com/api/restaurant/isopen/${localStorage.getItem(
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

  const toggleReviewModal = () => setShowReviewModal(!showReviewModal);

  //Completed orders and active orders
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);

  const fetchCompletedOrders = async () => {
    let response = await fetch(
      `https://foodfly.onrender.com/api/restaurant/orders/${localStorage.getItem(
        "restaurant_id"
      )}`,
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
  const sortedActiveOrders = activeOrders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const sortedCompletedOrders = completedOrders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div>
                        <h2>{restaurant.name}</h2>
                        {renderStars(averageRating)}
                        <span className="ms-2">
                          {averageRating.toFixed(1)}
                        </span>{" "}
                        <br />
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-sm mt-2"
                          onClick={toggleReviewModal}
                        >
                          See Reviews
                        </button>
                      </div>
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

                    <table className="table table-hover mt-3">
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

                    {/* Reviews Modal */}
                    <Modal show={showReviewModal} onHide={toggleReviewModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>All Reviews</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{maxHeight: "70vh", overflowY: "auto"}}
                      >
                        {reviews.map((review, index) => (
                          <div
                            key={index}
                            style={{
                              backgroundColor: "white",
                              margin: "10px",
                              padding: "10px",
                              borderRadius: "5px",
                              boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.2)",
                            }}
                          >
                            <h6> {index+1}. {review.username}</h6>
                            
                            <p style={{ fontSize: "15px" }}
                            >{review.review}</p>
                            <p style={{ fontSize: "12px" }}>
                              {new Date(review.date).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </Modal.Body>
                    </Modal>

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
