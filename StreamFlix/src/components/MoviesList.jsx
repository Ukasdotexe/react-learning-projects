import { MovieCard } from "./MovieCard";

export function MoviesList({ movies, onSelectMovie }) {
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
