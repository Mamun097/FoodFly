import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function () {
  const isLoggedIn = localStorage.getItem("authToken");
  const location = useLocation();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 100,
          top: 0,
          borderBottom: "1px solid orange",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic navbar-dark" to="/">
            FoodFly
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
              <li className="nav-item">
                <Link
                  className={`nav-link fs-5 ${
                    location.pathname === "/user/restaurant"
                      ? "active"
                      : ""
                  }`}
                  to="/user/restaurant"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link fs-5 ${
                    location.pathname === "/user/dashboard" ? "active" : ""
                  }`}
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              </>
            ) : (
              ""
            )}
            </ul>
            {!isLoggedIn ? (
              <div className="d-flex">
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                    marginRight: "10px",
                  }}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                  }}
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <div className="d-flex">
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                    marginRight: "10px",
                  }}
                  to="/"
                >
                  My Cart
                </Link>
                <Link
                  className="btn"
                  style={{
                    background: "#ff8a00",
                    color: "white",
                  }}
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user_id");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
