import { uid } from "react-uid";
import MarkerComponent from "../../../components/Marker/MarkerComponent";

const Markers = ({ markers }) => {
  return markers.map((marker, index) => (
    <MarkerComponent
      totalMarkers={markers.length}
      index={index}
      key={uid(marker)}
      marker={marker}
    />
  ));
};

export default Markers;
