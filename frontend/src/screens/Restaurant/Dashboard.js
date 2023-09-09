import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import Footer from "../../components/Footer";
import { Modal, Button } from "react-bootstrap";

export default function Dashboard() {
  const [restaurants, setRestaurant] = useState([]);
  const [averageRating, setAverageRating] = useState(0); // Add this line
  const [reviews, setReviews] = useState([]); // Add this line
  const [authToken, setAuthToken] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
      if (item._id === localStorage.getItem("authToken")) {
        setIsOpen(item.is_open);
      }
    });
    console.log(isOpen);
  };

  const fetchRating = async () => {
    //average rating will be fetched from the database
  const desired_restaurant_id = localStorage.getItem("restaurant_id");
   console.log("resturant id",desired_restaurant_id);
    const response = await fetch(
      `http://localhost:5000/api/restaurant/rating/${desired_restaurant_id}`,
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
    console.log("resturant id",desired_restaurant_id);
    const response = await fetch(
      `http://localhost:5000/api/restaurant/review/${desired_restaurant_id}`
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
        `http://localhost:5000/api/restaurant/isopen/${localStorage.getItem(
          "authToken"
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

  return (
    <div>
      <div>
        {restaurants.map((item, index) => {
          if (item._id === authToken) {
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
                        <tr>
                          <th scope="row">Average Rating</th>
                          <td>
                            {renderStars(averageRating)}
                            <span className="ms-2">{averageRating.toFixed(1)}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Adding for rating and review */}

                    {/* Add the following lines to display Average Rating and Reviews Button */}


                    <button type="button" className="btn btn-primary" onClick={toggleReviewModal}>
                      Reviews
                    </button>

                    {/* Reviews Modal */}
                    <Modal show={showReviewModal} onHide={toggleReviewModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Reviews</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {
                          reviews.map((review, index) => (
                            <div key={index} style={{ backgroundColor: '#f2f2f2', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                              <h6>Username: {review.username}</h6>
                              <p>User ID: {review.userId}</p>
                              <p>Time of Review: {new Date(review.date).toLocaleString()}</p>
                              <p>Review: {review.review}</p>
                            </div>
                          ))
                        }
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={toggleReviewModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <h2 className="mt-5">Orders</h2>
                    <hr />
                  </div>

                  {/* <Footer /> */}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
