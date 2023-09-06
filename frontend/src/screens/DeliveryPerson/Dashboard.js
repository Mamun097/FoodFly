import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_DP from "../../components/Navbar_DP";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const [delivery_persons, setDeliveryPersons] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const fetchData = async () => {
    let response = await fetch(
      "http://localhost:5000/api/deliveryperson/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    setDeliveryPersons(response);

    response.map((item, index) => {
      if (item._id === localStorage.getItem("authToken")) {
        setIsAvailable(item.is_open);
      }
    });

    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  //Delivery Person Available/Unavailable Part
  const handleIsAvailableToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deliveryperson/isavailable/${localStorage.getItem(
          "authToken"
        )}`,
        {
          method: "PUT",
        }
      );

      if (response.status === 200) {
        setIsAvailable(!isAvailable); // Toggle the is_open status
        console.log("is_available status updated successfully");
      } else {
        console.log("Failed to update is_available status");
      }
    } catch (error) {
      console.error("Error updating is_available status:", error);
    }
  };

  return (
    <div>
      <div>
        {delivery_persons.map((item, index) => {
          if (item._id === authToken) {
            const deliveryperson = item;

            return (
              <div>
                <Navbar_DP />

                <div
                  className="container"
                  style={{ position: "relative", top: "100px" }}
                >
                  <div className="container mt-3 mx-6">
                    <div className="d-flex flex-row justify-content-between">
                      <h2>{deliveryperson.name}</h2>
                      <div
                        className="form-check form-switch mt-2"
                        style={{ fontSize: "22px" }}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            cursor: "pointer",
                            backgroundColor: isAvailable
                              ? "transparent"
                              : "#ff8a00",
                          }}
                          type="checkbox"
                          id="is_available"
                          checked={!isAvailable} // Use the state variable here
                          onChange={handleIsAvailableToggle}
                        />
                        <label className="form-check-label" for="is_open">
                          Available Now
                        </label>
                      </div>
                    </div>

                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th scope="row">Delivery Person ID</th>
                          <td>{deliveryperson._id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location</th>
                          <td>{deliveryperson.location}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail</th>
                          <td>{deliveryperson.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Contact No.</th>
                          <td>{deliveryperson.contact}</td>
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
