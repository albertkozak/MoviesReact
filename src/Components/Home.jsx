import React, { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";
import Config from "../config";
import MovieList from "./MovieList";

const options = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Now Playing", value: "now_playing" }
];

function Home() {
  const [title, setTitle] = useState("");
  const [movies, movieResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    label: "Popular",
    value: "popular"
  });
  const [searchTitle, setSearchTitle] = useState("");

  function addTitle() {
    setSearchTitle("Search > " + title);
  }

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = Config.url_search + Config.api_key + "&query=" + title;
    fetchData(url);

    async function fetchData(url) {
      const data = await Axios.get(url);
      const results = data.data.results;
      movieResults(results.slice(0, 12));
    }
  };

  useEffect(() => {
    if (selectedOption != null) {
      const url = Config.url + selectedOption.value + Config.api_key;
      fetchData(url);
    }

    async function fetchData(url) {
      const data = await Axios.get(url);
      const results = data.data.results;
      movieResults(results.slice(0, 12));
    }
  }, [selectedOption]);

  function handleSetCategories(selectedOption) {
    setSelectedOption(selectedOption);
  }


  return (
    <div>
      <div className="container">
        <div className="sub-menu">
          <div className="selections">
            <Select
              value={selectedOption}
              isClearable={true}
              options={options}
              onChange={handleSetCategories}
              defaultValue={{ label: "Popular", value: "popular" }}
            />
          </div>
          <div className="search-form">
            <form className="form-inline" onSubmit={handleSubmit}>
              <input
                value={title}
                onChange={handleChangeTitle}
                className="form-control"
                type="search"
                placeholder="Search Movies R Us"
                aria-label="Search"
              />
              <button
                className="search-button"
                type="submit"
                onClick={addTitle}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="col-sm-12 col-md-6" />
      </div>
      <div>
        <h2 id="search-title">{searchTitle}</h2>
        <MovieList movieData={movies} />
      </div>
    </div>
  );
}

export default Home;
