//
//

import { func } from "prop-types";
import { useEffect, useState } from "react";

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

function Loader({ children }) {
  return <p className="loader">{children}</p>;
}

function ErroMessage({ children }) {
  return (
    <p className="error">
      <span>🥺</span> {children}
    </p>
  );
}

const KEY = "dde9de99";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.length <= 3) {
      setMovies([]);
      // setError("");
      return;
    }

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies!");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("No movies found!");
        }

        setMovies(data.Search);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  function handleSetQuery(value) {
    setQuery(value);
  }

  return (
    <div className="container">
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={handleSetQuery} />
        <NumResults length={movies.length} />
      </NavBar>

      <Main>
        <Box className="movies-list">
          {isLoading && <Loader>Loading...</Loader>}
          {!error && !isLoading && <MoviesList movies={movies} />}
          {error && <ErroMessage>{error}</ErroMessage>}
        </Box>
        <Box className="movie-overview">
          <MovieDetails />
          <MovieReview>
            <Rating />
            <MovieInfo />
          </MovieReview>
          {/* <MovieReview /> */}
          {/* <MovieStatistics watched={watched} />
          <WatchedMovie movie={watched[0]} /> */}
        </Box>
      </Main>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className="nav">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎬</span>
      <h1> StreamFlix</h1>
    </div>
  );
}

function Search({ query, onSetQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(event) => {
        if (query === event.target.value) return;

        onSetQuery(event.target.value);
      }}
      // onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

function NumResults({ length }) {
  return (
    <p className="num-results">
      Found <strong>{length}</strong> results
    </p>
  );
}

function Box({ className, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={className}>
      <span onClick={() => setIsOpen((open) => !open)} className="circle">
        {isOpen ? "-" : "+"}
      </span>

      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function MovieCard({ movie }) {
  return (
    <li className="movie">
      <img src={movie.Poster} />
      <div className="movie__info">
        <span className="movie__name">{movie.Title}</span>
        <span className="movie__year">📅 {movie.Year}</span>
      </div>
    </li>
  );
}

function MovieDetails({ movie }) {
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
      <span className="back">&#8592;</span>
    </div>
  );
}

function MovieReview({ children }) {
  return <div className="review">{children}</div>;
}

function MovieInfo() {
  return (
    <>
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
    </>
  );
}

function Rating() {
  const [selectedStars, setSelectedStars] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  function handleSelectedStars(num) {
    setIsClicked(false);
    setSelectedStars(num);
  }

  function handleStarClick() {
    setIsClicked(true);
  }

  return (
    <div className="rating">
      <ul
        className="stars"
        onMouseLeave={() => !isClicked && setSelectedStars(0)}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            key={i + 1}
            id={i + 1}
            selectedStars={selectedStars}
            onHover={handleSelectedStars}
            onClick={handleStarClick}
          />
        ))}
      </ul>

      <span className="rate"> {selectedStars}</span>
      {isClicked && <div className="btn-add-to-list">+ Add to list</div>}
    </div>
  );
}

function Star({ id, selectedStars, onHover, onClick }) {
  const isSelected = id <= selectedStars;

  return (
    <li onMouseEnter={() => onMouseHover(id)} onClick={onClick}>
      <i
        className={`fa fa-star star-icon large-star ${
          !isSelected ? "fa-star-o" : ""
        }`}
      ></i>
    </li>
  );
}

function MovieStatistics({ watched }) {
  function average(arr) {
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  }

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="movie-statistics">
      <h2 className="movie-statistics__title">MOVIES YOU WATCHED</h2>
      <ul className="movie-statistics__list">
        <li className="movie-statistics__item">🎅🏻 {watched.length} movies</li>
        <li className="movie-statistics__item">🌟 {avgImdbRating}</li>
        <li className="movie-statistics__item">⭐ {avgUserRating}</li>
        <li className="movie-statistics__item">⏳ {avgRuntime} min</li>
      </ul>
    </div>
  );
}

function WatchedMovie({ movie }) {
  const { Title, runtime, imdbRating, userRating, Poster } = movie;

  return (
    <div className="watched-movie">
      <img
        className="watched-movie-img"
        src={Poster}
        // src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
        alt={`${Title} Poster`}
      />
      <div>
        <h2 className="watched-movie-title">{Title}</h2>
        <ul className="watched-movie-stats">
          <li>🌟 {imdbRating}</li>
          <li>⭐ {userRating}</li>
          <li>⏳ {runtime} min</li>
        </ul>
      </div>
      <span className="delete-icon">❌</span>
    </div>
  );
}

export default App;
