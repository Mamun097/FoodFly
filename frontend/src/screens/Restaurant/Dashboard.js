import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const [restaurants, setRestaurant] = useState([]);
  const [authToken, setAuthToken] = useState("");

  const fetchData = async () => {
    let response = await fetch(
      "http://localhost:5000/api/restaurant/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    setRestaurant(response);
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  return (
    <div>
      <div>
        {restaurants.map((item, index) => {
          if (item._id === authToken) {
            const restaurant = item;

            return (
              <div>
                <Navbar_Restaurant />

                <img
                  key={restaurant._id}
                  src={restaurant.img}
                  alt=""
                  height="400px"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />

                <div className="container">
                  <div className="container mt-3 mx-6">
                    <h1>{restaurant.name}</h1>

                    <table className="table table-hover">
                      <tbody>
                      <tr>
                          <th scope="row">Restaurant ID</th>
                          <td>{restaurant._id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location</th>
                          <td>{restaurant.location}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail</th>
                          <td>{restaurant.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Contact No.</th>
                          <td>{restaurant.contact}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h1 className="mt-5">Orders</h1>
                    <hr/>
                  </div>

                  

                  {/* <Footer /> */}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
