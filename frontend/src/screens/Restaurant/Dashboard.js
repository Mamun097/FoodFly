import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const [restaurants, setRestaurant] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [isOpen, setIsOpen] = useState(true);

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

    response.map((item, index) => {
      if (item._id === localStorage.getItem("authToken")) {
        setIsOpen(item.is_open);
      }
    });
    console.log(isOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  //Restaurant Open/Close Part
  const handleIsOpenToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurant/isopen/${localStorage.getItem(
          "authToken"
        )}`,
        {
          method: "PUT",
        }
      );

      if (response.status === 200) {
        setIsOpen(!isOpen); // Toggle the is_open status
        console.log("is_open status updated successfully");
      } else {
        console.log("Failed to update is_open status");
      }
    } catch (error) {
      console.error("Error updating is_open status:", error);
    }
  };

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
                    <div className="d-flex flex-row justify-content-between">
                      <h2>{restaurant.name}</h2>
                      <div
                        className="form-check form-switch mt-2"
                        style={{ fontSize: "22px" }}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            cursor: "pointer",
                            backgroundColor: isOpen ? "transparent" : "#ff8a00",
                          }}
                          type="checkbox"
                          id="is_open"
                          checked={!isOpen} // Use the state variable here
                          onChange={handleIsOpenToggle}
                        />
                        <label className="form-check-label" for="is_open">
                          Close Now
                        </label>
                      </div>
                    </div>

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
                    <h2 className="mt-5">Orders</h2>
                    <hr />
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
