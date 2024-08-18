import { useCallback, useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMapContext } from "../../contexts/MapContext";
import "./MarkerComponent.css";
import { Button } from "@mui/material";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const MarkerComponent = ({ marker, index, totalMarkers }) => {
  const { updateMarkerPosition, deleteMarker, routingMode } = useMapContext();
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const markerElement = markerRef.current;
        if (markerElement != null) {
          updateMarkerPosition(marker.id, markerElement.getLatLng());
        }
      },
    }),
    [marker.id, updateMarkerPosition]
  );

  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation();
      deleteMarker(marker.id);
    },
    [deleteMarker, marker.id]
  );
  let markerColor;
  if (index === 0) {
    markerColor = "green";
  } else if (index === totalMarkers - 1) {
    markerColor = "red";
  } else {
    markerColor = "blue";
  }

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: renderToStaticMarkup(
      <div
        style={{
          backgroundColor: markerColor,
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {index + 1}
      </div>
    ),
  });
  const icon = routingMode ? customIcon : new L.Icon.Default();
  return (
    <Marker
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable
      icon={icon}
      position={[marker.lat, marker.lng]}
    >
      <Popup >
        <h3 className="marker-title">{marker.title}</h3>
        <p className="marker-description">{marker.description}</p>
        <p className="marker-category">
          <span>Category:</span> {marker.category}
        </p>
        <Button onClick={handleDeleteClick} variant="contained" color="error">
          Delete
        </Button>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
