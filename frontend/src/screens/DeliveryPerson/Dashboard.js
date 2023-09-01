import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_DP from "../../components/Navbar_DP";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const [delivery_persons, setDeliveryPersons] = useState([]);
  const [authToken, setAuthToken] = useState("");

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
        {delivery_persons.map((item, index) => {
          if (item._id === authToken) {
            const deliveryperson = item;

            return (
              <div>
                <Navbar_DP />

                <div
                  className="container"
                  style={{
                    position: "relative",
                    top: "100px",
                  }}
                >
                  <div className="container mt-3 mx-6">
                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <td>{deliveryperson.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">ID</th>
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
                    <h1 className="mt-5">Deliveries</h1>
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
