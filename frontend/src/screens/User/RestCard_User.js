import React from "react";
import { useState } from "react";

export default function (props) {
  const handleClick = (e) => {
    localStorage.setItem("restaurant_id", props._id);
    window.location.href = "/user/restaurant/foods";
  };

  //for hover effect
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    width: "16rem",
    maxHeight: "360px",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
    cursor: isHovered ? "pointer" : "default",
  };

  return (
    <div>
      <div
        className="card mt-2"
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img
          src={props.img}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "140px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text text-muted fs-10">{props.location}</p>
        </div>
      </div>
    </div>
  );
}
