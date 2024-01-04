import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        Map: lat {lat} and lng {lng}
      </h1>

      <button onClick={() => setSearchParams({ lat: 20, lng: 48 })}>
        Change Position
      </button>
    </div>
  );
}
