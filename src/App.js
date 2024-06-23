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

  const [ratings, set_ratings] = useState([]);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const courses = [
    { id: 1, label: "Any rating" },
    { id: 2, label: "1 star" },
    { id: 3, label: "2 star" },
    { id: 4, label: "3 star" },
    { id: 5, label: "4 star" },
    { id: 6, label: "5 star" },
    { id: 7, label: "6 star" },
    { id: 8, label: "7 star" },
    { id: 9, label: "8 star" },
    { id: 10, label: "9 star" },
    { id: 11, label: "10 star" },
  ];
  const dropDownShow = () => {
    setRatingsOpen(!ratingsOpen);
  };
  const courseChange = (event) => {
    const courseId = parseInt(event.target.value);
    const choosen = event.target.checked;

    if (choosen) {
      set_ratings([...ratings, courseId]);
    } else {
      set_ratings(ratings.filter((id) => id !== courseId));
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
              {courses.map((option) => (
                <Form.Check
                  className="custom-checkbox"
                  key={option.id}
                  type="checkbox"
                  id={`option_${option.id}`}
                  label={option.label}
                  checked={ratings.includes(option.id)}
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
          } else if (movie.title.toLowerCase().includes(query.toLowerCase())) {
            return movie;
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
  );
}
