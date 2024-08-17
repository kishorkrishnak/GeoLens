import { Marker, Popup } from "react-leaflet";
import "./MarkerComponent.css";
import { useMemo, useRef } from "react";

const MarkerComponent = ({ marker, updateMarkerPosition, deleteMarker }) => {
  const position = [marker.lat, marker.lng];
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const markerElement = markerRef.current;

        if (markerElement != null) {
          updateMarkerPosition(marker.id, markerElement.getLatLng());
        }
      },
    }),
    []
  );
  const markerRef = useRef(null);
  return (
    <Marker
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable
      position={position}
    >
      <Popup>
        <h3 className="marker-title">{marker.title}</h3>
        <p className="marker-description">{marker.description}</p>
        <p className="marker-category">
          <span>Category:</span> {marker.category}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteMarker(marker.id);
          }}
          className="btn btn-delete"
        >
          Delete
        </button>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
