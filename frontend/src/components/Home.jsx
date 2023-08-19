import React from "react";

function Home() {
  return (
    <section className="home" id="home">
      <div className="content">
        <h3>
          WANT SOME <span>FOOD?</span>
        </h3>
        <p>
          Satisfy Your Cravings Anytime, Anywhere!                                                                                                                                                              

        </p>
        
        <div className="search-container">
        <form className="location-search" action="#">
          <input
            type="text"
            className="location-input"
            placeholder="Enter your location  Eg. Lalbagh"
          />
          <button
            type="submit" className="findfood-btn"
          >
            Find Food
          </button>
        </form>
      </div>

      </div>
    </section>
  );
};

export default Home;
