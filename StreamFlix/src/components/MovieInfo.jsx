export function MovieInfo({ movie }) {
  return (
    <>
      <p className="story">{movie.Plot}</p>

      <p className="actors">Starring {movie.Actors}</p>

      <p className="directed-by">Directed by {movie.Director}</p>
    </>
  );
}
