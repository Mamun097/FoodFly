import React, { useState, useEffect } from "react";
import Card from "./FoodCard_User";
import Navbar from "../../components/Navbar";
import { Row, Col } from "react-bootstrap";

export default function ShowFoods_Restaurant() {
  const [foods, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [desired_restaurant_id, setDesiredRestaurantID] = useState("");

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
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("restaurant_id");
    setDesiredRestaurantID(id);
  }, []);

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
              <h1 className="mt-3">{restaurant.name}</h1>
              <h4>{restaurant.location}</h4>
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
                  <h2>{item.CategoryName}</h2>
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
