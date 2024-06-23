import "./styles.css";
import React, { useState } from "react";

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
      catgory: "Comedy",
    },
    {
      title: "The Lazarus Effect",
      rating: 6.4,
      catgory: "Thriller",
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

  return (
    <div className="App">
      <input
        placeholder="Enter movie Title"
        onChange={(event) => setQuery(event.target.value)}
      />

      <div>{query}</div>
    </div>
  );
}
