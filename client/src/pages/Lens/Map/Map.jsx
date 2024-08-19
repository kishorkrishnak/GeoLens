import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import MapClickHandler from "../../../components/MapClickHandler";
import MarkerComponent from "../../../components/Marker/MarkerComponent";
import MarkerModal from "../../../components/Modals/MarkerModal/MarkerModal";
import RecenterMap from "../../../components/RecenterMap";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";
import { useMapContext } from "../../../contexts/MapContext";

const Map = () => {
  const { modalVisible, routingMode, lens } = useMapContext();
  const markers = lens.markers;
  const wayPoints = markers.map((marker) => L.latLng(marker.lat, marker.lng));
  const centerCoordinates = lens.location.coordinates;

  return (
    <>
      <MapContainer
        className="map"
        center={centerCoordinates}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
      >
        {/* forcefully recenter map when coordinates changes */}
        <RecenterMap lat={centerCoordinates[0]} lng={centerCoordinates[1]} />

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

        <MarkerModal lensId={lens._id} modalVisible={modalVisible} />
        {routingMode && <RoutingMachine waypoints={wayPoints} />}
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default Map;
