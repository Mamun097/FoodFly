import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import RestCard_User from "./RestCard_User";
import Footer from "../../components/Footer";

export default function Home() {
  // Fetch data from /api/restaurants route
  const [restaurants, setRestaurants] = useState([]);
  const [homeKitchens, setHomeKitchens] = useState([]);
  const [otherRestaurants, setOtherRestaurants] = useState([]);
  const [foodCount, setFoodCount] = useState(0); // State for food count
  const [mostPopularRestaurants, setMostPopularRestaurants] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [closed, setClosed] = useState([]);

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
    const sortedByRating = [...data].sort(
      (a, b) => b.averageRating - a.averageRating
    );

    // Take the top 5 (or however many you want) to show as most popular
    setTopRated(sortedByRating.slice(0, 4));
    console.log("Top-rated:", topRated); // Debug line

    setMostPopularRestaurants(topRated);

    const homeKitchens = data.filter((restaurant) => restaurant.is_homekitchen);
    const otherRests = data.filter((restaurant) => !restaurant.is_homekitchen);
    const closed = data.filter((restaurant) => !restaurant.is_open);
    setHomeKitchens(homeKitchens);
    setOtherRestaurants(otherRests);
    setClosed(closed);
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
      setClosed(restaurants.filter((restaurant) => !restaurant.is_open));
      setMostPopularRestaurants(topRated); // Maintain the top-rated restaurants
    } else {
      setHomeKitchens(
        restaurants.filter(
          (restaurant) =>
            restaurant.is_homekitchen &&
            restaurant.is_open &&
            (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.location.toLowerCase().includes(search.toLowerCase()))
        )
      );
      setOtherRestaurants(
        restaurants.filter(
          (restaurant) =>
            !restaurant.is_homekitchen &&
            restaurant.is_open &&
            (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.location.toLowerCase().includes(search.toLowerCase()))
        )
      );
      setClosed(
        restaurants.filter(
          (restaurant) =>
            !restaurant.is_open &&
            (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.location.toLowerCase().includes(search.toLowerCase()))
        )
      );
      setMostPopularRestaurants(
        topRated.filter(
          (restaurant) =>
            restaurant.is_open &&
            (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.location.toLowerCase().includes(search.toLowerCase()))
        )
      );
    }

  }, [search, restaurants, topRated]);
  
  useEffect(() => {
    const newFoodCount = localStorage.getItem("food_count");
    setFoodCount(newFoodCount);
  }, [localStorage.getItem("food_count")]);

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
            <h3>Most Popular</h3>
            <hr />
            {mostPopularRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                <RestCard_User
                  _id={restaurant._id}
                  name={restaurant.name}
                  img={restaurant.img}
                  location={restaurant.location}
                  is_open={restaurant.is_open}
                  averageRating={restaurant.averageRating}
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
                    averageRating={restaurant.averageRating}
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
                    averageRating={restaurant.averageRating}
                  />
                </div>
              ))}
          </div>
        )}
        {closed.length > 0 && (
          <div className="row mt-4">
            <h3>Temporarily Closed</h3>
            <hr />
            {closed.map((restaurant) => (
              <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                <RestCard_User
                  _id={restaurant._id}
                  name={restaurant.name}
                  img={restaurant.img}
                  location={restaurant.location}
                  is_open={restaurant.is_open}
                  averageRating={restaurant.averageRating}
                />
              </div>
            ))}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
