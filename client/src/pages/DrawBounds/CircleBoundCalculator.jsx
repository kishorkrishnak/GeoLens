import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";

const CircleBoundCalculator = () => {
  // center coordinates and the radius of the circle
  const { centerLatLong, circleBoundRadius, setCircleBounds } =
    useLensCreationContext();

  const map = useMap();

  useEffect(() => {
    if (circleBoundRadius > 0) {
      const center = L.latLng(centerLatLong);

      // create circle using center points and radius
      const circle = L.circle(center, { radius: circleBoundRadius });

      // add circle to map and calculate bounds
      circle.addTo(map);
      const bounds = circle.getBounds();

      // remove the map to clean up
      circle.removeFrom(map);

      setCircleBounds(bounds);
    }
  }, [circleBoundRadius, centerLatLong, map, setCircleBounds]);

  return null;
};

export default CircleBoundCalculator;
