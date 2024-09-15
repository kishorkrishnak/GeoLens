import L from "leaflet";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Marker, Tooltip } from "react-leaflet";
import Modal from "react-responsive-modal";
import { dislikeMarker, likeMarker } from "../../api/marker";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMapContext } from "../../contexts/MapContext";
import CustomPopup from "./CustomPopup";
import createNumberedIcon from "./MarkerIcons/NumberedIcon";
import "./PopupModal.css";

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
    lens,
  } = useMapContext();

  const { user } = useAuthContext();
  const [markerData, setMarkerDataState] = useState(marker);
  const [open, setOpen] = useState(false);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      click() {
        setOpen(true);
      },
      async dragend() {
        const markerElement = markerRef.current;
        if (markerElement != null) {
          const coordinates = markerElement.getLatLng();

          const maxBoundsSouthWest = lens.address.circleBounds._southWest;
          const maxBoundsNorthEast = lens.address.circleBounds._northEast;

          const maxBounds = [
            [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
            [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
          ];

          const bounds = L.latLngBounds(maxBounds);

          if (!bounds.contains(coordinates)) {
            markerElement.setLatLng(markerData.location.coordinates);
            return toast.error("Point outside your bounded region");
          }

          updateMarkerPosition(marker._id, coordinates);
        }
      },
    }),
    [
      marker._id,
      markerData.location.coordinates,
      lens.address.circleBounds,
      updateMarkerPosition,
    ]
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
    if (!user?._id) return toast.error("Login to like this lens");
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
    if (!user?._id) return toast.error("Login to dislike this lens");

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

  function handleClose() {
    setOpen(false);
  }

  const tooltipRef = useRef(null);

  return (
    <>
      <Marker
        eventHandlers={eventHandlers}
        ref={markerRef}
        draggable={isLensCreator}
        icon={icon}
        position={position}
      >
        {!open && <Tooltip  ref={tooltipRef}>{marker.title}</Tooltip>}
      </Marker>

      <Modal
        classNames={{
          modal: "popup-modal",
        }}
        center
        open={open}
        onClose={handleClose}
      >
        <CustomPopup
          markerData={markerData}
          isLiked={isLiked}
          isDisliked={isDisliked}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          isLensCreator={isLensCreator}
        />
      </Modal>
    </>
  );
};

export default MarkerComponent;
