import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar_DP from "../../components/Navbar_DP";
import Footer from "../../components/Footer";
import OrderCard_DP from "../../components/OrderCard_DP";

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
      if (item._id === localStorage.getItem("deliveryperson_id")) {
        setIsAvailable(item.is_available);
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
          "deliveryperson_id"
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


  //Order management part
   //Completed orders and active orders
   const [completedOrders, setCompletedOrders] = useState([]);
   const [activeOrders, setActiveOrders] = useState([]);
 
   const fetchCompletedOrders = async () => {
     let response = await fetch(
       `http://localhost:5000/api/deliveryperson/orders/${localStorage.getItem("deliveryperson_id")}`,
       {
         method: "GET",
         headers: {
           "Content-Type": "application/json", 
         },
       }
     );
 
     response = await response.json();
     console.log("response", response);
     const complete = response.filter((order) => order.status === "delivered");
     setCompletedOrders(complete);
 
     const active = response.filter((order) => order.status !== "delivered");
     setActiveOrders(active);
     console.log(activeOrders);
   };
 
   useEffect(() => {
     fetchCompletedOrders();
   }, []);
 
 //sorting orders by date
 const sortedActiveOrders = activeOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
 const sortedCompletedOrders = completedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div>
        {delivery_persons.map((item, index) => {
          if (item._id === localStorage.getItem("deliveryperson_id")) {
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
                              ? "#ff8a00"
                              : "transparent",
                          }}
                          type="checkbox"
                          id="is_available"
                          checked={isAvailable} // Use the state variable here
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


                    <div className="row lg-6">
                      {/* Active Order gula show korsi */}
                      {sortedActiveOrders.length > 0 && (
                        <div className="row lg-6">
                          <h3 className="mt-4">Active Orders</h3>
                          <hr />
                          {sortedActiveOrders.map((order) => (
                            <div
                              key={order._id}
                              className="col-12 col-md-6 col-lg-12 mb-3"
                            >
                              <OrderCard_DP
                                _id={order._id}
                                user_id={order.user_id}
                                restaurant_id={order.restaurant_id}
                                delivery_person_id={order.delivery_person_id}
                                status={order.status}
                                food_items={order.food_items}
                                total_price={order.total_price}
                                date={order.date}
                                payment_method={order.payment_method}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Completed Order gula show korsi */}
                      {sortedCompletedOrders.length > 0 && (
                        <div className="row lg-6">
                          <h3 className="mt-4">Previous Deliveries</h3>
                          <hr />
                          {sortedCompletedOrders.map((order) => (
                            <div
                              key={order._id}
                              className="col-12 col-md-6 col-lg-12 mb-3"
                            >
                              <OrderCard_DP
                                _id={order._id}
                                user_id={order.user_id}
                                restaurant_id={order.restaurant_id}
                                delivery_person_id={order.delivery_person_id}
                                status={order.status}
                                food_items={order.food_items}
                                total_price={order.total_price}
                                date={order.date}
                                payment_method={order.payment_method}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>


                  </div>
                  <Footer />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
