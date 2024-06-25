import "./styles.css";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function App() {
  //Function which represents a given rating in terms of stars.
  const starGenerate = (rating) => {
    const totalStars = 10;
    const activeStars = rating;

    return (
      <div>
        {[...new Array(totalStars)].map((arr, index) => {
          return index < activeStars && activeStars - index <= 0.75 ? (
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

  //State to store the current searched query.
  const [query, setQuery] = useState("");

  //The state with the data related to the movies.

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

  //State that stores the currently selected ratings (in terms of stars) for filtering. "0" represents "Any rating" which is the default value.

  const [currentRatings, setCurrentRatings] = useState([0]);

  //This state is used to toggle open and close the dropdown for the rating filters.

  const [ratingsOpen, setRatingsOpen] = useState(false);

  /*These are the different types of ratings that the user can filter with. "0" represents any rating,
   and all other are the number of stars.*/

  const ratings = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  //State that stores the currently selected categories for filtering. "0" represents "Any category" which is the default value.

  const [currentCategories, setCurrentCategories] = useState([0]);

  //This state is used to toggle open and close the dropdown for the categories filters.

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  /*These are the different types of categories that the user can filter with. "0" represents any rating,
   and all other are the number of stars.*/

  const categories = [
    { id: 0, label: "Any genre" },
    { id: 1, label: "Action" },
    { id: 2, label: "Comedy" },
    { id: 3, label: "Drama" },
    { id: 4, label: "Thriller" },
  ];

  /*This is a categories map, which gives the ID for a given category. 
  This is useful since the state which stores the filter options for categories stores IDs rather than strings.
  */

  const categoriesMap = new Map();

  categoriesMap.set("Any genre", 0);
  categoriesMap.set("Action", 1);
  categoriesMap.set("Comedy", 2);
  categoriesMap.set("Drama", 3);
  categoriesMap.set("Thriller", 4);

  /*This function is used to toggle the drop down menue for the filters for Ratings and Categories.
  It also closes the other type of drop-down if it is already open.
  */

  const dropDownShow = (type) => () => {
    /*If the dropdown is for the Ratings, close the dropdown for Categories if it is open. 
    Otherwise vice versa.*/

    if (type == "ratings") {
      setCategoriesOpen(false);
      setRatingsOpen(!ratingsOpen);
    } else {
      setRatingsOpen(false);
      setCategoriesOpen(!categoriesOpen);
    }
  };

  //Change the ratings that are picked as filter.

  const ratingChange = (event) => {
    const ratingID = parseInt(event.target.value);
    const isChosen = event.target.checked;

    //This is in the case where the current rating is being chosen after being unchecked.

    if (isChosen) {
      //If the ratingID is "0", it represents "Any rating".
      if (ratingID == 0) {
        //If the rating chosen is "Any rating", then all other rating filters apart from 0 can be removed.

        setCurrentRatings([...currentRatings.filter((id) => id == -1), 0]);
      } else {
        //If it is any other rating, add it to the current list of rating filters.

        setCurrentRatings([
          ...currentRatings.filter((id) => id !== 0),
          ratingID,
        ]);
      }
    } else {
      //If a rating is being de-selected, remove it from the filter list.

      setCurrentRatings(currentRatings.filter((id) => id !== ratingID));
    }
  };

  //Change the genre that are picked as filter.

  const genreChange = (event) => {
    const genreID = parseInt(event.target.value);
    const isChosen = event.target.checked;

    //This is in the case where the current genre is being chosen after being unchecked.

    if (isChosen) {
      //If the genreID is "0", it represents "Any genre".
      if (genreID == 0) {
        setCurrentCategories([
          ...currentCategories.filter((id) => id == -1),
          0,
        ]);
      } else {
        //If it is any other genre, add it to the current list of genre filters.

        setCurrentCategories([
          ...currentCategories.filter((id) => id !== 0),
          genreID,
        ]);
      }
    } else {
      //If a genre is being de-selected, remove it from the filter list.

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
              onClick={dropDownShow("ratings")}
            >
              Ratings
            </button>
            <div>
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
              onClick={dropDownShow("categories")}
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
