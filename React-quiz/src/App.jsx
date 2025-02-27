import { useEffect, useState } from "react";
import quizData from "./questions.json";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [questions, setQuestions] = useState(() => {
    const { questions: data } = quizData;
    return data;
  });

  function handleTimeUp() {
    setTimeIsUp(true);
  }

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
            <QuizProgress
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              currentPoints={currentPoints}
            />
            {currentQuestion !== questions.length - 1 && !timeIsUp && (
              <>
                <QuizQuestions
                  questions={questions}
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                  setCurrentPoints={setCurrentPoints}
                />
                <Timer onTimeUp={handleTimeUp} />
              </>
            )}
          </>
        )}

        {currentQuestion === questions.length - 1 ||
          (timeIsUp && (
            <button
              className="btn"
              onClick={() => {
                setIsQuizStarted(false);
                setCurrentQuestion(0);
                setCurrentPoints(0);
                setTimeIsUp(false);
              }}
            >
              Play Again
            </button>
          ))}
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

function QuizProgress({ currentQuestion, totalQuestions, currentPoints }) {
  const questionNumber = currentQuestion + 1;

  return (
    <div className="progress">
      <progress value={currentPoints} max="280"></progress>
      <span>
        Question {questionNumber}/{totalQuestions}
      </span>
      <span>{currentPoints}/ 280 points</span>
    </div>
  );
}

function QuizQuestions({
  questions,
  currentQuestion,
  setCurrentQuestion,
  setCurrentPoints,
}) {
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
                selectedOption !== null &&
                (i === question.correctOption ? "correct" : "wrong")
              } ${selectedOption === i ? "answer" : ""}`}
              disabled={selectedOption !== null}
              onClick={() => {
                setSelectedOption(i);
                if (i === question.correctOption) {
                  setCurrentPoints(
                    (prevPoints) => prevPoints + question.points
                  );
                }
              }}
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

function Timer({ onTimeUp }) {
  const [timeleft, setTimeLeft] = useState(10);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  useEffect(
    function () {
      if (timeleft <= 0) {
        onTimeUp();
        return;
      }

      const timer = setInterval(() => {
        setTimeLeft((prev) => --prev);
      }, 1000);

      return () => clearInterval(timer);
    },
    [timeleft]
  );
  return <button className="btn">{formatTime(timeleft)}</button>;
}

export default App;
