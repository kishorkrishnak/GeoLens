import { memo } from "react";
import { uid } from "react-uid";
import MarkerComponent from "../../../components/Marker/MarkerComponent";

const Markers = memo(({ markers }) => {
  return markers.map((marker, index) => (
    <MarkerComponent
      totalMarkers={markers.length}
      index={index}
      key={uid(marker)}
      marker={marker}
    />
  ));
});

Markers.displayName = "Markers"; 

export default Markers;