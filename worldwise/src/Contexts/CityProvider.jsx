//
//

import { createContext, useContext, useEffect, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";

const CityContext = createContext();

const initialState = {
  cities: [],
  loading: true,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return { ...state, cities: action.payload, loading: false };

    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
      };

    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        loading: false,
      };

    case "rejected": {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
}

function CityProvider({ children }) {
  const { data: cities } = useFetch("cities");

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (cities) dispatch({ type: "cities/loaded", payload: cities });
  }, [cities]);

  async function addCity(city) {
    dispatch({ type: "loading" });

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

      dispatch({ type: "cities/created", payload: data });

      return data;
    } catch (error) {
      dispatch({ type: "rejected", payload: `Error adding city: ${error}` });

      alert("There was an issue adding the city. Please try again.");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:3001/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to add city: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      dispatch({ type: "cities/deleted", payload: id });

      return data;
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `Error deleting city: ${error.message}`,
      });

      alert(error.message);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities: state.cities,
        loading: state.loading,
        addCity,
        deleteCity,
      }}
    >
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
