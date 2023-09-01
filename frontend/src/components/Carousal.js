import React from "react";

export default function Carousal() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div
            className="carousel-caption"
            style={{
              position: "absolute",
              top: "100px",
              left: "0",
              width: "100%",
              zIndex: 10,
            }}
          >
            <h1 style={{ color: "white", fontSize: "40px" }}>
              Want Some Food?
            </h1>
            <h1 style={{ color: "white", fontSize: "60px" }}>
              <span style={{ color: "white" }}>Welcome To </span>
              <span style={{ color: "orange" }}>FoodFly!</span>
            </h1>
            <h3 style={{ color: "white", fontSize: "20px", opacity: "50%" }}>
              Satisfy Your Cravings, From Anywhere, Anytime!
            </h3>
          </div>
          <div className="carousel-item active">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/PnjfGDBqFG9Vzf-CVeVEpA/o.jpg"
              style={{ filter: "brightness(40%)", maxHeight: "100vh" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/e_oQh4KscD5vczQBv2-LDg/o.jpg"
              style={{ filter: "brightness(40%)", maxHeight: "700px" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/ymUKFmQb9ZpLjj4ANkLYrQ/o.jpg"
              style={{ filter: "brightness(40%)", maxHeight: "700px" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/lzyZayO8tSOIIxDv2-0MmQ/o.jpg"
              style={{ filter: "brightness(40%)" }}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden"></span>
        </button>
      </div>
    </div>
  );
}
