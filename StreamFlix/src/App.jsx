//
//

import { func } from "prop-types";
import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { Loader } from "./components/Loader";
import { ErroMessage } from "./components/ErroMessage";
import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main.1";
import { Search } from "./components/Search";
import { NumResults } from "./components/NumResults";
import { Box } from "./components/Box";
import { MoviesList } from "./components/MoviesList";
import { MovieDetails } from "./components/MovieDetails";
import { MovieStatistics } from "./components/MovieStatistics";
import { WatchedList } from "./components/WatchedList";

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

export const KEY = "dde9de99";

function App() {
  const [watched, setWatched] = useLocalStorageState([], "watchedList");
  const [query, setQuery] = useState("");
  const [movies, error, isLoading] = useMovies(query);

  const [selectedId, setSelectedId] = useState();

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

export default App;
