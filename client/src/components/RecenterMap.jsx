import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.flyTo([lat, lng]);
    }, 500);
  }, [lat, lng, map]);

  return null;
};

export default RecenterMap;
