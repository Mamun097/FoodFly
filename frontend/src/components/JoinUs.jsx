import React from "react";
const JoinUs = () => {
  return (
    <>
      <section className="joinus" id="joinus">
        <h1 className="heading">
          <span>Join</span> With us
        </h1>

        <div className="row">
          <div className="image">
            <img src={(URL = "https://th.bing.com/th/id/R.b348cda5c4c0cef961adeeadb3436059?rik=xLQY3rVXCfWH5Q&pid=ImgRaw&r=0")} />
          </div>

          <div className="content">
            <h3>list your restaurant or home-made foods on FoodFly</h3>
            <p>
              Would you like millions of new customers to enjoy your amazing foods? So would we! It's simple: we list your menu online, help you process orders, pick them up, and deliver them to foodies, within some minutes!
            </p>
            <p>
              Interested? Let's start our partnership today!
            </p>
            <a href="#" className="btn">
              Create Bussiness Account
            </a>
          </div>

          <div className="content">
            <h3>List Yourself as a delivery person on FoodFly</h3>
            <p>
              Would you like to earn money by delivering food? It's simple: we list your profile online, help you get orders, pick them up, and deliver them to foodies, within some minutes!
            </p>
            <p>
                Interested? Let's start a new journey!
            </p>
            <a href="#" className="btn">
              Join As A Delivery Person
            </a>
          </div>

          <div className="image">
          <img src= {URL="https://th.bing.com/th/id/OIP.Y5MW9-Whaf4HrVZo0ADHZwAAAA?pid=ImgDet&rs=1"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUs;
