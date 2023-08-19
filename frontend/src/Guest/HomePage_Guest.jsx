import React, {useRef} from "react";
import "../assets/css/style.css"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import Home from "../components/Home.jsx"
import About from "../components/About.jsx"
import JoinUs from "../components/JoinUs.jsx"


const HomePage_Guest = () => {
    return (
      <div>
        <Navbar/>
        <Home/>
        <About/>
        <JoinUs/>
        <Footer/>
      </div>
      );
}

export default HomePage_Guest;