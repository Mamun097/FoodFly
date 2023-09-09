import React, { useState, useEffect } from "react";
import Card from "./FoodCard_Restaurant";
import { Form, Button } from "react-bootstrap";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";

export default function ShowFoods_Restaurant() {
  const [foods, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [authToken, setAuthToken] = useState("");

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
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  //food items show korar jonno data fetch kora hoise
  //ekhon frontend theke backend e data pathabo food add er jonno
  const [food, setFood] = useState({
    name: "",
    CategoryName: "",
    price: 0,
    img: "",
    description: "",
  });

  const validateForm = () => {
    const errors = [];

    if (food.name.trim() === "") {
      errors.push("Name must not be empty");
    }

    if (food.CategoryName.length === 0) {
      errors.push("Category must not be empty");
    }

    if (food.price <= 0) {
      errors.push("Price must be greater than 0");
    }

    if (food.img.trim() === "") {
      errors.push("Image must not be empty");
    }

    return errors;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const errors = validateForm();

    if (errors.length > 0) {
      setIsLoading(false);
      alert(errors.join("\n"));
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/restaurant/addfood",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: food.name,
          CategoryName: food.CategoryName,
          price: food.price,
          img: food.img,
          restaurant_id: localStorage.getItem("restaurant_id"),
        }),
      }
    );

    window.location.href = "/restaurant/foods";
    setIsLoading(false);
  };

  const onChange = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Navbar_Restaurant />

    <div className="container" style={{ position: "relative", top:"100px" }}>
      {foodCategory ? (
        foodCategory.map((item, index) => {
          const foodsInCategory = foods.filter(
            (foodItem) =>
              foodItem.CategoryName === item.CategoryName &&
              foodItem.restaurant_id === localStorage.getItem("restaurant_id")
          );

          if (foodsInCategory.length > 0) {
            return (
              <div key={index} className="row mb-3">
                <h3>{item.CategoryName}</h3>
                <hr />

                {foodsInCategory.map((foodItem) => (
                  <div key={foodItem._id} className="col-12 col-md-6 col-lg-3">
                    <Card
                      _id={foodItem._id}
                      restaurant_id = {foodItem.restaurant_id}
                      name={foodItem.name}
                      img={foodItem.img}
                      CategoryName={foodItem.CategoryName}
                      price={foodItem.price}
                      is_instock={foodItem.is_instock}
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


      {/* Modal To add food*/}
      <div
        class="modal fade"
        id="AddFoodModal"
        tabindex="-1"
        aria-labelledby="AddFoodModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="AddFoodModalLabel">
                Add New Food
              </h3>
            </div>

            <div class="modal-body">
              {/* form */}
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={food.name}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Food Category"
                    name="CategoryName"
                    value={food.CategoryName}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={food.price}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Image Link"
                    name="img"
                    value={food.img}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-success btn-sm"
                onClick={handleAddSubmit}
              >
                Add food
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
