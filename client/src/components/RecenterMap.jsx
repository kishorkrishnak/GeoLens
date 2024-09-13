import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ lat, lng }) => {
  const mapDiv = document.querySelector("#lens-map");

  const map = useMap();

  const resizeObserver = new ResizeObserver(() => {
    map.invalidateSize();
  });

  resizeObserver.observe(mapDiv);

  useEffect(() => {
    setTimeout(() => {
      map.setView([lat, lng]);
    }, 500);
  }, [lat, lng, map]);

  return null;
};

export default RecenterMap;
