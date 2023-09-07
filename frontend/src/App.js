import './App.css';
import Home from './screens/Home';
import Login from './screens/User/Login';
import Signup from './screens/User/Signup';
import Signup_Restaurant from './screens/Restaurant/Signup';
import Login_Restaurant from './screens/Restaurant/Signin';
import Dashboard_Restaurant from './screens/Restaurant/Dashboard';
import Foods_Restaurant from './screens/Restaurant/Foods';
import Restaurants_User from './screens/User/HomePage';
import RestFoods_User from './screens/User/RestFoods_User';
import Signup_DP from './screens/DeliveryPerson/Signup';
import Login_DP from './screens/DeliveryPerson/Signin';
import Dashboard_DP from './screens/DeliveryPerson/Dashboard';
import Dashboard_User from './screens/User/Dashboard';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/restaurant/signup" element={<Signup_Restaurant/>}/>
          <Route exact path="/restaurant/login" element={<Login_Restaurant/>}/>
          <Route exact path="/restaurant/dashboard" element={<Dashboard_Restaurant/>}/>
          <Route exact path="/restaurant/foods" element={<Foods_Restaurant/>}/>
          <Route exact path="/user/restaurant" element={<Restaurants_User/>}/>
          <Route exact path="/user/restaurant/:_id" element={<RestFoods_User/>}/>
          <Route exact path="/deliveryperson/signup" element={<Signup_DP/>}/>
          <Route exact path="/deliveryperson/login" element={<Login_DP/>}/>
          <Route exact path="/deliveryperson/dashboard" element={<Dashboard_DP/>}/>
          <Route exact path="/user/dashboard" element={<Dashboard_User/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
