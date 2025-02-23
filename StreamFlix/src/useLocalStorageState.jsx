//

import { useState, useEffect } from "react";

export function useLocalStorageState(initialState = [], key) {
  const [value, setValue] = useState(() => {
    const storedWatchedList = localStorage.getItem(key);

    return storedWatchedList ? JSON.parse(storedWatchedList) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
