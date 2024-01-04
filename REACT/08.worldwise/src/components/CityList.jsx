import CityItem from "./CityItem";
import styles from "./CityList.module.css";

import Spinner from "./Spinner";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem key={i} city={city} />
      ))}
    </div>
  );
}
