import React from "react";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import HomePage_Guest from "./Guest/HomePage_Guest";

function App() {
  return (
    <div>
      {/* <SignIn />
      <SignUp/> */}
      <HomePage_Guest/>
    </div> 
  );
}

export default App;