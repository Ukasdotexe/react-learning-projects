//
//

import { createContext, useContext } from "react";
import useFetch from "../Custom Hooks/useFetch";

const CityContext = createContext();

function CityProvider({ children }) {
  const { data: cities, loading } = useFetch("cities");

  return (
    <CityContext.Provider value={{ cities, loading }}>
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);

  if (!context)
    throw new Error("the consumer component is outside of the city provider");

  return context;
}

export { CityProvider, useCity };
