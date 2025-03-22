//
//

import { createContext, useContext } from "react";
import { useFetch } from "../hooks/useFetch";

const CityContext = createContext();

function CityProvider({ children }) {
  const { data: cities, setData: setCities, loading } = useFetch("cities");

  async function addCity(city) {
    try {
      const res = await fetch("http://localhost:3001/cities", {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to add city: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      setCities((cities) => [...cities, data]);
      return data;
    } catch (error) {
      console.error("Error adding city:", error);
      alert("There was an issue adding the city. Please try again.");
    }
  }

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
