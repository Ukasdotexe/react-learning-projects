import { useEffect, useState } from "react";
import { useKey } from "../useKey";
import { Loader } from "./Loader";
import { ErroMessage } from "./ErroMessage";
import { KEY } from "../App";
import { Rating } from "./Rating";
import { MovieInfo } from "./MovieInfo";
import { MovieReview } from "./MovieReview";

export function MovieDetails({
  selectedId,
  onBack,
  onAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const userRating =
    isWatched && watched.find((w) => w.imdbID === selectedId).userRating;

  useKey("Escape", onBack);

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
