import { useMapEvents } from "react-leaflet";
import useMapContext from "../contexts/MapContext/useMapContext";

function MapClickHandler() {

  const {modalVisible,setMarkerData,markerData,setModalVisible } = useMapContext();

  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      if (!modalVisible) {
        setMarkerData({ ...markerData, lat, lng });
      }
      setModalVisible(true);
    },
  });

  return null;
}

export default MapClickHandler;
