import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Example: Import the trash icon

export default function CartCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    width: "100%",
    maxHeight: "150px",
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
  };

  //fetching food
  const [food, setFood] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://foodfly.onrender.com/api/food/${props.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFood(data);
    };
    fetchData();
  }, []);

  return (
    <div
      className="card mt-3"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <img
              src={food.img}
              alt="..."
              style={{
                height: "146px",
                width: "150px",
                margin: "-15px 0px 0px -15px",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="col-4" style={{ margin : "0px 0px 0px -30px"}}>
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text"> {props.type} </p>
          </div>

          <div className="col-4" style={{ margin : "0px 0px 0px 0px"}}>
            <p className="card-text text-right">Quantity : {props.quantity}</p>
            <p className="card-text text-right" style={{ marginTop: "-10px" }}>
              BDT {props.price * props.quantity}
            </p>

            <div className="text-right" style={{ marginTop: "30px" }}>
              <button
                className="btn btn-sm mx-2"
                style={{
                  backgroundColor: "#ff8a00",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "4px 10px" , 
                  borderRadius: "2px",
                }}
                onClick={() =>
                  props.handleIncreaseQuantity(
                    props.id,
                    localStorage.getItem("user_id")
                  )
                }
              >
                +
              </button>
              <button
                className="btn btn-sm mx-2"
                style={{
                  backgroundColor: "#ff8a00",
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "0px 9px" , 
                  borderRadius: "2px",
                }}
                onClick={() =>
                  props.handleDecreaseQuantity(
                    props.id,
                    localStorage.getItem("user_id")
                  )
                }
              >
                -
              </button>

              <button
                className="btn btn-sm"
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() =>
                  props.handleDeleteQuantity(
                    props.id,
                    localStorage.getItem("user_id")
                  )
                }
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  color="white"
                  size="lg"
                  style={{
                    backgroundColor: "#ff8a00",
                    padding: "7px",
                    borderRadius: "2px",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
