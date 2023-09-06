import React, { useState, useEffect } from "react";
import Card from "./FoodCard_User";
import Navbar from "../../components/Navbar";
import { Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


export default function ShowFoods_Restaurant() {
  const [foods, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [desired_restaurant_id, setDesiredRestaurantID] = useState(localStorage.getItem('restaurant_id'));
  const [ratingUpdated, setratingUpdated] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [showRatingButtons, setShowRatingButtons] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [feedbackDisplayed, setFeedbackDisplayed] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFeedbackDisplayed, setReviewFeedbackDisplayed] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);


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
    const userId = localStorage.getItem('user_id');
    const response = await fetch(`http://localhost:5000/api/restaurant/rating/${desired_restaurant_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, rating: userRating })
    });

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
    const response = await fetch(`http://localhost:5000/api/restaurant/rating/${desired_restaurant_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

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

  const handleReviewSubmit = async () => {
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');
    const response = await fetch(`http://localhost:5000/api/restaurant/review/${desired_restaurant_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, userName, review: userReview }),
    });

    const data = await response.json();
    if (data.success) {
      fetchReviews();
      setReviewFeedbackDisplayed(true);
      setReviewSubmitted(true);
      setTimeout(() => {
      setReviewFeedbackDisplayed(false);
    }, 3000); // Hide the message after 3 seconds
    } else {
      console.error('Failed to submit the review');
    }
  };

  // New function to fetch reviews
  const fetchReviews = async () => {
    const response = await fetch(`http://localhost:5000/api/restaurant/review/${desired_restaurant_id}`);
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

  // Function to render stars
  const renderStars = (averageRating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(averageRating)) {
        stars.push(<i className="bi bi-star-fill"></i>);
      } else if (i === Math.ceil(averageRating)) {
        const percentage = ((averageRating % 1) * 100).toFixed(2);
        stars.push(
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <i className="bi bi-star"></i>
            <div style={{
              position: 'absolute',
              overflow: 'hidden',
              top: 0,
              left: 0,
              width: `${percentage}%`,
              zIndex: 1,
            }}>
              <i className="bi bi-star-fill"></i>
            </div>
          </div>
        );
      } else {
        stars.push(<i className="bi bi-star"></i>);
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
      }, 3000);  // Hide the message after 3 seconds and show the "Rate this restaurant" button again
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
          style={{ cursor: 'pointer' }}
        ></i>
      );
    }
    return stars;
  };

  useEffect(() => {
    fetchData();
    fetchRating();
    fetchReviews();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("restaurant_id");
    setDesiredRestaurantID(id);
  }, []);

  useEffect(() => {
    if (ratingUpdated) {
      fetchRating();
      setratingUpdated(false);  // Reset the variable
    }
  }, [ratingUpdated]);

  useEffect(() => {
    if (feedbackDisplayed) {
      toggleReviewModal();  // Close the review modal
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
                <h1 className="mt-3">{restaurant.name}</h1>
                {/* Average Rating Header */}
                <div className="d-flex align-items-center">
                  <h3 style={{ marginBottom: 0 }}>Average Rating: </h3>
                  <span className="ms-2">{averageRating.toFixed(1)}</span>
                  <div className="ms-2">
                    {averageRating !== null && renderStars(averageRating)}
                  </div>
                </div>

              </div>
              <h4>{restaurant.location}</h4>
              {
                feedbackDisplayed ? (
                  <div>Thanks for your feedback!</div>
                ) : showRatingButtons ? (
                  <div>
                    {renderClickableStars()}  {/* This will render clickable stars */}
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <button onClick={() => setShowRatingButtons(true)}
                        style={{
                          backgroundColor: '#007BFF',
                          color: 'white',
                          padding: '10px 20px',
                          fontSize: '16px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Rate & Review Us!
                      </button>

                      {/* Review Modal */}
                      <Modal show={showReviewModal} onHide={toggleReviewModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Write Your Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <textarea
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                            placeholder="Write your review here"
                          />
                          {reviewSubmitted && <p>Thanks for your review!</p>}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={toggleReviewModal}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={() => { handleReviewSubmit(); toggleReviewModal(); }}>
                            Submit Review
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <button type="button" className="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#reviewsModal">
                        Our Reviews
                      </button>
                    </div>

                    {/* Reviews Modal */}
                    <div className="modal fade" id="reviewsModal" tabIndex="-1" aria-labelledby="reviewsModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="reviewsModalLabel">Our Reviews</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            {
                              reviews
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((review, index) => (
                                  <div key={index} style={{ backgroundColor: '#f2f2f2', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                                    <h6>{index + 1}. User Name: {review.username}</h6>
                                    <p>User ID: {review.user}</p>
                                    <p>Time: {new Date(review.date).toLocaleString()}</p> {/* Make sure your backend is sending date */}
                                    <p>Review: {review.review}</p>
                                  </div>
                                ))
                            }
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
              
              <h2 className="mt-3">{restaurant.name}</h2>
              <h5>{restaurant.location}</h5>
            </>
          ) : null
        )}
      </div>
      <hr />

      <div className="container">
        {foodCategory !== [] ? (
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
