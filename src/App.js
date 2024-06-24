import "./styles.css";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function App() {
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
    { id: 1, label: "1 star" },
    { id: 2, label: "2 star" },
    { id: 3, label: "3 star" },
    { id: 4, label: "4 star" },
    { id: 5, label: "5 star" },
    { id: 6, label: "6 star" },
    { id: 7, label: "7 star" },
    { id: 8, label: "8 star" },
    { id: 9, label: "9 star" },
    { id: 10, label: "10 star" },
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
    setRatingsOpen(!ratingsOpen);
  };

  const dropDownShowGenre = () => {
    setCategoriesOpen(!categoriesOpen);
  };
  const ratingChange = (event) => {
    const ratingID = parseInt(event.target.value);
    const choosen = event.target.checked;

    setCurrentRatings(currentRatings.filter((id) => id != 0));

    if (choosen) {
      setCurrentRatings([...currentRatings, ratingID]);
    } else {
      setCurrentRatings(currentRatings.filter((id) => id !== ratingID));
    }
  };

  const genreChange = (event) => {
    const courseId = parseInt(event.target.value);
    const choosen = event.target.checked;

    if (choosen) {
      setCurrentCategories([...currentCategories, courseId]);
    } else {
      setCurrentCategories(currentCategories.filter((id) => id !== courseId));
    }
  };

  return (
    <div className="App">
      <div className="Everything">
        <input
          placeholder="Enter movie Title"
          onChange={(event) => setQuery(event.target.value)}
        />

        <div>
          <button type="button" id="multiSelectDropdown" onClick={dropDownShow}>
            Ratings
          </button>
          {ratingsOpen && (
            <div aria-labelledby="multiSelectDropdown">
              {ratings.map((option) => (
                <Form.Check
                  key={option.id}
                  type="checkbox"
                  id={`option_${option.id}`}
                  label={option.label}
                  checked={currentRatings.includes(option.id)}
                  onChange={ratingChange}
                  value={option.id}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            id="multiSelectDropdown"
            onClick={dropDownShowGenre}
          >
            Genres
          </button>
          {categoriesOpen && (
            <div aria-labelledby="multiSelectDropdown">
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
        </div>

        {movies
          .filter((movie) => {
            if (query === "") {
              return;
            } else if (
              (currentRatings.includes(Math.floor(movie.rating)) ||
                currentRatings.includes(0)) &&
              (currentCategories.includes(categoriesMap.get(movie.category)) ||
                currentCategories.includes(0))
            ) {
              if (movie.title.toLowerCase().includes(query.toLowerCase())) {
                return movie;
              }
            }
          })
          .map((movie) => (
            <div key={movie.title}>
              <p>
                {movie.title}, {movie.rating}, {movie.category}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
