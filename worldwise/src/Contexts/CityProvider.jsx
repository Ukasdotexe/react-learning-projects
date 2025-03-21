//
//

import { createContext, useContext } from "react";
import { useFetch } from "../hooks/useFetch";

const CityContext = createContext();

function CityProvider({ children }) {
  const { data: cities, setData: setCities, loading } = useFetch("cities");

  function addCity(city) {
    setCities([...cities, city]);
  }
  console.log(cities);
  return (
    <CityContext.Provider value={{ cities, loading, addCity }}>
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
