import {
    Edit,
    ThumbDown,
    ThumbDownOutlined,
    ThumbUp,
    ThumbUpOutlined,
} from "@mui/icons-material/";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Stack, Typography } from "@mui/material";
import L from "leaflet";
import { useMemo, useRef, useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMapContext } from "../../contexts/MapContext";

import toast from "react-hot-toast";
import { dislikeMarker, likeMarker } from "../../api/marker";
import createNumberedIcon from "./MarkerIcons/NumberedIcon";
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

  const { user } = useAuthContext();
  const [markerData, setMarkerDataState] = useState(marker);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
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

  const handleLike = async (e) => {
    e.stopPropagation();
    if (isLiked) return;

    try {
      const response = await likeMarker(marker._id);
      if (response.data.status === "success") {
        setMarkerDataState(response.data?.data);
        toast.success("Marker liked");
      } else throw new Error("Error liking the marker");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    if (isDisliked) return;
    try {
      const response = await dislikeMarker(marker._id);
      if (response.data.status === "success") {
        setMarkerDataState(response.data?.data);
        toast.success("Marker disliked");
      } else throw new Error("Error disliking the marker");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isLiked = markerData.likes.includes(user?._id);
  const isDisliked = markerData.dislikes.includes(user?._id);

  let markerColor;
  if (index === 0) {
    markerColor = "green";
  } else if (index === totalMarkers - 1) {
    markerColor = "red";
  } else {
    markerColor = "blue";
  }

  const numberedIcon = createNumberedIcon(index, markerColor);

  const icon = routingMode ? numberedIcon : new L.Icon.Default();
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
          <Typography variant="body1">
            {isLiked ? (
              <ThumbUp
                sx={{ verticalAlign: "middle", marginRight: 1.5 }}
                fontSize="small"
                color="primary"
                onClick={handleLike}
              />
            ) : (
              <ThumbUpOutlined
                sx={{ verticalAlign: "middle", marginRight: 1.5 }}
                fontSize="small"
                color="primary"
                onClick={handleLike}
              />
            )}
            {markerData.likes.length}
          </Typography>
          <Typography variant="body1">
            {isDisliked ? (
              <ThumbDown
                sx={{ verticalAlign: "middle", marginRight: 1.5 }}
                fontSize="small"
                color="primary"
                onClick={handleDislike}
              />
            ) : (
              <ThumbDownOutlined
                sx={{ verticalAlign: "middle", marginRight: 1.5 }}
                fontSize="small"
                color="primary"
                onClick={handleDislike}
              />
            )}
            {markerData.dislikes.length}
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
