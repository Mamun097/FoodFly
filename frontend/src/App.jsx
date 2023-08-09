import React from "react";
import "./assets/css/style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import JoinUs from "./components/JoinUs";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

function App() {
  return (
    <div>
      {/* <Navbar />
      <Home />
      <About />
      <JoinUs />
      <Footer /> */}
      <SignIn />
      {/* <SignUp/> */}
    </div> 
  );
}

export default App;