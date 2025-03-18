//
//

import Spinner from "../spinner/Spinner.jsx";
import Message from "../Message/Message.jsx";
import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem.jsx";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = Array.from(
    new Map(
      cities.map((city) => [
        city.country,
        { country: city.country, emoji: city.emoji, id: city.id },
      ])
    ).values()
  );

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
