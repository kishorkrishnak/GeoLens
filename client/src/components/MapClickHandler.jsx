import { useMapEvents } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

function MapClickHandler() {
  const { modalVisible, setMarkerData, markerData, setModalVisible } =
    useMapContext();

  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      //add marker only if markermodal is not visible
      if (!modalVisible) {
        setMarkerData({ ...markerData, lat, lng });
      }
      setModalVisible(true);
    },
  });

  return null;
}

export default MapClickHandler;
