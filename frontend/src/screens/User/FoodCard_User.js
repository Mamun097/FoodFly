import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
export default function FoodCard_Restaurant(props) {
  const [isHovered, setIsHovered] = useState(false);
  //const [foodCount, setFoodCount] = useState(0); // State for food count
  const { foodCount, updateFoodCount } = useContext(UserContext);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // useEffect(() => {
  //   // Update the food count from localStorage
  //   const storedFoodCount = parseInt(localStorage.getItem("food_count")) || 0;
  //   setFoodCount(storedFoodCount);
  // }, [foodCount]);

  const cardStyle = {
    width: "16rem",
    maxHeight: "360px",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
  };

  const onClick = async () => {
    localStorage.setItem("restaurant_id", props.restaurant_id);
    if (localStorage.getItem("user_id") === null) {
      alert("Please Login First");
    } else {
      const response = await fetch("http://localhost:5000/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          food_id: props._id,
          restaurant_id: props.restaurant_id,
        }),
      });

      const json = await response.json();
      console.log(json);
      // alert("Added to Cart");

      // Increment the food count and update localStorage
      //const updatedFoodCount = foodCount + 1;
      //setFoodCount(updatedFoodCount);
      updateFoodCount(foodCount + 1);
      
    }
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
        <h5 className="card-title">{props.name}</h5>

        <div className="d-flex flex-row justify-content-between mt-3">
          <div className="h-100 fs-5">Tk {props.price}</div>
          <button className="btn btn-success btn-sm" onClick={onClick}> Add to Cart </button>
        </div>


      </div>
    </div>
  );
}
