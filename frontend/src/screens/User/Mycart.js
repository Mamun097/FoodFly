import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
function MyCart() {
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { foodCount, updateFoodCount } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      localStorage.removeItem("food_count");
      try {
        // Fetch cart_data
        const cartResponse = await fetch("http://localhost:5000/api/getcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });

        const cartData = await cartResponse.json();
        setCartData(cartData);

        // Fetch food_items for each item in cart_data
        const foodPromises = cartData.map((cartItem) =>
          fetch("http://localhost:5000/api/getfood", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              food_id: cartItem.food_id,
            }),
          }).then((response) => response.json())
        );

        const foodResults = await Promise.all(foodPromises);
        // Calculate unique food items with quantity and total price
        const uniqueFoodItems = {};
        let totalPrice = 0;

        foodResults.forEach((foodItem) => {
          if (!uniqueFoodItems[foodItem._id]) {
            uniqueFoodItems[foodItem._id] = {
              id: foodItem._id,
              name: foodItem.name,
              type: foodItem.CategoryName,
              quantity: 1,
              price: Number(foodItem.price),
            };
          } else {
            uniqueFoodItems[foodItem._id].quantity += 1;
          }
          totalPrice += Number(foodItem.price);
        });
        

        // Convert the object into an array of unique food items
        const uniqueFoodItemsArray = Object.values(uniqueFoodItems);

        setFoodItems(uniqueFoodItemsArray);
        console.log("checkin changes");
        foodItems.forEach((foodItem) => {
          console.log(foodItem);
        });
        setTotalPrice(totalPrice);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [foodItems]);

  const handleIncreaseQuantity = async (foodItemId, user_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          food_id: foodItemId,
          restaurant_id: localStorage.getItem("restaurant_id"),
        }),
      });
      const data = await response.json();
      updateFoodCount(foodCount + 1);
      if (data.success) {
        setFoodItems((prevFoodItems) =>
          prevFoodItems.map((foodItem) =>
            foodItem.id === foodItemId
              ? { ...foodItem, quantity: foodItem.quantity + 1 }
              : foodItem
          )
        );
        //navigate("/user/mycart");
      } else {
        console.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDecreaseQuantity = async (foodItemId, user_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/removefoodfromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          food_id: foodItemId,
        }),
      });
      const data = await response.json();
      updateFoodCount(foodCount - 1);
      if (data.success) {
        setFoodItems((prevFoodItems) =>
          prevFoodItems.map((foodItem) =>
            foodItem.id === foodItemId && foodItem.quantity > 1
              ? { ...foodItem, quantity: foodItem.quantity - 1 }
              : foodItem
          )
        );
        //navigate("/user/mycart");
      } else {
        console.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error(error);
    }
    
  };
  
  const handleDeleteQuantity = async (foodItemId, user_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/removeallfoodfromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          food_id: foodItemId,
        }),
      });
      const data = await response.json();
      for (let i = 0; i < foodItems.length; i++) {
        if (foodItems[i].id === foodItemId) {
          updateFoodCount(foodCount - foodItems[i].quantity);
        }
      }
      if (data.success) {
        setFoodItems((prevFoodItems) =>
          prevFoodItems.filter((foodItem) => foodItem.id !== foodItemId)
        );
      } else {
        console.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/user/mycart");
  };
  return (
    <div>
      <div>
        <Navbar />
        <div className="container" style={{ position: "relative", top: "100px" }}>
          <h1 className="my-4">My Cart</h1>
          <hr />

          <ul className="list-group">
            {foodItems.map((foodItem, index) => (
              <li key={foodItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h3>{foodItem.name}</h3>
                  <p>Type: {foodItem.type}</p>
                </div>
                <div>
                  <p>Price: Tk {foodItem.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <p className="mx-2">Quantity: {foodItem.quantity}</p>
                    <button
                      className="btn btn-sm btn-primary mx-2"
                      onClick={() => handleDecreaseQuantity(foodItem.id, localStorage.getItem("user_id"))}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-primary mx-2"
                      position="relative"

                      onClick={() => handleIncreaseQuantity(foodItem.id, localStorage.getItem("user_id"))}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-primary mx-2"
                      position="relative"

                      onClick={() => handleDeleteQuantity(foodItem.id, localStorage.getItem("user_id"))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h3>Total:</h3>
            <p className="font-weight-bold">Tk {totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
