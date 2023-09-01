import React from "react";
import { Link } from "react-router-dom";

export default function () {
  const isLoggedIn = localStorage.getItem("authToken");

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
          <Link className="navbar-brand fs-1 fst-italic" to="/">
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
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/user/restaurant"
                  >
                    Home
                  </Link>
                </li>
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
