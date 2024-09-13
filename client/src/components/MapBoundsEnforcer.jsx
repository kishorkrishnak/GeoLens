import { useEffect } from "react";
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

  useEffect(() => {
    if (maxBounds) {
      const wantedZoom = map.getBoundsZoom(maxBounds, false);
      map.setMaxBounds(maxBounds);
      setTimeout(() => {
        map.setMinZoom(wantedZoom);
      }, 1000);
      // map.fitBounds(maxBounds);
    }
  }, [maxBounds]);

  return null;
};

export default MapBoundsEnforcer;
