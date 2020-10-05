import React, { useState } from "react";
import Axios from "axios";
import Config from "../config";
import MovieList from "./MovieList";

function MyFavorites() {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  let favourites = localStorage.getItem("favorites");
  let favouritesArray = [];
  if (favourites != null && !isLoaded) {
    favouritesArray = JSON.parse("[" + favourites + "]");
    (async () => {
      try {
        fetchData(favouritesArray);
      } catch (e) {
        console.log("Caught error: " + e.message);
      }
    })();
  }

  async function fetchData(favouritesArray) {
    const movieList = [];
    for (let id of favouritesArray) {
      const url = Config.url + id + Config.api_key;
      const data = await Axios.get(url);
      movieList.push(data.data);
    }
    console.log(movieList);
    setMovies(movieList);
    setIsLoaded(true);
  }

  if (movies.length > 0) {
    return (
      <div className="favorites-container">
        <h1 id="page-title">My Favorites</h1>
        <div>
          <MovieList movieData={movies} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="favorites-container">
        <h1 id="page-title">My Favorites</h1>
        <h2 id="page-subtitle">
          Sorry you have no favourited movies. Search for a movie to add to your
          favourites.
        </h2>
      </div>
    );
  }
}

export default MyFavorites;
