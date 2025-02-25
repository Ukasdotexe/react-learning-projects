import { useState } from "react";
function App() {
  return (
    <div className="app">
      <Header />
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

export default App;
// feat: add header section
// - Create a new component for the header  page
// - Add styling for the component and other future components
