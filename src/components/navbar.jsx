import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useCookies } from "react-cookie";
import "../styles/navbar.css";

export const Navbar = () => {
  const [cookies, removeCookie] = useCookies(["loggedIn", "userName"]);

  const isLoggedIn = cookies.loggedIn === "true";
  const userName = cookies.userName || "";

  const handleLogout = () => {
    removeCookie("loggedIn"); // Remove the loggedIn cookie
    removeCookie("userName"); // Remove the userName cookie
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        <Link to="/cart">
          <ShoppingCart size={32} />
          Cart
        </Link>
        {isLoggedIn && <p>Hello, {userName}</p>}
        {isLoggedIn && <span onClick={handleLogout}>Logout</span>}
      </div>
    </div>
  );
};
