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
    <header style={{ gridColumn: 2 }}>
      <span>🍿 StreamFlix</span>
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
