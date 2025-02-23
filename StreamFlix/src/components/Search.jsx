import { useRef } from "react";
import { useKey } from "../useKey";

export function Search({ query, onSetQuery, onBack }) {
  const inputEl = useRef(null);

  useKey("Enter", () => {
    onSetQuery("");
    inputEl.current.value = "";
    inputEl.current.focus();
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(event) => {
        onBack();
        if (query === event.target.value) return;

        onSetQuery(event.target.value);
      }}
    />
  );
}
