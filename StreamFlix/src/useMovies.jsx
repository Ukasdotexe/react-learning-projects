//
//

import { useState, useEffect } from "react";

const KEY = "dde9de99";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return [movies, error, isLoading];
}
