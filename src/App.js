import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Discover from "./Components/Discover";
import IndividualMovie from "./Components/IndividualMovie";
import MyFavorites from "./Components/MyFavorites";
import MyRated from "./Components/MyRated";
import About from "./Components/About";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Discover">
          <Discover />
        </Route>
        <Route path="/Individual/:id" component={IndividualMovie} />
        <Route path="/Favorites">
          <MyFavorites />
        </Route>
        <Route path="/Rated">
          <MyRated />
        </Route>
        <Route path="/About">
          <About />
        </Route>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
