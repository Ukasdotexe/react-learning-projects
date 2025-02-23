export function MovieStatistics({ watched }) {
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
