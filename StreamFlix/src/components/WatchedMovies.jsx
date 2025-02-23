export function WatchedMovies({ movie, onDeleteMovie }) {
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
