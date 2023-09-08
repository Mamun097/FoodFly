import React, { useState } from "react";

export default function FoodCard_Restaurant(props) {
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
  };

  return (
    <div
      className="card mt-2"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={props.img}
        className="card-img-top"
        alt="..."
        style={{ maxHeight: "140px", objectFit: "cover" }}
      />
      <div
        className="card-body"
        style={{ boxShadow: "0px 4px 8px rgba(1, 1, 1, 0.2)" }}
      >
        <h6 className="card-title">{props.name}</h6>

        <div className="d-flex flex-row justify-content-between mt-3">
          <div className="h-100 fs-6">Tk {props.price}</div>
          <button className="btn btn-success btn-sm"> Add to Cart </button>
        </div>
      </div>
    </div>
  );
}
