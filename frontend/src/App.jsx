import React from "react";
import "./assets/css/style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import JoinUs from "./components/JoinUs";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <JoinUs />
      <Footer />
    </div> 
  );
}

export default App;