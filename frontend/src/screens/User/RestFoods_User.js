import React, { useState, useEffect } from "react";
import Card from "./FoodCard_User";
import Navbar from "../../components/Navbar";
import { Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
window.jQuery = $;
window.$ = $;

export default function ShowFoods_Restaurant() {
  const [foods, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [desired_restaurant_id, setDesiredRestaurantID] = useState(localStorage.getItem('restaurant_id'));
  const [ratingUpdated, setratingUpdated] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [showRatingButtons, setShowRatingButtons] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [feedbackDisplayed, setFeedbackDisplayed] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFeedbackDisplayed, setReviewFeedbackDisplayed] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchData = async () => {
    let response = await fetch("http://localhost:5000/api/restaurant/foods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItems(response[0]);
    setFoodCategory(response[1]);
    setRestaurants(response[2]);
    // console.log(response);
  };

  const handleRating = async (userRating) => {
    //user will rate the restaurant
    const userId = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/restaurant/rating/${desired_restaurant_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, rating: userRating }),
      }
    );

    const data = await response.json();

    if (data.success) {
      fetchReviews(); // Fetch the latest reviews
      setratingUpdated(true); // Update the rating in the state
      return true;
    } else {
      console.error("Failed to rate the restaurant");
      return false;
    }
  };

  const fetchRating = async () => {
    //average rating will be fetched from the database
    const response = await fetch(
      `http://localhost:5000/api/restaurant/rating/${desired_restaurant_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response);

    const data = await response.json();
    // console.log(data.averageRating);

    if (data.success) {
      // console.log(data.averageRating);
      setAverageRating(data.averageRating); // Update the rating in the state
    } else {
      console.error("Failed to fetch the average rating");
    }

    setratingUpdated(false); // Reset the rating state
  };

  const fetchFavorites = async () => {
    const userId = localStorage.getItem('user_id');
    const restaurantId = localStorage.getItem('restaurant_id');
    console.log(userId);

    try {
      const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
      const data = await response.json();
      console.log("heree is the frontend part");
      console.log(data);

      if (response.ok) {
        // Update state or do something with the fetched favorites
        const favorites = data.map(fav => fav._id);

        // Setting the isFavorite state
        setIsFavorite(favorites.includes(restaurantId));
        console.log("boolean value....", isFavorite);
      } else {
        console.log("Error fetching favorites:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching favorites:", error);
    }
  };

  const handleReviewSubmit = async () => {
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const response = await fetch(
      `http://localhost:5000/api/restaurant/review/${desired_restaurant_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, userName, review: userReview }),
      }
    );

    const data = await response.json();
    if (data.success) {
      fetchReviews();
      setReviewFeedbackDisplayed(true);
      setReviewSubmitted(true);
      setTimeout(() => {
        setReviewFeedbackDisplayed(false);
      }, 3000); // Hide the message after 3 seconds
    } else {
      console.error("Failed to submit the review");
    }
  };

  // New function to fetch reviews
  const fetchReviews = async () => {
    const response = await fetch(
      `http://localhost:5000/api/restaurant/review/${desired_restaurant_id}`
    );
    const data = await response.json();
    if (data.success) {
      setReviews(data.reviews);
    }
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  //Function to toggle favourite button
  const toggleFavorite = async () => {
    // const userId = localStorage.getItem('user_id');
    const restaurantId = localStorage.getItem('restaurant_id');

    const url = isFavorite ? 'http://localhost:5000/api/favorites/remove' : 'http://localhost:5000/api/favorites/add';
    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, restaurantId }),
    };

    try {
      const response = await fetch(url, payload);
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error('Failed to update favorites');
      }

      // setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
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

  // New function to handle user rating
  const handleUserRating = async (rating) => {
    setUserRating(rating);
    const success = await handleRating(rating); // Assume handleRating() returns a boolean indicating success or failure
    if (success) {
      setFeedbackDisplayed(true);
      // setShowRatingButtons(false);
      setTimeout(() => {
        setFeedbackDisplayed(false);
        setShowRatingButtons(false);
      }, 3000); // Hide the message after 3 seconds and show the "Rate this restaurant" button again
    }
    // setratingUpdated(true); // Update the rating in the state
  };

  // New function to render clickable stars
  const renderClickableStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= userRating ? "bi bi-star-fill" : "bi bi-star"}
          onClick={() => handleUserRating(i)}
          style={{ cursor: "pointer", color: "#ff8a00" }}
        ></i>
      );
    }
    return stars;
  };

  useEffect(() => {
    fetchData();
    fetchRating();
    fetchReviews();
    fetchFavorites();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("restaurant_id");
    setDesiredRestaurantID(id);
  }, []);

  useEffect(() => {
    if (ratingUpdated) {
      fetchRating();
      setratingUpdated(false); // Reset the variable
    }
  }, [ratingUpdated]);

  useEffect(() => {
    if (feedbackDisplayed) {
      toggleReviewModal(); // Close the review modal
    }
  }, [feedbackDisplayed]);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <Row>
        <Col
          lg={12}
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="700"
          data-aos-delay="150"
        >
          <div>
            {restaurants.map((restaurant) =>
              restaurant._id === desired_restaurant_id ? (
                <img
                  key={restaurant._id}
                  src={restaurant.img}
                  alt=""
                  height="400px"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              ) : null
            )}
          </div>
        </Col>
      </Row>

      <div className="container">
        {restaurants.map((restaurant) =>
          restaurant._id === desired_restaurant_id ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mt-3">{restaurant.name}</h2>
                {/* Average Rating Header */}
                <div className="d-flex align-items-center">
                  <h5 style={{ marginBottom: 0 }}>Average Rating: </h5>
                  <span className="ms-2">{averageRating.toFixed(1)}</span>
                  <div className="ms-2">
                    {averageRating !== null && renderStars(averageRating)}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h5>{restaurant.location}</h5>

                {feedbackDisplayed ? (
                  <div>Thanks for your feedback!</div>
                ) : showRatingButtons ? (
                  <div>
                    {renderClickableStars()}{" "}
                    {/* This will render clickable stars */}
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => setShowRatingButtons(true)}
                        style={{
                          backgroundColor: "#ff8a00",
                          color: "white",
                          padding: "4px 8px",
                          fontSize: "16px",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Rate & Review Us!
                      </button>

                      <button
                        onClick={toggleFavorite}
                        className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'} ms-3`}
                        style={{
                          padding: '8px 16px',
                          fontSize: '14px',
                          borderRadius: '4px',
                          height: '43px', // Increase the height
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"
                        }}
                      >
                        <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                        {isFavorite ? ' Remove from favorites' : ' Add to favorites'}
                      </button>


                      {/* Review Modal */}
                      <Modal show={showReviewModal} onHide={toggleReviewModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Write Your Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <textarea
                            value={userReview}
                            style={{ width: "100%", height: "70px" }}
                            onChange={(e) => setUserReview(e.target.value)}
                            placeholder="Write your review here"
                          />
                          {reviewSubmitted && <p>Thanks for your review!</p>}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="danger" onClick={toggleReviewModal}>
                            Close
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "#ff8a00",
                              border: "none",
                            }}
                            onClick={() => {
                              handleReviewSubmit();
                              toggleReviewModal();
                            }}
                          >
                            Submit Review
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>

                    {/* Reviews Modal */}
                    <div
                      className="modal fade"
                      id="reviewsModal"
                      tabIndex="-1"
                      aria-labelledby="reviewsModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-scrollable modal-lg">
                        <div className="modal-content bg-dark text-white">
                          <div className="modal-header">
                            <h4 className="modal-title" id="reviewsModalLabel">
                              Our Reviews
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {reviews
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((review, index) => (
                                <div
                                  key={index}
                                  style={{
                                    backgroundColor: "#333",
                                    margin: "10px",
                                    padding: "10px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <h5>
                                    {index + 1}. {review.username}
                                  </h5>
                                  {/* <p>User ID: {review.user}</p> */}
                                  <p style={{ fontSize: "1.3rem" }}>
                                    {" "}
                                    {review.review}
                                  </p>
                                  <p style={{ fontSize: "0.8rem" }}>
                                    {new Date(review.date).toLocaleString()}
                                  </p>
                                </div>
                              ))}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>


              <div className="d-flex align-items-left mt-3">
                <a
                  href="#"
                  className="text-decoration-underline ms-auto"
                  style={{ color: "#ff8a00" }}
                  data-bs-toggle="modal"
                  data-bs-target="#reviewsModal"
                >
                  See Our Reviews
                </a>
              </div>
            </>
          ) : null
        )}
      </div>
      <hr />

      <div className="container">
        {foodCategory.length>0 ? (
          foodCategory.map((item, index) => {
            const foodsInCategory = foods.filter(
              (foodItem) =>
                foodItem.CategoryName === item.CategoryName &&
                foodItem.restaurant_id === desired_restaurant_id &&
                foodItem.is_instock === true
            );

            if (foodsInCategory.length > 0) {
              return (
                <div key={index} className="row mb-3">
                  <h3>{item.CategoryName}</h3>
                  <hr />

                  {foodsInCategory.map((foodItem) => (
                    <div
                      key={foodItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        _id={foodItem._id}
                        name={foodItem.name}
                        img={foodItem.img}
                        CategoryName={foodItem.CategoryName}
                        price={foodItem.price}
                      ></Card>
                    </div>
                  ))}
                </div>
              );
            }
            return null; // Don't render anything if there are no foods in this category
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
