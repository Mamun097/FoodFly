import React, {useRef} from "react";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
    const navbarRef = useRef();
    const searchRef = useRef();
    const cartRef = useRef();
    const navbarHandler = () => {
      navbarRef.current.classList.toggle("active");
      searchRef.current.classList.remove("active");
      cartRef.current.classList.remove("active");
    };
  
    const searchHandler = () => {
      searchRef.current.classList.toggle("active");
      navbarRef.current.classList.remove("active");
      cartRef.current.classList.remove("active");
    };
    const cartHandler = () => {
      cartRef.current.classList.toggle("active");
      searchRef.current.classList.remove("active");
      navbarRef.current.classList.remove("active");
    };
  
    return (
      <>
        <header className="header">
          <a href="#" className="logo">
            <img src={Logo} alt="Logo" />
          </a>
          <nav className="navbar" ref={navbarRef}>
            <a href="#home">home</a>
            <a href="#about">About</a>
            <a href="#joinus">Join Us</a>
          </nav>

          <a href="#" className="login-btn">
          Sign In
          </a>
        </header>
      </>
    );
  };
  
  export default Navbar;
  