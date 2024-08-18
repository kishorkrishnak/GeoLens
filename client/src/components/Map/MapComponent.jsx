import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import { useMapContext } from "../../contexts/MapContext";
import useRoutingMachine from "../../hooks/useRoutingMachine";
import MapClickHandler from "../MapClickHandler";
import MarkerComponent from "../Marker/MarkerComponent";
import MarkerModal from "../MarkerModal/MarkerModal";
import RecenterMap from "../RecenterMap";
import RoutingMachine from "../RoutingMachine/RoutingMachine";

function MapComponent() {
  const { centerLatLong, modalVisible, markers, routingMode } = useMapContext();

  const wayPoints = markers.map((marker) => L.latLng(marker.lat, marker.lng));

  return (
    <>
      <MapContainer
        className="map"
        center={centerLatLong}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
      >
        {/* forcefully recenter map when coordinates changes */}
        <RecenterMap lat={centerLatLong[0]} lng={centerLatLong[1]} />

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

<MarkerModal  modalVisible={modalVisible}/>
        {routingMode && <RoutingMachine waypoints={wayPoints} />}
        <MapClickHandler />
      </MapContainer>
    </>
  );
}

export default MapComponent;
