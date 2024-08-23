import { Edit, ThumbDown, ThumbUp } from "@mui/icons-material/";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Stack, Typography } from "@mui/material";
import L from "leaflet";
import { useMemo, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { useMapContext } from "../../contexts/MapContext";
const MarkerComponent = ({ marker, index, totalMarkers }) => {
  const {
    updateMarkerPosition,
    removeMarker,
    setMarkerIdToUpdate,
    routingMode,
    isLensCreator,
    setModalVisible,
    setMarkerModalOperation,
    setMarkerData,
  } = useMapContext();

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        console.log("end");
        const markerElement = markerRef.current;
        if (markerElement != null) {
          const coordinates = markerElement.getLatLng();
          updateMarkerPosition(marker._id, coordinates);
        }
      },
    }),
    [marker._id]
  );

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    removeMarker(marker._id);
  };

  const handleEditClick = (e) => {
    setMarkerModalOperation("edit");
    setMarkerIdToUpdate(marker._id);
    const coordinates = marker.location.coordinates;
    setMarkerData({ ...marker, lat: coordinates[0], lng: coordinates[1] });
    setModalVisible(true);
    e.stopPropagation();
  };

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
  const position = marker.location.coordinates;

  return (
    <Marker
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable={isLensCreator}
      icon={icon}
      position={position}
    >
      <Tooltip permanent={routingMode}>{marker.title}</Tooltip>

      <Popup>
        <Typography variant="h6">{marker.title}</Typography>
        <Typography variant="body1">{marker.description}</Typography>
        <Typography marginBottom={2} variant="subtitle2" display={"block"}>
          <Typography variant="span" fontWeight={600}>
            Category:{" "}
          </Typography>
          {marker.category}
        </Typography>

        <Typography variant="subtitle2">
          {marker?.address?.formatted}
        </Typography>

        {marker?.image && (
          <img
            src={marker.image}
            style={{ maxWidth: "130px", borderRadius: "5px" }}
            alt="marker-image"
          />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 3,
          }}
        >
          <Typography variant="body1" noWrap>
            <ThumbUp
              fontSize="small"
              color="primary"
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
            />
            {marker?.upvotes}
          </Typography>
          <Typography variant="body1" noWrap>
            <ThumbDown
              fontSize="small"
              color="primary"
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
            />
            {marker?.downvotes}
          </Typography>
        </Box>
        {isLensCreator && (
          <Stack direction={"row"} spacing={1}>
            <Edit onClick={handleEditClick} fontSize="small" />
            <DeleteForeverIcon
              color="error"
              onClick={handleDeleteClick}
              fontSize="small"
            />
          </Stack>
        )}
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
