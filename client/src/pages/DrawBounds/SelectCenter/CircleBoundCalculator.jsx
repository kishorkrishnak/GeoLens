import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLensCreationContext } from "../../LensCreation/contexts/LensCreationContext";

const CircleBoundCalculator = () => {
  const { centerLatLong, circleBoundRadius, setCircleBounds } =
    useLensCreationContext();

  const map = useMap();

  useEffect(() => {
    if (circleBoundRadius > 0) {
      const center = L.latLng(centerLatLong);
      const circle = L.circle(center, { radius: circleBoundRadius });
      circle.addTo(map);
      const bounds = circle.getBounds();
      circle.removeFrom(map);

      setCircleBounds(bounds);
    }
  }, [circleBoundRadius, centerLatLong]);

  return null;
};

export default CircleBoundCalculator;
