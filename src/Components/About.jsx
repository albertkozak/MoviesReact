import React from "react";
import logo from "../images/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png";

function About() {
  return (
    <div className="favorites-container">
      <h1 id="page-title">About</h1>
      <p id="about-content">
        Built in React, this app connects to The Movie Database API to provide
        users with movie information.
      </p>
      <div className="attribution">
        <p id="about-content">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
        <img src={logo} alt="TMDB Logo" />
      </div>
    </div>
  );
}

export default About;
