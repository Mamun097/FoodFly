import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <div class="container-fluid">
          <Link class="navbar-brand fs-1 fst-italic" to="/">
            FoodFly
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
