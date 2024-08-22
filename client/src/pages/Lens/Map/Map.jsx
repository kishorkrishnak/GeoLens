import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import MapBoundsEnforcer from "../../../components/MapBoundsEnforcer";
import MapClickHandler from "../../../components/MapClickHandler";
import MarkerComponent from "../../../components/Marker/MarkerComponent";
import MarkerModal from "../../../components/Modals/MarkerModal/MarkerModal";
import RecenterMap from "../../../components/RecenterMap";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";
import { useMapContext } from "../../../contexts/MapContext";
import { Typography } from "@mui/material";
import CommentsModal from "../../../components/Modals/CommentsModal/CommentsModal";
const Map = () => {
  const {
    modalVisible,
    routingMode,
    lens,
    centerLatLong,
    commentsModalVisible,
  } = useMapContext();
  const markers = lens.markers;
  const wayPoints = markers.map((marker) => L.latLng(marker.lat, marker.lng));
  const centerCoordinates = lens.location.coordinates;

  const maxBoundsSouthWest = lens.address.circleBounds._southWest;
  const maxBoundsNorthEast = lens.address.circleBounds._northEast;

  const maxBounds = [
    [maxBoundsSouthWest.lat, maxBoundsSouthWest.lng],
    [maxBoundsNorthEast.lat, maxBoundsNorthEast.lng],
  ];

  return (
    <>
      <MapContainer
        className="map"
        center={centerCoordinates}
        zoom={14}
        minZoom={13}
        scrollWheelZoom={true}
        maxBounds={maxBounds}
        zoomControl={false}
        maxBoundsViscosity={1}
      >
        {/* forcefully recenter map and update maxbounds when state changes */}
        <RecenterMap lat={centerCoordinates[0]} lng={centerCoordinates[1]} />
        <MapBoundsEnforcer maxBounds={maxBounds} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* render all the markers associated with the lens */}
        {markers.map((marker, index) => (
          <MarkerComponent
            totalMarkers={markers.length}
            index={index}
            key={uid(marker)}
            marker={marker}
          />
        ))}

        <Marker position={centerLatLong}>
          <Popup permanent>
            <Typography variant="h5">
              This will be the center of your map and your map will be locked to
              this particular region. Add markers for all your favorite spots in
              this region :D
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
