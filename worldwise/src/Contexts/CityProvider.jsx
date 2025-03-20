import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

const BASE_URL = "http://localhost:3001";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const fetchCities = async function () {
      try {
        console.log("Use Effect is Executed !");

        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCities(data);
        console.log(data);
        //
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
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
