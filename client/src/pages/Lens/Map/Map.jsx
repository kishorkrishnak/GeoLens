import { Typography } from "@mui/material";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapBoundsEnforcer from "../../../components/MapBoundsEnforcer";
import MapClickHandler from "../../../components/MapClickHandler";
import createCentreIcon from "../../../components/Marker/MarkerIcons/CentreIcon";
import CommentsModal from "../../../components/Modals/CommentsModal/CommentsModal";
import MarkerModal from "../../../components/Modals/MarkerModal/MarkerModal";
import SuggestCorrectionModal from "../../../components/Modals/SuggestCorrectionModal/CommentsModal/SuggestCorrectionModal";
import PopupObserver from "../../../components/PopupObserver";
import RecenterMap from "../../../components/RecenterMap";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";
import { useMapContext } from "../../../contexts/MapContext";
import Markers from "./Markers";

const Map = () => {
  const { routingMode, lens, selectedMarkerCategory, currentTileLayer } =
    useMapContext();
  const markers = lens.markers;
  const wayPoints = markers.map((marker) => L.latLng(marker.lat, marker.lng));
  const centerCoordinates = lens.location.coordinates;

  const maxBoundsSouthWest = lens.address.circleBounds._southWest;
  const maxBoundsNorthEast = lens.address.circleBounds._northEast;

  const maxBounds = [
    [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
    [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
  ];

  /* render only the markers that match the selected category */
  const filteredMarkers = markers.filter((marker) =>
    selectedMarkerCategory && selectedMarkerCategory !== "All"
      ? marker.category === selectedMarkerCategory
      : true
  );

  const centreIcon = createCentreIcon();

  return (
    <>
      <MapContainer
        className="map"
        center={centerCoordinates}
        zoom={14}
        minZoom={10}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
      >
        {/* forcefully recenter map and update maxbounds when state changes */}
        <RecenterMap lat={centerCoordinates[0]} lng={centerCoordinates[1]} />
        <MapBoundsEnforcer maxBounds={maxBounds} />

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

        {/* to prevent marker modal opening if popup is opened */}
        <PopupObserver />

        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default Map;
