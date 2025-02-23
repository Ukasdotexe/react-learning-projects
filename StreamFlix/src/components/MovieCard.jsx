export function MovieCard({ movie, onSelectMovie }) {
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
