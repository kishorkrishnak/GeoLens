import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapBoundsEnforcer = ({ maxBounds }) => {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(maxBounds);
    map.setMinZoom(map.getBoundsZoom(maxBounds, false));
  }, [maxBounds, map]);

  return null;
};

export default MapBoundsEnforcer;
