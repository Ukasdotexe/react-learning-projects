//
// import style

import { useCity } from "../../Contexts/CityProvider";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  const { deleteCity } = useCity();

  function handleClick(e) {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
