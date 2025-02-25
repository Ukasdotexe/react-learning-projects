import { useState } from "react";
function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <StartQuiz />
        <QuizProgress />
        <QuizOptions />
        <Timer />
      </Main>
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

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function StartQuiz() {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>X questions to test your React mastery</h3>
      <button className="btn">Let's Start</button>
    </div>
  );
}

function QuizProgress() {
  return (
    <div className="progress">
      <progress value="0" max="280"></progress>
      <span>Question 5/12</span>
      <span>0/ 280 points</span>
    </div>
  );
}

function QuizOptions() {
  return (
    <>
      <h4>What is the most popular Javascript FrameWork ? </h4>
      <ul className="options">
        <li>
          <button className="btn btn-option">Angular</button>
        </li>
        <li>
          <button className="btn btn-option">React</button>
        </li>
        <li>
          <button className="btn btn-option">Vue</button>
        </li>
        <li>
          <button className="btn btn-option">Angular</button>
        </li>
      </ul>
    </>
  );
}

function Timer() {
  return (
    <div style={{ textAlign: "left" }}>
      <button className="btn ">07:50</button>
    </div>
  );
}

export default App;
