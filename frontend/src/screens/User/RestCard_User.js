import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";


export default function (props) {
  const handleClick = (e) => {
    localStorage.setItem("restaurant_id", props._id);
    console.log(props._id);
    window.location.href = "/user/restaurant/foods";
  };

  // For hover effect
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (props.is_open) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Define styles based on is_open
  const cardStyle = {
    width: "16rem",
    maxHeight: "360px",
    transform: isHovered && props.is_open ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
    cursor: isHovered && props.is_open ? "pointer" : "default",
  };

  // Conditionally handle the onClick function
  const handleCardClick = (e) => {
    if (props.is_open) {
      handleClick(e);
    }
  };

  return (
    <div>
      <div
        className="card mt-2"
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <img
          src={props.img}
          className="card-img-top"
          alt="..."
          style={{
            maxHeight: "140px",
            objectFit: "cover",
            filter: props.is_open ? "none" : "blur(2px)",
          }}
        />
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between">
            <h6 className="card-title">{props.name}</h6>
            <div style={{ fontSize: "16px", color: "#ff8a00" }}>
              &#9733;{props.averageRating.toFixed(1)}
            </div>
          </div>
          <p className="card-text text-muted fs-10">{props.location}</p>
        </div>
      </div>
    </div>
  );
}
