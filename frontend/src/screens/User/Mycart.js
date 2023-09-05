import React, { useEffect } from 'react'
import { useState } from "react";
import Navbar from '../../components/Navbar';

//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function MyCart() {
    const [food_items, setFoodData] = useState([]);
    const [cart_data, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
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
          setFoodData(foodResults);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, []);
  
    // Calculate total whenever food_items changes
    useEffect(() => {
      let newTotal = 0;
      for (let i = 0; i < food_items.length; i++) {
        newTotal += Number(food_items[i].price);
      }
      setTotal(newTotal);
    }, [food_items]);
  
    return (
      <div>
        <div>
          <Navbar />
          <div className="container" style={{ position: "relative", top: "100px" }}>
            <h1 className="my-4">My Cart</h1>
            <hr />
  
            <ul className="list-group">
              {food_items.map((foodItem, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{foodItem.name}</h3>
                    <p>Type: {foodItem.CategoryName}</p>
                  </div>
                  <div>
                    <p className="font-weight-bold">Tk {foodItem.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
  
            <div className="mt-4">
              <h3>Total:</h3>
              <p className="font-weight-bold">Tk {total.toFixed(2)}</p>
            </div>
  

          </div>
        </div>
      </div>
    );
  }
  
  export default MyCart;
  