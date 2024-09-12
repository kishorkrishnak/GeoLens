import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

const MapBoundsEnforcer = ({ maxBounds }) => {
  const map = useMap();
  const prevMaxBoundsRef = useRef();

  useEffect(() => {
    if (maxBounds) {
      map.setMaxBounds(maxBounds);
      const wantedZoom = map.getBoundsZoom(maxBounds, false);
      
      setTimeout(() => {
        map.setMinZoom(wantedZoom);
      }, 500);

      if (
        JSON.stringify(maxBounds) !== JSON.stringify(prevMaxBoundsRef.current)
      ) {
        map.fitBounds(maxBounds);
        prevMaxBoundsRef.current = maxBounds;
      }
    }
  }, [maxBounds, map]);

  return null;
};

export default MapBoundsEnforcer;
