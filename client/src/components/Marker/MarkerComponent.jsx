import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {ThumbDown,ThumbUp} from '@mui/icons-material/';
import { Box, Typography } from "@mui/material";
import L from "leaflet";
import { useCallback, useMemo, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { useMapContext } from "../../contexts/MapContext";
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
      <Popup>
        <Typography variant="h6">{marker.title}</Typography>
        <Typography variant="subtitle1">{marker.description}</Typography>
        <Typography marginBottom={2} variant="subtitle2" display={"block"}>
          <Typography variant="span" fontWeight={600}>
            Category:{" "}
          </Typography>
          {marker.category}
        </Typography>
        {marker?.image && (
          <img
            src={marker.image}
            style={{ maxWidth: "130px" }}
            alt="marker-image"
          />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap:3
          }}
        >
       
          <Typography variant="body1" noWrap>
            <ThumbUp
              fontSize="small"
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
            />
            {77}
          </Typography>
          <Typography variant="body1" noWrap>
            <ThumbDown
              fontSize="small"
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
            />
            {77}
          </Typography>
        </Box>
        <DeleteForeverIcon
          color="error"
          onClick={handleDeleteClick}
          fontSize="small"
        />
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
