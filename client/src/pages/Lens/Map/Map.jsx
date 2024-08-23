import { Typography } from "@mui/material";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import MapBoundsEnforcer from "../../../components/MapBoundsEnforcer";
import MapClickHandler from "../../../components/MapClickHandler";
import MarkerComponent from "../../../components/Marker/MarkerComponent";
import CommentsModal from "../../../components/Modals/CommentsModal/CommentsModal";
import MarkerModal from "../../../components/Modals/MarkerModal/MarkerModal";
import RecenterMap from "../../../components/RecenterMap";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";
import { useMapContext } from "../../../contexts/MapContext";
import Markers from "./Markers";

const Map = () => {
  const { routingMode, lens, selectedMarkerCategory } = useMapContext();
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
console.log(centerCoordinates)
  return (
    <>
      <MapContainer
        className="map"
        center={centerCoordinates}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
        autoPan={false}
      >
        {/* forcefully recenter map and update maxbounds when state changes */}
        <RecenterMap lat={centerCoordinates[0]} lng={centerCoordinates[1]} />
        <MapBoundsEnforcer maxBounds={maxBounds} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Markers markers={filteredMarkers} />

        <Marker position={centerCoordinates}>
          <Popup permanent>
            <Typography variant="h6">Center point of this lens</Typography>
            <Typography variant="subtitle2">
              {lens?.address?.formatted}
            </Typography>
          </Popup>
        </Marker>

        <MarkerModal lensId={lens._id} />
        <CommentsModal lensId={lens._id} />

        {routingMode && <RoutingMachine waypoints={wayPoints} />}
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default Map;
