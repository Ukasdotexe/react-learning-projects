import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import Spinner from "../spinner/Spinner.jsx";
import { useCity } from "../../Contexts/CityProvider";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeoLocation } from "../../hooks/useGeoLocation.jsx";
import Button from "../Button/Button.jsx";
import styles from "./Map.module.css";
import useUrlPosition from "../../hooks/useUrlPosition.jsx";

function Map() {
  const [mapPosition, setMapPosition] = useState([
    40.68063802521456, 8.931884765625002,
  ]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  const { cities } = useCity();
  const { mapLat, mapLng } = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (
        geoLocationPosition &&
        geoLocationPosition.lat &&
        geoLocationPosition.lng
      ) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );

  if (!cities) return <Spinner />;

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        whenCreated={(map) => {
          map.setView(mapPosition);
        }}
      >
        <TileLayer
          url={`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={mapPosition}></Marker>
        {cities.map((city) => {
          const {
            position: { lat, lng },
          } = city;
          return (
            <Marker position={[lat, lng]} key={city.id}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(
        `form?lat=${e.latlng.lat}&lng=${e.latlng.lng}&timestamp=${Date.now()}`
      );
    },
  });
}
export default Map;
