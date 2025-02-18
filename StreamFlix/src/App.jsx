import { useState } from "react";

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
  {
    imdbID: "tt0848228",
    Title: "The Avengers",
    Year: "2012",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTk1MjgyOTkzNF5BMl5BanBnXkFtZTcwMjgzMDgwOA@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1825683",
    Title: "The Dark Knight Rises",
    Year: "2012",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTYzODI5NTg3Ml5BMl5BanBnXkFtZTcwNjgwNTc2OA@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0109830",
    Title: "Forrest Gump",
    Year: "1994",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BODU5ZTRjY2QtNzA3Ni00Yjk0LTg1MGItYmFkZTQwZGM0OWFlXkEyXkFqcGdeQXVyMTYwNjQ1NjM@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0816692",
    Title: "Interstellar",
    Year: "2014",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTYxNjk3NzgzM15BMl5BanBnXkFtZTgwNTI1ODcyMjE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0783233",
    Title: "The Hunger Games",
    Year: "2012",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTY2MTg0MTgyNV5BMl5BanBnXkFtZTcwMzEwODQ3OA@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0082971",
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Year: "1980",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjA4MTE5NjA3OF5BMl5BanBnXkFtZTcwNzA5MDM5OQ@@._V1_SX300.jpg",
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

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <MoviesList />
        <MovieOverView />
      </div>
    </>
  );
}

function NavBar() {
  return (
    <nav className="header">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎬</span>
      <h1> StreamFlix</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

function MoviesList() {
  return (
    <ul className="movies-list">
      {tempMovieData.map((movie) => {
        return <MovieCard key={movie.imdbID} movie={movie} />;
      })}
      <span className="circle">-</span>
    </ul>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie">
      <img src={movie.Poster} />
      <div className="movie__info">
        <span className="movie__name">{movie.Title}</span>
        <span className="movie__year">📅 {movie.Year}</span>
      </div>
    </div>
  );
}

function MovieOverView() {
  return (
    <div className="movie-overview">
      <MovieStatistics />
      <WatchedMovie />
      {/* <MovieDetails /> */}
      {/* <MovieReview /> */}
    </div>
  );
}

function MovieDetails() {
  const imageLink =
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg";

  return (
    <div className="movie-details">
      <img src={imageLink} />
      <div className="content">
        <h2 className="title">Inception</h2>
        <span className="release-data">16 Jul 2010 . 148 min</span>
        <span className="categorie">Action, Aventure, Sci-Fi</span>

        <div className="rating">
          <span>
            <i className={`fa fa-star star-icon }`}></i>
          </span>
          <span>8.8 IMDb rating</span>
        </div>
      </div>
      <span className="circle">-</span>
      <span className="back">&#8592;</span>
    </div>
  );
}

function MovieReview() {
  return (
    <div className="review">
      <Rating />
      <MovieInfo />
    </div>
  );
}

function MovieInfo() {
  return (
    <>
      <p className="story">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis
        aliquam itaque repellendus voluptas eligendi consequatur? Quam
        consectetur deserunt dolores repellendus magnam esse possimus minima,
        adipisci nobis enim error ab!
      </p>

      <p className="actors">
        Starring Leonardo DiCaprio,Joseph Gordon-Levitt,Elliot Page
      </p>
      <p className="directed-by">Directed by Christopher Nolan</p>
    </>
  );
}

function Rating() {
  return (
    <div className="rating">
      <ul className="stars">
        {Array.from({ length: 10 }, (_, i) => i).map((el) => (
          <Star />
        ))}
      </ul>
      <span className="rate"> 10</span>
      <div className="btn-add-to-list">+ Add to list</div>
    </div>
  );
}

function Star() {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <i
        onMouseEnter={() => setHovered((is) => !is)}
        // onMouseLeave={() => setHovered(false)}
        className={`fa fa-star star-icon large-star ${
          !hovered ? "fa-star-o" : ""
        }`}
      ></i>
    </li>
  );
}

function MovieStatistics() {
  return (
    <div className="movie-statistics">
      <h2 className="movie-statistics__title">MOVIES YOU WATCHED</h2>
      <ul className="movie-statistics__list">
        <li className="movie-statistics__item">🎅🏻 2 movies</li>
        <li className="movie-statistics__item">🌟 8.65</li>
        <li className="movie-statistics__item">⭐ 9.5</li>
        <li className="movie-statistics__item">⏳ 142 min</li>
      </ul>
    </div>
  );
}

function WatchedMovie() {
  return (
    <div className="watched-movie">
      <img
        className="watched-movie-img"
        src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
        alt="movie"
      />
      <div>
        <h2 className="watched-movie-title">Inception </h2>
        <ul className="watched-movie-stats">
          <li>🌟 8.65</li>
          <li>⭐ 9.5</li>
          <li>⏳ 142 min</li>
        </ul>
      </div>
      <span className="delete-icon">❌</span>
    </div>
  );
}

export default App;
