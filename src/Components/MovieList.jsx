import React from "react";
import { Link } from "react-router-dom";
import defaultPoster from "../images/default-movie-poster.jpg";

const favSymbol = ["🤍", "❤️"];
const MAX_LENGTH = 171;

class MovieList extends React.Component {
  render() {
    const movieData = this.props.movieData;
    const listItems = movieData.map(movie => (
      <ListItem key={movie.id} value={movie} />
    ));
    return <div className="card-container">{listItems}</div>;
  }
}

function updateFavorites(id, option = "+") {
  const favString = localStorage.getItem("favorites");
  let favArray = [];

  if (favString != null) favArray = JSON.parse("[" + favString + "]");
  if (option === "+") {
    favArray.push(id);
    localStorage.setItem("favorites", favArray.toString());
  } else {
    favArray.splice(favArray.indexOf(id), 1);
    localStorage.setItem("favorites", favArray.toString());
  }
}

function handleFavorite(id) {
  if (localStorage.getItem(id + "fav") === "1") {
    localStorage.removeItem(id + "fav");
    document.getElementById(id + "fav").value = favSymbol[0];
    updateFavorites(id, "-");
  } else {
    localStorage.setItem(id + "fav", 1);
    document.getElementById(id + "fav").value = favSymbol[1];
    updateFavorites(id);
  }
}

function ListItem(props) {
  let fav = 0;
  let myRate = "N/A";
  const movie = props.value;
  if (parseInt(localStorage.getItem(movie.id + "fav"), 10) === 1)
    fav = fav + parseInt(localStorage.getItem(movie.id + "fav"), 10);
  if (localStorage.getItem("myrate") != null)
    myRate = localStorage.getItem(movie.id + "rate");
  let posterImage = { defaultPoster };
  if (movie.poster_path != null)
    posterImage = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  return (
    <div className="">
      <article className="card card">
        <div className="card_info-hover" />
        <div className="card_img" />
        <div className="card_link">
          <div className="card_img--hover">
            <Link to={"/Individual/" + movie.id}>
              <img
                className="movie-poster"
                alt={movie.title}
                src={posterImage}
              />
            </Link>
          </div>
        </div>
        <div className="card_info">
          <span className="card_category">
            {" "}
            <Link to={"/Individual/" + movie.id}>
              <h3 className="movie-title">{movie.title}</h3>
            </Link>
          </span>
          <div className="movie-overview">
            <div>
              {movie.overview.length > MAX_LENGTH ? (
                <div>
                  {`${movie.overview.substring(0, MAX_LENGTH)}...`}
                  <Link to={"/Individual/" + movie.id}>Read more</Link>
                </div>
              ) : (
                <p>{movie.overview}</p>
              )}
            </div>
          </div>
          <span>
            {" "}
            <div className="movie-release">
              <p>Release Date: {movie.release_date}</p>
            </div>
          </span>
          <input
            className="emoji"
            id={movie.id + "fav"}
            type="button"
            style={{ border: "none" }}
            onClick={() => handleFavorite(movie.id)}
            value={favSymbol[fav]}
          />
        </div>
      </article>
    </div>
  );
}

export default MovieList;
