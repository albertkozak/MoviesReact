import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Config from "../config";
import defaultPoster from "../images/default-movie-poster.jpg";

const favSymbol = ["🤍", "❤️"];

function IndividualMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const url = Config.url + id + Config.api_key;

  async function fetchData() {
    const data = await Axios.get(url);
    setMovie(data.data);
  }

  if (!isLoaded) {
    fetchData();
    setIsLoaded(true);
  }
  function formatRating(rate) {
    return parseFloat(rate) * 10 + "%";
  }

  function handleFavorite(id) {
    if (localStorage.getItem(id + "fav") === "1") {
      localStorage.removeItem(id + "fav");
      document.getElementById(id + "fav").value = favSymbol[0];
      updateFavoriteList(id, "-");
    } else {
      localStorage.setItem(id + "fav", 1);
      document.getElementById(id + "fav").value = favSymbol[1];
      updateFavoriteList(id);
    }
  }

  function handleMyRate(id) {
    var rate = document.getElementById(id + "rate").value;
    localStorage.setItem(id + "rate", rate);
    updateMyRateList(id);
  }

  function updateFavoriteList(id, option = "+") {
    var favString = localStorage.getItem("favorites");
    var favArray = [];

    if (favString != null) favArray = JSON.parse("[" + favString + "]");
    if (option === "+") {
      favArray.push(id);
      localStorage.setItem("favorites", favArray.toString());
    } else {
      favArray.splice(favArray.indexOf(id), 1);
      localStorage.setItem("favorites", favArray.toString());
    }
  }

  function updateMyRateList(id) {
    var rateString = localStorage.getItem("myrate");
    var rateArray = [];

    if (rateString != null) rateArray = JSON.parse("[" + rateString + "]");

    if (!rateArray.includes(id)) rateArray.push(id);
    localStorage.setItem("myrate", rateArray.toString());
  }
  function MovieInfo() {
    let fav = 0;
    if (parseInt(localStorage.getItem(movie.id + "fav"), 10) === 1)
      fav = fav + parseInt(localStorage.getItem(movie.id + "fav"), 10);
    let posterImage = { defaultPoster };
    if (movie.poster_path != null)
      posterImage = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

    return (
      <div className="indv-movie-container">
        <div className="indv-movie-wrapper">
          <div className="indv-movie-poster-container">
            <img
              src={posterImage}
              className="indv-movie-poster"
              alt={movie.title}
            />
          </div>
          <div className="indv-movie-info">
            <h1 className="movie-title">
              {movie.title}
              <input
                className="emoji"
                id={movie.id + "fav"}
                type="button"
                style={{ border: "none" }}
                onClick={() => handleFavorite(movie.id)}
                value={favSymbol[fav]}
              />
            </h1>
            <p className="movie-release">Release Date: {movie.release_date}</p>
            <br />
            <p className="movie-rating">
              Member Rating: {formatRating(movie.vote_average)}
            </p>
            <p className="movie-my-rating">
              My Rating: {localStorage.getItem(id + "rate")}
              <br />
              <br />
              <input
                className="rate-input"
                type="number"
                min="1"
                max="5"
                id={movie.id + "rate"}
                placeholder="0"
              />
              <input
                className="btn rate-button"
                type="button"
                onClick={() => handleMyRate(movie.id)}
                value="Rate"
              />
            </p>
          </div>
        </div>
        <div className="movie-sub-info">
          <p className="movie-tagline">{movie.tagline}</p>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <MovieInfo />
      </div>
    </div>
  );
}

export default IndividualMovie;
