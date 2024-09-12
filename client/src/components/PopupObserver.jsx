import { useMapEvents } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

const PopupObserver = () => {
  const { setPopupOpen } = useMapContext();
  useMapEvents({
    popupopen: () => {
      console.log("yay");
      setPopupOpen(true);
    },
    popupclose: () => {
        setPopupOpen(false);
      },
  });

  return null;
};

export default PopupObserver;
