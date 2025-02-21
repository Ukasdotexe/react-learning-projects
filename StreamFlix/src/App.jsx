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
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {}, [selectedId]);

  function handleSelectedMovie(movieId) {
    setSelectedId((previousId) => (previousId === movieId ? null : movieId));
  }

  function handleAddWatched(movie) {
    //Kodomo no koro sensô ga atta

    setWatched((prevWatched) => {
      if (prevWatched.some((m) => m.imdbID === movie.imdbID)) {
        return prevWatched;
      }
      return [...prevWatched, movie];
    });

    setSelectedId(null);
  }

  function handleDeleteMovie(imdbID) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirmDelete) {
      setWatched((prevWatched) =>
        prevWatched.filter((movie) => movie.imdbID !== imdbID)
      );
    }
  }

  useEffect(() => {
    if (query.length <= 3) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch movies!");

        const data = await res.json();
        if (data.Response === "False") throw new Error("No movies found!");

        setMovies(data.Search);
      } catch (error) {
        error.name !== "AbortError" && setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  function handleSetQuery(value) {
    setQuery(value);
  }

  return (
    <div className="container">
      <NavBar>
        <Logo />
        <Search
          query={query}
          onSetQuery={handleSetQuery}
          onBack={() => setSelectedId(null)}
        />
        <NumResults length={movies.length} />
      </NavBar>

      <Main>
        <Box className="movies-list">
          {isLoading && <Loader>Loading...</Loader>}
          {!error && !isLoading && (
            <MoviesList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErroMessage>{error}</ErroMessage>}
        </Box>

        <Box className="movie-overview">
          {/* {isLoading && <Loader>Loading...</Loader>} */}
          {selectedId && (
            <>
              <MovieDetails
                selectedId={selectedId}
                onBack={() => setSelectedId(null)}
                onAddWatchedMovie={handleAddWatched}
                watched={watched}
              />
            </>
          )}

          {watched && !selectedId && (
            <>
              <MovieStatistics watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
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

function Search({ query, onSetQuery, onBack }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(event) => {
        onBack();
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

function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

function MovieCard({ movie, onSelectMovie }) {
  return (
    <li className="movie" onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} />
      <div className="movie__info">
        <span className="movie__name">{movie.Title}</span>
        <span className="movie__year">📅 {movie.Year}</span>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onBack, onAddWatchedMovie, watched }) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const userRating =
    isWatched && watched.find((w) => w.imdbID === selectedId).userRating;

  useEffect(() => {
    const handler = (e) => e.code === "Escape" && onBack();

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [onBack]);

  useEffect(() => {
    async function getMovieDetailsById(id) {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${KEY}`
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const movieDetails = await res.json();

        if (movieDetails.Response === "False")
          throw new Error(movieDetails.Error);

        setMovie(movieDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) {
      getMovieDetailsById(selectedId);
    }
  }, [selectedId]); // Runs when `selectedId` changes

  useEffect(() => {
    document.title = movie.Title;

    return () => (document.title = "Stream Flix");
  }, [movie]);

  function handlerUserRating(numStars) {
    function handleNA(value, fallbackValue = 0) {
      return value === "N/A" ? fallbackValue : value;
    }

    const watchedMovie = {
      title: movie.Title,
      imdbRating: handleNA(movie.imdbRating, 0),
      runtime: handleNA(movie.Runtime.replace(/\D/g, ""), 0),
      imdbID: movie.imdbID,
      userRating: numStars || 1,
      Poster: movie.Poster,
    };

    onAddWatchedMovie(watchedMovie);
  }
  if (isLoading) {
    return (
      <div className="movie-details">
        <Loader>Loading Moving Info...</Loader>
      </div>
    );
  }
  if (error) {
    return (
      <div className="movie-details">
        <ErroMessage>{error}</ErroMessage>;
      </div>
    );
  }

  return (
    <>
      <div className="movie-details">
        <img src={movie.Poster} alt={movie.Title} />
        <div className="content">
          <h2 className="title">{movie.Title}</h2>
          <span className="release-data">
            {movie.Released} • {movie.Runtime}
          </span>
          <span className="categorie">{movie.Genre}</span>

          <div className="rating">
            <span>
              <i className="fa fa-star star-icon"></i>
            </span>
            <span>{movie.imdbRating} IMDb rating</span>
          </div>
        </div>
        <span className="back" onClick={onBack}>
          &#8592;
        </span>
      </div>
      <MovieReview>
        <Rating
          onRate={handlerUserRating}
          isWatched={isWatched}
          userRating={userRating}
        />
        <MovieInfo movie={movie} />
      </MovieReview>
    </>
  );
}

function MovieReview({ children }) {
  return <div className="review">{children}</div>;
}

function MovieInfo({ movie }) {
  return (
    <>
      <p className="story">{movie.Plot}</p>

      <p className="actors">Starring {movie.Actors}</p>

      <p className="directed-by">Directed by {movie.Director}</p>
    </>
  );
}

function Rating({ onRate, isWatched, userRating }) {
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
      {isWatched ? (
        <p
          className="rate"
          style={{ gridColumn: "span 2", textAlign: "center" }}
        >
          You rated this movie {userRating} ⭐
        </p>
      ) : (
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
      )}

      {!isWatched && <span className="rate"> {selectedStars}</span>}

      {isClicked && (
        <div className="btn-add-to-list" onClick={() => onRate(selectedStars)}>
          + Add to list
        </div>
      )}
    </div>
  );
}

function Star({ id, selectedStars, onHover, onClick }) {
  const isSelected = id <= selectedStars;

  return (
    <li onMouseEnter={() => onHover(id)} onClick={onClick}>
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
    return arr
      .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
      .toFixed(2);
  }

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => parseInt(movie.runtime, 10))
  );

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

function WatchedList({ watched, onDeleteMovie }) {
  return (
    <>
      {watched.map((movie) => (
        <WatchedMovies movie={movie} onDeleteMovie={onDeleteMovie} />
      ))}
    </>
  );
}

function WatchedMovies({ movie, onDeleteMovie }) {
  const { imdbID, title, runtime, imdbRating, userRating, Poster } = movie;

  return (
    <div className="watched-movie">
      <img className="watched-movie-img" src={Poster} alt={`${title} Poster`} />
      <div>
        <h2 className="watched-movie-title">{title}</h2>
        <ul className="watched-movie-stats">
          <li>🌟 {imdbRating}</li>
          <li>⭐ {userRating}</li>
          <li>⏳ {runtime} min </li>
        </ul>
      </div>
      <span className="delete-icon" onClick={() => onDeleteMovie(imdbID)}>
        ❌
      </span>
    </div>
  );
}

export default App;
