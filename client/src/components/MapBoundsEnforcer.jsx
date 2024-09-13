import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

const MapBoundsEnforcer = () => {
  const { lens } = useMapContext();

  const maxBoundsSouthWest = lens.address.circleBounds._southWest;
  const maxBoundsNorthEast = lens.address.circleBounds._northEast;

  const maxBounds = [
    [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
    [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
  ];

  const map = useMap();
  const prevMaxBoundsRef = useRef();

  useEffect(() => {
    if (maxBounds) {
      map.setMaxBounds(maxBounds);
      const wantedZoom = map.getBoundsZoom(maxBounds, false);

      setTimeout(() => {
        map.setMinZoom(wantedZoom);
      }, 800);

      if (
        JSON.stringify(maxBounds) !== JSON.stringify(prevMaxBoundsRef.current)
      ) {
        map.fitBounds(maxBounds);
        prevMaxBoundsRef.current = maxBounds;
      }
    }
  }, [maxBounds]);

  return null;
};

export default MapBoundsEnforcer;
