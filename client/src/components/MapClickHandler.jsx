import L from "leaflet";
import toast from "react-hot-toast";
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
    lens,
  } = useMapContext();

  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      if (!popupOpen) {
        const maxBoundsSouthWest = lens.address.circleBounds._southWest;
        const maxBoundsNorthEast = lens.address.circleBounds._northEast;

        const maxBounds = [
          [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
          [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
        ];

        const bounds = L.latLngBounds(maxBounds);
        const latlng = L.latLng(lat, lng);
        if (!bounds.contains(latlng)) {
          return toast.error("Point outside your bounded region");
        }

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
