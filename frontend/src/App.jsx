import React from "react";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import HomePage_Guest from "./Guest/HomePage_Guest";
import HomePage_Restaurant from "./Restaurant/HomePage_Restaurant";

function App() {
  return (
    <div>
      {/* <SignIn /> */}
      {/* <SignUp/> */}
      {/* <HomePage_Guest/> */}
      <HomePage_Restaurant/>
    </div> 
  );
}

export default App;