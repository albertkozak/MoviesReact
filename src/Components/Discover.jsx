import React, { useState, useEffect } from "react";
import Select from "react-select";
import Config from "../config";
import Axios from "axios";
import MovieList from "./MovieList";

const search_year = "&primary_release_year=";
const search_genre = "&with_genres=";
const sort_by = "&sort_by=";

function Discover() {
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSort, setSort] = useState(null);

  const sort = [
    { label: "Rating: High to Low", value: "vote_average.desc" },
    { label: "Rating: Low to High", value: "vote_average.asc" },
    {
      label: "Release Date: Latest to Oldest",
      value: "primary_release_date.desc"
    },
    {
      label: "Release Date: Oldest to Latest",
      value: "primary_release_date.asc"
    },
    { label: "Title: A-Z", value: "original_title.asc" },
    { label: "Title Z-A", value: "original_title.desc" }
  ];

  useEffect(() => {
    if (!isLoaded) {
      const url = Config.url_genre + Config.api_key;
      fetchGenreData(url);
    }

    async function fetchGenreData(url) {
      const data = await Axios.get(url);
      var results = data.data.genres;
      setGenres(results.map(e => ({ label: e.name, value: e.id })));
      setIsLoaded(true);
    }
  });

  useEffect(() => {
    let url = null;

    if (
      selectedOption == null &&
      year.length === 4 &&
      year >= 1920 &&
      year <= 2020 &&
      selectedSort == null
    ) {
      url = Config.url_discover + Config.api_key + search_year + year;
    } else if (
      selectedOption == null &&
      year.length === 4 &&
      year >= 1920 &&
      year <= 2020 &&
      selectedSort != null
    ) {
      url =
        Config.url_discover +
        Config.api_key +
        search_year +
        year +
        sort_by +
        selectedSort.value;
    } else if (
      selectedOption != null &&
      year.length === 0 &&
      selectedSort == null
    ) {
      url =
        Config.url_discover +
        Config.api_key +
        search_genre +
        selectedOption.value;
    } else if (
      selectedOption != null &&
      year.length === 0 &&
      selectedSort != null
    ) {
      url =
        Config.url_discover +
        Config.api_key +
        search_genre +
        selectedOption.value +
        sort_by +
        selectedSort.value;
    } else if (
      selectedOption != null &&
      year.length === 4 &&
      year >= 1920 &&
      year <= 2020 &&
      selectedSort == null
    ) {
      url =
        Config.url_discover +
        Config.api_key +
        search_genre +
        selectedOption.value +
        search_year +
        year;
    } else if (
      selectedOption != null &&
      year.length === 4 &&
      year >= 1920 &&
      year <= 2020 &&
      selectedSort != null
    ) {
      url =
        Config.url_discover +
        Config.api_key +
        search_genre +
        selectedOption.value +
        search_year +
        year +
        sort_by +
        selectedSort.value;
    }
    if (url != null) fetchData(url);

    async function fetchData(url) {
      const data = await Axios.get(url);
      var results = data.data.results;
      setMovies(results.slice(0, 12));
    }
  }, [selectedOption, year, selectedSort]);

  const handleChangeYear = e => {
    setYear(e.target.value);
  };

  function handleSetCategories(selectedOption) {
    setSelectedOption(selectedOption);
  }

  function handleSetSort(selectedSort) {
    setSort(selectedSort);
  }

  return (
    <div>
      <h1>Discover</h1>
      <div className="discover-container">
        <form className="discover-form-inline">
          <div className="year-input">
            <input
              value={year}
              onChange={handleChangeYear}
              className="form-control"
              type="number"
              placeholder="Year"
              aria-label="Search"
              min="1920"
              max="2020"
            />
          </div>
          <div className="discover-selections">
            <Select
              isClearable={true}
              value={selectedOption}
              options={genres}
              onChange={handleSetCategories}
            />
          </div>
        </form>

        <div className="sort">
          <div className="sort-selections">
            <Select
              value={selectedSort}
              isClearable={true}
              options={sort}
              onChange={handleSetSort}
              placeholder="Sort By"
            />
          </div>
        </div>
      </div>
      <div>
        <MovieList movieData={movies} />
      </div>
    </div>
  );
}

export default Discover;
