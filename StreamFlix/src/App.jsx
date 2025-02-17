import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <MoviesList />
        <MovieOverView />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>🎬 StreamFlix</h1>
      <input placeholder="Search movies..." type="text" />
      <span>
        Found <strong>0</strong> results
      </span>
    </header>
  );
}

function MoviesList() {
  return (
    <ul className="movies-list">
      {tempMovieData.map((movie) => {
        return <MovieCard key={movie.imdbID} movie={movie} />;
      })}
      <span className="circle">-</span>
    </ul>
  );
}

function MovieOverView() {
  return (
    <div
      // style={{ display: "grid", gridTemplateRows: "auto 1fr" }}
      className="movie-overview"
    >
      <MovieDetails />
      <MovieReview />
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie">
      <img src={movie.Poster} />
      <div className="movie__info">
        <span className="movie__name">{movie.Title}</span>
        <span className="movie__year">📅 {movie.Year}</span>
      </div>
    </div>
  );
}

function MovieDetails() {
  const imageLink =
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg";

  return (
    <div className="movie-details">
      <img src={imageLink} />
      <div className="content">
        <h2 className="title">Inception</h2>
        <span className="release-data">16 Jul 2010 . 148 min</span>
        <span className="categorie">Action, Aventure, Sci-Fi</span>

        <div className="rating">
          <span>
            <i className={`fa fa-star star-icon }`}></i>
          </span>
          <span>8.8 IMDb rating</span>
        </div>
      </div>
      <span className="circle">-</span>
      <span className="back">&#8592;</span>
    </div>
  );
}

function MovieReview() {
  return (
    <div className="review">
      <Rating />
      <p className="story">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis
        aliquam itaque repellendus voluptas eligendi consequatur? Quam
        consectetur deserunt dolores repellendus magnam esse possimus minima,
        adipisci nobis enim error ab!
      </p>

      <p className="actors">
        Starring Leonardo DiCaprio,Joseph Gordon-Levitt,Elliot Page
      </p>
      <p className="directed-by">Directed by Christopher Nolan</p>
    </div>
  );
}

function Rating() {
  return (
    <div className="rating">
      <ul className="stars">
        {Array.from({ length: 10 }, (_, i) => i).map((el) => (
          <Star />
        ))}
      </ul>
      <span className="rate"> 10</span>
      <div className="btn-add-to-list">+ Add to list</div>
    </div>
  );
}

function Star() {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <i
        onMouseEnter={() => setHovered((is) => !is)}
        // onMouseLeave={() => setHovered(false)}
        className={`fa fa-star star-icon large-star ${
          !hovered ? "fa-star-o" : ""
        }`}
      ></i>
    </li>
  );
}

export default App;
