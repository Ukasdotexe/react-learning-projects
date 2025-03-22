// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../Button/BackButton";
import { useCity } from "../../Contexts/CityProvider";
import useUrlPosition from "../../hooks/useUrlPosition";
import Spinner from "../spinner/Spinner";
import DatePicker from "react-datepicker";
import Message from "../Message/Message.jsx";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  countryFlag: "",
  isLoading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_City": {
      const { city, locality, countryName, countryCode, date, notes } =
        action.payload;
      return {
        ...state,
        cityName: city || locality || state.cityName,
        country: countryName || state.country,
        countryFlag: countryCode
          ? convertToEmoji(countryCode)
          : state.countryFlag,
        date: date || state.date,
        notes: notes || state.notes,
      };
    }
    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  const [{ cityName, country, date, notes, countryFlag, isLoading }, dispatch] =
    useReducer(reducer, initialState);

  const { mapLat, mapLng } = useUrlPosition();
  const { addCity } = useCity();

  useEffect(
    function () {
      const fetchData = async () => {
        try {
          if (!mapLat && !mapLng) return;

          dispatch({ type: "SET_ISLOADING", payload: true });

          const response = await fetch(
            `${BASE_URL}?latitude=${parseFloat(mapLat)}&longitude=${parseFloat(
              mapLng
            )}&timestamp=${Date.now()}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();

          dispatch({ type: "SET_City", payload: result });
        } catch (err) {
          console.log(err.message);
        } finally {
          dispatch({ type: "SET_ISLOADING", payload: false });
        }
      };

      fetchData();
    },
    [mapLat, mapLng]
  );

  async function handleAddCity(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const cityData = {
      cityName,
      country,
      emoji: countryFlag,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };

    await addCity(cityData);

    navigate("/app");
  }

  if (isLoading) return <Spinner />;

  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere in the map " />;

  return (
    <form className={styles.form} onSubmit={handleAddCity}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({
              type: "SET_City",
              payload: { cityName: e.target.value },
            })
          }
          value={cityName}
        />
        <span className={styles.flag}>{countryFlag}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => dispatch({ type: "SET_City", payload: { date } })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({
              type: "SET_City",
              payload: { notes: e.target.value },
            })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
