import { useMapEvents } from "react-leaflet";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";

function MapClickHandler() {
  const { setCenterLatLong } = useLensCreationContext();

  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      setCenterLatLong([lat, lng]);
    },
  });

  return null;
}

export default MapClickHandler;
