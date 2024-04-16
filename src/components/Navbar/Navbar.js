import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { storeContext } from "../../Context/StoreContext";
import axios from "axios";

function Navbar({ setloginpopup }) {
  const [menu, setmenu] = useState("home");

  const { totalItem } = useContext(storeContext);

  const HandleLogout = () => {
    try {
      // Send a GET request to the logout endpoint
      axios
        .get("http://localhost:8000/api/v1/users/logout", {
          withCredentials: true,
        })
        .then((response) => {
          // Check if the logout was successful
          if (response.status === 200) {
            // Clear tokens from local storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("isAdmin");

            // Redirect to the login page or any other desired location
            window.location.replace("/");
          } else {
            // Handle logout failure
            console.error("Logout failed:", response.data.message);
            // Optionally, display an error message to the user
          }
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          // Optionally, display an error message to the user
        });
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/");
      console.error("Error during logout:", error);

      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
          <Link to={"/"}>
            <img src={assets.logo} alt="" />
          </Link>
      </div>
      {localStorage.getItem("isAdmin") === "true" ? (
        <></>
      ) : (
        <div className="navbar-center">
          <ul>
            <Link
              to="/"
              onClick={() => setmenu("home")}
              className={menu === "home" ? "navbar-menu" : ""}
            >
              Home
            </Link>
            <a
              href="#explore-menu"
              onClick={() => setmenu("menu")}
              className={menu === "menu" ? "navbar-menu" : ""}
            >
              Menu
            </a>
            <a
              href="#footer"
              onClick={() => setmenu("contact-us")}
              className={menu === "contact-us" ? "navbar-menu" : ""}
            >
              Contact Us
            </a>
          </ul>
        </div>
      )}
      <div className="navbar-right">
        {localStorage.getItem("isAdmin") === "true" ? (
          <></>
        ) : (
          <>
            <img src={assets.search_icon} alt="" className="navbar-hide" />
            <div className="navbar-right-basket">
              <Link to={"/cart"}>
                <img src={assets.basket_icon} alt="" />
              </Link>
              <div className="navbar-right-basket-dot">{totalItem}</div>
            </div>
          </>
        )}
        {localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken") ? (
          <button className="navbar-button" onClick={HandleLogout}>
            logout
          </button>
        ) : (
          <button
            className="navbar-button"
            onClick={() => {
              setloginpopup(true);
            }}
          >
            Sign In
          </button>
        )}
        {localStorage.getItem("isAdmin") === "true" ? (
          <Link to={"/products"}>
            <button className="navbar-button">Products</button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Navbar;
