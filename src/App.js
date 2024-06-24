import "./styles.css";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function App() {
  const starGenerate = (rating) => {
    const totalStars = 10;
    const activeStars = rating;

    return (
      <div>
        {[...new Array(totalStars)].map((arr, index) => {
          return index < activeStars && activeStars - index < 1 ? (
            <StarHalfIcon />
          ) : index < activeStars ? (
            <StarIcon />
          ) : (
            <StarBorderIcon />
          );
        })}
      </div>
    );
  };

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([
    {
      title: "The Matrix",
      rating: 7.5,
      category: "Action",
    },
    {
      title: "Focus",
      rating: 6.9,
      category: "Comedy",
    },
    {
      title: "The Lazarus Effect",
      rating: 6.4,
      category: "Thriller",
    },
    {
      title: "Everly",
      rating: 5.0,
      category: "Action",
    },
    {
      title: "Maps to the Stars",
      rating: 7.5,
      category: "Drama",
    },
  ]);

  const [currentRatings, setCurrentRatings] = useState([0]);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const ratings = [
    { id: 0, label: "Any rating" },
    { id: 1, label: "*.          *********" },
    { id: 2, label: "*.          *********" },
    { id: 3, label: "*.          *********" },
    { id: 4, label: "*.          *********" },
    { id: 5, label: "*.          *********" },
    { id: 6, label: "*.          *********" },
    { id: 7, label: "*.          *********" },
    { id: 8, label: "*.          *********" },
    { id: 9, label: "*.          *********" },
    { id: 10, label: "*.          *********" },
  ];

  const [currentCategories, setCurrentCategories] = useState([0]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const categories = [
    { id: 0, label: "Any genre" },
    { id: 1, label: "Action" },
    { id: 2, label: "Comedy" },
    { id: 3, label: "Drama" },
    { id: 4, label: "Thriller" },
  ];

  const categoriesMap = new Map();

  categoriesMap.set("Any genre", 0);
  categoriesMap.set("Action", 1);
  categoriesMap.set("Comedy", 2);
  categoriesMap.set("Drama", 3);
  categoriesMap.set("Thriller", 4);

  const dropDownShow = () => {
    setCategoriesOpen(false);
    setRatingsOpen(!ratingsOpen);
  };

  const dropDownShowGenre = () => {
    setRatingsOpen(false);
    setCategoriesOpen(!categoriesOpen);
  };
  const ratingChange = (event) => {
    const ratingID = parseInt(event.target.value);
    const choosen = event.target.checked;

    if (choosen) {
      if (ratingID == 0) {
        setCurrentRatings([...currentRatings.filter((id) => id == -1), 0]);
      } else {
        setCurrentRatings([
          ...currentRatings.filter((id) => id !== 0),
          ratingID,
        ]);
      }
    } else {
      setCurrentRatings(currentRatings.filter((id) => id !== ratingID));
    }
  };

  const genreChange = (event) => {
    const genreID = parseInt(event.target.value);
    const choosen = event.target.checked;

    if (choosen) {
      if (genreID == 0) {
        setCurrentCategories([
          ...currentCategories.filter((id) => id == -1),
          0,
        ]);
      } else {
        setCurrentCategories([
          ...currentCategories.filter((id) => id !== 0),
          genreID,
        ]);
      }
    } else {
      setCurrentCategories(currentCategories.filter((id) => id !== genreID));
    }
  };

  return (
    <div className="App">
      <div className="Main">
        <div className="Search">
          <div className="searchInput">
            <input
              placeholder="Enter movie Title"
              onChange={(event) => setQuery(event.target.value)}
            />
            {/* Closing SearchInput */}
          </div>

          <div className="moviesDropDown">
            {movies
              .filter((movie) => {
                if (query === "") {
                  return;
                } else if (
                  (currentRatings.includes(Math.floor(movie.rating)) ||
                    currentRatings.includes(0)) &&
                  (currentCategories.includes(
                    categoriesMap.get(movie.category),
                  ) ||
                    currentCategories.includes(0))
                ) {
                  if (movie.title.toLowerCase().includes(query.toLowerCase())) {
                    return movie;
                  }
                }
              })
              .map((movie) => (
                <div className="movieItem" key={movie.title}>
                  <div className="movieItemTitle">
                    <p>{movie.title}</p>
                    <p className="GreyText">{movie.category}</p>
                  </div>
                  {starGenerate(movie.rating)}
                </div>
              ))}
          </div>
        </div>
        {/* Closing Movies List */}

        {/* Closing Movies Bar */}

        <div className="FilterArea">
          <div className="RatingArea">
            <button
              className="dropDownButton"
              type="button"
              id="multiSelectDropdown"
              onClick={dropDownShow}
            >
              Ratings
            </button>
            <div class>
              {ratingsOpen && (
                <div
                  aria-labelledby="multiSelectDropdown"
                  className="filterDropDown"
                >
                  {ratings.map((option) => (
                    <div className="RatingCheckboxes">
                      <Form.Check
                        key={option.id}
                        type="checkbox"
                        id={`option_${option.id}`}
                        label={option.id == 0 ? "Any rating" : ""}
                        checked={currentRatings.includes(option.id)}
                        onChange={ratingChange}
                        value={option.id}
                      />
                      <div>{option.id == 0 ? "" : starGenerate(option.id)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="CategoryArea">
            <button
              className="dropDownButton"
              type="button"
              id="multiSelectDropdown"
              onClick={dropDownShowGenre}
            >
              Genres
            </button>
            {categoriesOpen && (
              <div
                aria-labelledby="multiSelectDropdown"
                className="filterDropDown"
              >
                {categories.map((option) => (
                  <Form.Check
                    key={option.id}
                    type="checkbox"
                    id={`option_${option.id}`}
                    label={option.label}
                    checked={currentCategories.includes(option.id)}
                    onChange={genreChange}
                    value={option.id}
                  />
                ))}
              </div>
            )}
            {/* Closing Genres */}
            {/* Closing Main */}
          </div>
        </div>
      </div>
      {/* Closing App */}
    </div>
  );
}
