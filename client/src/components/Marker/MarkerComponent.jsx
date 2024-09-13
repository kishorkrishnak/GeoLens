import L from "leaflet";
import R from "leaflet-responsive-popup";
import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import toast from "react-hot-toast";
import { Marker, Tooltip } from "react-leaflet";
import { dislikeMarker, likeMarker } from "../../api/marker";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMapContext } from "../../contexts/MapContext";
import createNumberedIcon from "./MarkerIcons/NumberedIcon";
import ResponsivePopup from "./ResponsivePopup";

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
    popupOpen,
    lens,
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
          const maxBoundsSouthWest = lens.address.circleBounds._southWest;
          const maxBoundsNorthEast = lens.address.circleBounds._northEast;

          const maxBounds = [
            [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
            [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
          ];

          const bounds = L.latLngBounds(maxBounds);

          if (!bounds.contains(coordinates)) {
            console.log(markerData);
            markerElement.setLatLng(markerData.location.coordinates);

            return toast.error("Point outside your bounded region");
          }

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

  useEffect(() => {
    if (markerRef.current) {
      const popup = R.responsivePopup({
        hasTip: true,
        offset: [15, 20],
        autoPanPadding: [10, 10],
      });

      // Render React component inside Leaflet popup
      const popupContent = document.createElement("div");
      createRoot(popupContent).render(
        <ResponsivePopup
          markerData={markerData}
          isLiked={isLiked}
          isDisliked={isDisliked}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          isLensCreator={isLensCreator}
        />
      );

      popup.setContent(popupContent);

      markerRef.current.bindPopup(popup);
    }
  }, [markerData, isLiked, isDisliked, isLensCreator]);

  return (
    <Marker
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable={isLensCreator}
      icon={icon}
      position={position}
    >
      {!popupOpen && <Tooltip permanent={routingMode}>{marker.title}</Tooltip>}
    </Marker>
  );
};

export default MarkerComponent;
