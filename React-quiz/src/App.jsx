import { useState } from "react";
import quizData from "./questions.json";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [questions, setQuestions] = useState(() => {
    const { questions: data } = quizData;
    return data;
  });

  return (
    <div className="app">
      <Header />

      <Main>
        {!isQuizStarted && (
          <StartQuiz
            questions={questions}
            setIsQuizStarted={setIsQuizStarted}
          />
        )}

        {isQuizStarted && (
          <>
            <QuizProgress />
            <QuizQuestions questions={questions} />
            <Timer />
          </>
        )}
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

function StartQuiz({ questions, setIsQuizStarted }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button onClick={() => setIsQuizStarted((is) => !is)} className="btn">
        Let's Start
      </button>
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

function QuizQuestions({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const question = questions[currentQuestion];

  return (
    <>
      <h4>{question.question}</h4>
      <ul className="options">
        {question.options.map((option, i) => (
          <li key={i + 1}>
            <button
              className={`btn btn-option ${
                selectedOption !== null && // Check if an option has been selected
                (i === question.correctOption ? "correct" : "wrong")
              } ${selectedOption === i ? "answer" : ""}`}
              onClick={() => setSelectedOption(i)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {selectedOption != null && (
        <button
          className="btn btn-ui"
          onClick={() => {
            setCurrentQuestion((cur) => ++cur);
            setSelectedOption(null);
          }}
        >
          Next
        </button>
      )}
    </>
  );
}

function Timer() {
  return <button className="btn">07:50</button>;
}

export default App;
