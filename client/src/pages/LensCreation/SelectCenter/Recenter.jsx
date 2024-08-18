import { useEffect } from "react";
import { useMap } from "react-leaflet";

const Recenter = ({ lat, lng, zoom = 14 }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom]);

  return null;
};

export default Recenter;