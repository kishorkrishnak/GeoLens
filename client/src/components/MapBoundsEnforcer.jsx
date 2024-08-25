import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapBoundsEnforcer = ({ maxBounds }) => {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(maxBounds);
    map.setMinZoom(map.getBoundsZoom(maxBounds));
  }, [map, maxBounds]);

  return null;
};

export default MapBoundsEnforcer;
