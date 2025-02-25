import { useState } from "react";
function App() {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <header className="app-header">
      <img src="./public/react.svg" alt="react logo" />
      <h1>THE REACT QUIZ</h1>
    </header>
  );
}

function Main() {
  return (
    <main className="main">
      <div className="start">
        <h2>Welcome to The React Quiz</h2>
        <h3>X questions to test your React mastery</h3>
        <button className="btn">Let's Start</button>
      </div>
      <div className="progress">
        <progress value="0" max="280"></progress>
        <span>Question 5/12</span>
        <span>0/ 280 points</span>
      </div>
      <div className="options">
        <button className="btn btn-option">Angular</button>
        <button className="btn btn-option">React</button>
        <button className="btn btn-option">Vue</button>
        <button className="btn btn-option">Angular</button>
      </div>
      <div style={{ textAlign: "left" }}>
        <button className="btn ">07:50</button>
      </div>
    </main>
  );
}
export default App;
