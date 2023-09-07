import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import OrderCard from "../../components/OrderCard";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [authToken, setAuthToken] = useState("");

  const fetchData = async () => {
    let response = await fetch(
      `http://localhost:5000/api/user/${localStorage.getItem("user_id")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    setUser(response);
  };

  useEffect(() => {
    const token = localStorage.getItem("user_id");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //Fetching orders of the user
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    let response = await fetch(
      `http://localhost:5000/api/user/orders/${localStorage.getItem(
        "user_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    setOrders(response);
    console.log(orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //Completed orders
  const [completedOrders, setCompletedOrders] = useState([]);
  const fetchCompletedOrders = async () => {
    let response = await fetch(
      `http://localhost:5000/api/user/orders/${localStorage.getItem(
        "user_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    response = response.filter((order) => order.status === "delivered");
    setCompletedOrders(response);
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container" style={{ position: "relative", top: "100px" }}>
        <div className="container mt-3 mx-6">
          <div className="d-flex flex-row justify-content-between">
            <h2>{user.name}</h2>
          </div>

          <table className="table table-hover">
            <tbody>
              <tr>
                <th scope="row">User ID</th>
                <td>{user._id}</td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td>{user.location}</td>
              </tr>
              <tr>
                <th scope="row">E-mail</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Contact No.</th>
                <td>{user.contact}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-5">Orders</h2>
          <hr />

          <div className="row">
            {completedOrders.map((order) => (
              <div key={order._id} className="col-12 col-md-6 col-lg-6">
                <OrderCard
                  _id={order._id}
                  user_id={order.user_id}
                  restaurant_id={order.restaurant_id}
                  delivery_person_id={order.delivery_person_id}
                  status={order.status}
                  food_items={order.food_items}
                  date={order.date}
                  payment_method={order.payment_method}
                  account_type="user"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
