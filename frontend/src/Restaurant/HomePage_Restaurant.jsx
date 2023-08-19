import React, {useRef} from "react";
import '../assets/css/style.css'
import Logo from "../assets/images/logo.png";
import Button from '@mui/material/Button';
import NotificationIcon from "../components/NotificationIcon";
import RestaurantInfo from "./Restaurant_Info";
import ActiveOrders from "./Active_Orders";

function HomePage_Restaurant() {
  const navbarRef = useRef();

    return (
      <div>
        <header className="header">
          <a href="#" className="logo">
            <img src={Logo} alt="Logo" />
          </a>

          <NotificationIcon/>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              bgcolor: "#ffc107",
              color: "white",
              fontSize: "14px",
              ":hover": { bgcolor: "#ffc107", color: "black" },
            }}
          >
            All Foods
          </Button>
        </header>

        <RestaurantInfo/>
      </div>
    );
  };

export default HomePage_Restaurant;

