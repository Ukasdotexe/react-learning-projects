import styles from "./City.module.css";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useCity } from "../../Contexts/CityProvider";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { cities } = useCity();
  const { cityId } = useParams();

  if (!cityId) return <h1>City NOT FOUND !</h1>;

  const currentCity = cities.find((city) => Number(city.id) === Number(cityId));

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <Link to="/app/cities">Back</Link>

      {/* <ButtonBack /> */}

      {/* <div><ButtonBack /></div> */}
    </div>
  );
}

export default City;
