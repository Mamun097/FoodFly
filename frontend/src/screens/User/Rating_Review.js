import React, { useState, useEffect } from "react";
import Card from "./FoodCard_User";
import Navbar from "../../components/Navbar";
import { Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';

export default function RatingAndReview(props) {
    const { averageRating, userRating, handleUserRating, showRatingButtons, setShowRatingButtons, feedbackDisplayed, setFeedbackDisplayed } = props;

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

    return (
        <div>
            <h3>Average Rating: {averageRating.toFixed(1)}</h3>
            {renderStars(averageRating)}
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
        </div>
    );

}