import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import { useAuthContext } from "../contexts/AuthContext";
import { useMapContext } from "../contexts/MapContext";

const MapBoundsEnforcer = () => {
  const { lens } = useMapContext();
  const { setLoading } = useAuthContext();
  const map = useMap();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    timeoutRef.current = setTimeout(() => {
      setLoading(false);

      setIsReady(true);
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (
      isReady &&
      !isInitialized &&
      lens &&
      lens.address &&
      lens.address.circleBounds &&
      map
    ) {
      const maxBoundsSouthWest = lens.address.circleBounds._southWest;
      const maxBoundsNorthEast = lens.address.circleBounds._northEast;

      const maxBounds = [
        [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
        [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
      ];

      map.setMaxBounds(maxBounds);

      const wantedZoom = map.getBoundsZoom(maxBounds, false);
      map.setMinZoom(wantedZoom > 0 ? wantedZoom : 13);
      map.fitBounds(maxBounds);

      setIsInitialized(true);
    }
  }, [map, lens, isReady, isInitialized, setLoading]);

  useEffect(() => {
    setIsInitialized(false);
  }, [lens]);

  return null;
};

export default MapBoundsEnforcer;
