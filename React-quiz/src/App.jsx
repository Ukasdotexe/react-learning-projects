//
//

import { useEffect, useReducer, useState } from "react";
import quizData from "./questions.json";

const initialState = {
  isQuizStarted: false,
  currentQuestion: 0,
  currentPoints: 0,
  questions: quizData.questions,
  selectedOption: null,
  hasQuizFinish: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_QUIZ":
      return {
        ...state,
        isQuizStarted: true,
        currentQuestion: 0,
        currentPoints: 0,
      };

    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "UPDATE_POINTS":
      return { ...state, currentPoints: state.currentPoints + action.payload };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: null,
      };

    case "END_QUIZ":
      return { ...state, hasQuizFinish: true };
    case "RESET":
      return initialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isQuizStarted,
    currentQuestion,
    currentPoints,
    questions,
    selectedOption,
    hasQuizFinish,
  } = state;

  function handleTimeUp() {
    dispatch({ type: "END_QUIZ" });
  }

  useEffect(() => {
    currentQuestion === questions.length - 1 && dispatch({ type: "END_QUIZ" });
  }, [currentQuestion, questions]);

  return (
    <div className="app">
      <Header />

      <Main>
        {!isQuizStarted && (
          <StartQuiz questions={questions} dispatch={dispatch} />
        )}

        {isQuizStarted && (
          <>
            <QuizProgress
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              currentPoints={currentPoints}
              questions={questions}
            />

            {!hasQuizFinish && (
              <>
                <QuizQuestions
                  questions={questions}
                  currentQuestion={currentQuestion}
                  dispatch={dispatch}
                  selectedOption={selectedOption}
                />
                <Timer onTimeUp={handleTimeUp} />
              </>
            )}
          </>
        )}

        {hasQuizFinish && (
          <button className="btn" onClick={() => dispatch({ type: "RESET" })}>
            Play Again
          </button>
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

function StartQuiz({ questions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button onClick={() => dispatch({ type: "START_QUIZ" })} className="btn">
        Let's Start
      </button>
    </div>
  );
}

function QuizProgress({
  currentQuestion,
  totalQuestions,
  currentPoints,
  questions,
}) {
  const questionNumber = currentQuestion + 1;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <div className="progress">
      <progress value={currentPoints} max="280"></progress>
      <span>
        Question {questionNumber}/{totalQuestions}
      </span>
      <span>
        {currentPoints}/ {totalPoints} points
      </span>
    </div>
  );
}

function QuizQuestions({
  questions,
  currentQuestion,
  selectedOption,
  dispatch,
}) {
  const question = questions[currentQuestion];

  function handle(i) {
    dispatch({ type: "SELECT_OPTION", payload: i });
    if (i === question.correctOption) {
      dispatch({
        type: "UPDATE_POINTS",
        payload: question.points,
      });
    }
  }

  return (
    <>
      <h4>{question.question}</h4>

      <ul className="options">
        {question.options.map((option, i) => (
          <QuizOption
            key={i + 1}
            option={option}
            index={i}
            selectedOption={selectedOption}
            correctOption={question.correctOption}
            handle={handle}
          />
        ))}
      </ul>

      {selectedOption != null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "NEXT_QUESTION" })}
        >
          Next
        </button>
      )}
    </>
  );
}

function QuizOption({ option, index, selectedOption, correctOption, handle }) {
  return (
    <li>
      <button
        className={`btn btn-option ${
          selectedOption !== null &&
          (index === correctOption ? "correct" : "wrong")
        } ${selectedOption === index ? "answer" : ""}`}
        disabled={selectedOption !== null}
        onClick={() => handle(index)}
      >
        {option}
      </button>
    </li>
  );
}

function Timer({ onTimeUp }) {
  const [timeleft, setTimeLeft] = useState(500);

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
