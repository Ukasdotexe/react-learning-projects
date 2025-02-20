import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./styles/styles.css";

import App from "./App.jsx";
// import App from "./App copy";
// import StarRating from "./StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
