import React from "react";
const About = () => {
  return (
    <>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us
        </h1>

        <div className="row">
          <div className="image">
            <img src= {URL="https://wallpapercave.com/wp/wp7393293.jpg"} />
          </div>

          <div className="content">
            <h3>What Makes Us Special?</h3>
            <p>
            At <span>FoodFly</span>, we pride ourselves on delivering freshly cooked food with lightning-fast delivery service. 
            With an extensive menu catering to all tastes and multiple payment options, ordering your favorite dishes is a breeze. 
            Experience the convenience, taste, and safety we offer, and treat yourself to a delightful dining experience from the comfort of your home.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
