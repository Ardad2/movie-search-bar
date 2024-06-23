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
      catgory: "Action",
    },
    {
      title: "Maps to the Stars",
      rating: 7.5,
      catgory: "Drama",
    },
  ]);

  const [currentRatings, setCurrentRatings] = useState([]);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const ratings = [
    { id: 1, label: "Any rating", stars: -1 },
    { id: 2, label: "1 star", stars: 1 },
    { id: 3, label: "2 star", stars: 2 },
    { id: 4, label: "3 star", stars: 3 },
    { id: 5, label: "4 star", stars: 4 },
    { id: 6, label: "5 star", stars: 5 },
    { id: 7, label: "6 star", stars: 6 },
    { id: 8, label: "7 star", stars: 7 },
    { id: 9, label: "8 star", stars: 8 },
    { id: 10, label: "9 star", stars: 9 },
    { id: 11, label: "10 star", stars: 10 },
  ];
  const dropDownShow = () => {
    setRatingsOpen(!ratingsOpen);
  };
  const courseChange = (event) => {
    const courseId = parseInt(event.target.value);
    const choosen = event.target.checked;

    if (choosen) {
      setCurrentRatings([...currentRatings, courseId]);
    } else {
      setCurrentRatings(currentRatings.filter((id) => id !== courseId));
    }
  };

  return (
    <div className="App">
      <div className="filters">
        <input
          placeholder="Enter movie Title"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="custom-dropdown">
          <button
            className="custom-dropdown-toggle green-button"
            type="button"
            id="multiSelectDropdown"
            onClick={dropDownShow}
          >
            Ratings
          </button>
          {ratingsOpen && (
            <div
              className={`custom-dropdown-menu  
                                    ${ratingsOpen ? "show" : ""}`}
              aria-labelledby="multiSelectDropdown"
            >
              {ratings.map((option) => (
                <Form.Check
                  className="custom-checkbox"
                  key={option.id}
                  type="checkbox"
                  id={`option_${option.id}`}
                  label={option.label}
                  checked={currentRatings.includes(option.id)}
                  onChange={courseChange}
                  value={option.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {movies
        .filter((movie) => {
          if (query === "") {
            return;
          } else if (currentRatings.includes(Math.floor(movie.rating))) {
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
      <div>
        <p>Filtering for the ratings are: </p>
        <ul>
          {currentRatings.map((rating) => (
            <li>{rating}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
