import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import RestCard_User from "./RestCard_User";
import Footer from "../../components/Footer";

export default function Home() {
  // Fetch data from /api/restaurants route
  const [restaurants, setRestaurants] = useState([]);
  const [homeKitchens, setHomeKitchens] = useState([]);
  const [otherRestaurants, setOtherRestaurants] = useState([]);
  const [mostPopularRestaurants, setMostPopularRestaurants] = useState([]);

  // Fetch restaurant data
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRestaurants(data);
    // Sort the restaurants by ratings (assuming you have a ratings field)
    const sortedByRating = [...data].sort((a, b) => b.averageRating - a.averageRating);
    
    // Take the top 5 (or however many you want) to show as most popular
    const topRated = sortedByRating.slice(0, 4);
    console.log("Top-rated:", topRated);  // Debug line
    
    setMostPopularRestaurants(topRated);

    const homeKitchens = data.filter((restaurant) => restaurant.is_homekitchen);
    const otherRests = data.filter((restaurant) => !restaurant.is_homekitchen);
    setHomeKitchens(homeKitchens);
    setOtherRestaurants(otherRests);
  };

  useEffect(() => {
    fetchData();
    // fetchUser();
  }, []);


  // Search
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") {
      setHomeKitchens(
        restaurants.filter((restaurant) => restaurant.is_homekitchen)
      );
      setOtherRestaurants(
        restaurants.filter((restaurant) => !restaurant.is_homekitchen)
      );
    } else {
      setHomeKitchens(
        restaurants.filter(
          (restaurant) =>
            restaurant.is_homekitchen &&
            restaurant.is_open &&
            (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.location.toLowerCase().includes(search.toLowerCase())) // Fix the parentheses here
        )
      );
      setOtherRestaurants(
        restaurants.filter(
          (restaurant) =>
            !restaurant.is_homekitchen &&
            restaurant.is_open &&
            (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.location.toLowerCase().includes(search.toLowerCase())) // Fix the parentheses here
        )
      );
    }
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="container" style={{ position: "relative", top: "100px" }}>
        <input
          className="form-control mt-2"
          type="search"
          placeholder="Enter Restaurant Name or Location to Explore"
          aria-label="Search"
          value={search}
          onChange={handleSearch}
          style={{
            boxShadow: "0px 6px 12px rgba(1, 1, 1, 0.2)",
            height: "50px", // Increase the height
            padding: "2px", // Add margin to the text area
            textAlign: "center", // Center the placeholder text
            fontSize: "1.2rem", // Increase the font-size
          }}
        />{" "}

            {/* Most Popular Restaurants */}
            {mostPopularRestaurants.length > 0 && (
          <div className="row mt-4">
            <h2>Most Popular Restaurants</h2>
            <hr />
            {mostPopularRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                <RestCard_User
                  _id={restaurant._id}
                  name={restaurant.name}
                  img={restaurant.img}
                  location={restaurant.location}
                />
              </div>
            ))}
          </div>
        )}

        {homeKitchens.length > 0 && (
          <div className="row mt-4">
            <h3>Home Kitchens</h3>
            <hr /> 
            {homeKitchens
              .filter((restaurant) => restaurant.is_open) // Filter open restaurants
              .map((restaurant) => (
                <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                  <RestCard_User
                    _id={restaurant._id}
                    name={restaurant.name}
                    img={restaurant.img}
                    location={restaurant.location}
                    is_open={restaurant.is_open}
                  />
                </div>
              ))}
          </div>
        )}
        {otherRestaurants.length > 0 && (
          <div className="row mt-4">
            <h3>Restaurants</h3>
            <hr />
            {otherRestaurants
              .filter((restaurant) => restaurant.is_open) // Filter open restaurants
              .map((restaurant) => (
                <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                  <RestCard_User
                    _id={restaurant._id}
                    name={restaurant.name}
                    img={restaurant.img}
                    location={restaurant.location}
                    is_open={restaurant.is_open}
                  />
                </div>
              ))}
          </div>
        )}
        <div className="row mt-4">
          <h3>Temporarily Closed</h3>
          <hr />
          {restaurants
            .filter((restaurant) => !restaurant.is_open) // Filter open restaurants
            .map((restaurant) => (
              <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                <RestCard_User
                  _id={restaurant._id}
                  name={restaurant.name}
                  img={restaurant.img}
                  location={restaurant.location}
                  is_open={restaurant.is_open}
                />
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
