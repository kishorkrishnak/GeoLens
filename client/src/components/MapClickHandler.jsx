import { useMapEvents } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

const MapClickHandler = () => {
  const {
    modalVisible,
    setMarkerData,
    markerData,
    setModalVisible,
    setMarkerModalOperation,
    popupOpen,
  } = useMapContext();

  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      if (!popupOpen) {
        setMarkerModalOperation("create");

        //add marker only if markermodal is not visible
        if (!modalVisible) {
          setMarkerData({ ...markerData, lat, lng });
        }
        setModalVisible(true);
      }
    },
  });

  return null;
};

export default MapClickHandler;
