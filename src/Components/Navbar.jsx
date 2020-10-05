import React from "react";
import logo from "../images/Movies-R-Us-Logo.png";

function Navigation() {
  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={logo} alt="Movies R Us Logo" />
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon" />
      </label>
      <ul className="menu">
        <li>
          <a href="/Discover">Discover</a>
        </li>
        <li>
          <a href="/Favorites">My Favorites</a>
        </li>
        <li>
          <a href="/Rated">My Rated</a>
        </li>
        <li>
          <a href="/About">About</a>
        </li>
      </ul>
    </header>
  );
}

export default Navigation;
