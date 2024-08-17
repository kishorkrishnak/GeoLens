import { useMapEvents } from "react-leaflet";

function MapClickHandler({
  modalVisible,
  setMarkerData,
  markerData,
  setModalVisible,
}) {
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
