import { WatchedMovies } from "./WatchedMovies";

export function WatchedList({ watched, onDeleteMovie }) {
  return (
    <>
      {watched.map((movie) => (
        <WatchedMovies movie={movie} onDeleteMovie={onDeleteMovie} />
      ))}
    </>
  );
}
