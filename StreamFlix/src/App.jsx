import { useState } from "react";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <MoviesList />
        <MovieOverView />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>🎬 StreamFlix</h1>
      <input placeholder="Search movies..." type="text" />
      <span>
        Found <strong>0</strong> results
      </span>
    </header>
  );
}

function MoviesList() {
  return <ul className="movies-list">Movies list</ul>;
}

function MovieOverView() {
  return <div className="movie-overview">Movie OverView</div>;
}

export default App;
