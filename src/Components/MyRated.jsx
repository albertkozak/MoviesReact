import React, { useState } from "react";
import Axios from "axios";
import Config from "../config";
import MovieList from "./MovieList";

function MyRated() {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  let rateString = localStorage.getItem("myrate");
  let rateArray = [];
  if (rateString != null && !isLoaded) {
    rateArray = JSON.parse("[" + rateString + "]");
    fetchData(rateArray);
  }

  async function fetchData(rateArray) {
    const movieList = [];
    for (let id of rateArray) {
      const url = Config.url + id + Config.api_key;
      const data = await Axios.get(url);
      movieList.push(data.data);
    }
    setMovies(movieList);
    setIsLoaded(true);
  }

  if (movies.length > 0) {
    return (
      <div className="favorites-container">
        <h1 id="page-title">My Rated</h1>
        <div>
          <MovieList movieData={movies} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="favorites-container">
        <h1 id="page-title">My Rated Movies</h1>
        <h2 id="page-subtitle">
          Sorry you have no rated movies. Search for a movie to add to your
          favourites.
        </h2>
      </div>
    );
  }
}

export default MyRated;
