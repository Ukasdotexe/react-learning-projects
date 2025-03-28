//
//

import styles from "./CityList.module.css";
import Spinner from "../spinner/Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "../Message/Message.jsx";
import { useCity } from "../../Contexts/CityProvider.jsx";

function CityList() {
  const { cities, loading } = useCity();

  if (loading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
