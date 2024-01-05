import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";

const flagemojiToPNG = (flag) => {
  if (flag === undefined) return;
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { cities } = useCities();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: isLoadingPosi,
    position: geoLocPosi,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocPosi) setMapPosition([geoLocPosi.lat, geoLocPosi.lng]);
    },
    [geoLocPosi]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocPosi && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosi ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMap position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );

  function ChangeMap({ position }) {
    const map = useMap();

    map.setView(position);

    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }
}
