import { Typography } from "@mui/material";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapBoundsEnforcer from "../../../components/MapBoundsEnforcer";
import MapClickHandler from "../../../components/MapClickHandler";
import createCentreIcon from "../../../components/Marker/MarkerIcons/CentreIcon";
import CommentsModal from "../../../components/Modals/CommentsModal/CommentsModal";
import MarkerModal from "../../../components/Modals/MarkerModal/MarkerModal";
import SuggestCorrectionModal from "../../../components/Modals/SuggestCorrectionModal/CommentsModal/SuggestCorrectionModal";
import PopupObserver from "../../../components/PopupObserver";
import RecenterMap from "../../../components/RecenterMap";
import ResizeMap from "../../../components/ResizeMap";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";
import { useMapContext } from "../../../contexts/MapContext";
import Markers from "./Markers";

const Map = () => {
  const {
    routingMode,
    lens,
    selectedMarkerCategory,
    currentTileLayer,
    sidebarCollapsed,
  } = useMapContext();

  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapContainerRef.current.style.width = `calc(100vw - ${
        sidebarCollapsed ? "50px" : "260px"
      })`;

      mapContainerRef.current.style.transition = "width 0.3s ease";
    }
  }, [sidebarCollapsed]);

  const markers = lens.markers;

  const wayPoints = markers.map((marker) =>
    L.latLng(marker.location.coordinates[0], marker.location.coordinates[1])
  );

  const centerCoordinates = lens.location.coordinates;

  const filteredMarkers = markers.filter((marker) =>
    selectedMarkerCategory && selectedMarkerCategory !== "All"
      ? marker.category === selectedMarkerCategory
      : true
  );

  const centreIcon = createCentreIcon();

  return (
    <div ref={mapContainerRef} style={{ height: "100vh", marginLeft: "auto" }}>
      <MapContainer
        className="map"
        id="lens-map"
        center={centerCoordinates}
        zoom={14}
        minZoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
        style={{ width: "100%", height: "100%" }}
      >
        <RecenterMap lat={centerCoordinates[0]} lng={centerCoordinates[1]} />
        <MapBoundsEnforcer />
        <ResizeMap />

        <TileLayer
          url={currentTileLayer.url}
          attribution={currentTileLayer.attribution}
        />

        <Markers markers={filteredMarkers} />

        <Marker icon={centreIcon} position={centerCoordinates}>
          <Popup permanent>
            <Typography variant="h6">Centre point of this Lens</Typography>
            <Typography variant="subtitle2">
              {lens?.address?.formatted}
            </Typography>
          </Popup>
        </Marker>

        <MarkerModal lensId={lens._id} />
        <CommentsModal lensId={lens._id} />
        <SuggestCorrectionModal lensId={lens._id} />
        {routingMode && <RoutingMachine waypoints={wayPoints} />}

        <PopupObserver />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
