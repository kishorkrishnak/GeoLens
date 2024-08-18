import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import { useMapContext } from "../../contexts/MapContext";
import useRoutingMachine from "../../hooks/useRoutingMachine";
import MapClickHandler from "../MapClickHandler";
import MarkerComponent from "../Marker/MarkerComponent";
import MarkerModal from "../MarkerModal/MarkerModal";

function MapComponent() {
  const { centerLatLong, maxBounds, modalVisible, markers, routingMode } =
    useMapContext();
  const prov = new OpenStreetMapProvider();

  const wayPoints = markers.map((marker) => L.latLng(marker.lat, marker.lng));

  return (
    <>
      <MapContainer
        className="map"
        center={centerLatLong}
        maxBounds={maxBounds}
        zoom={14}
        minZoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <MarkerComponent
            totalMarkers={markers.length}
            index={index}
            key={uid(marker)}
            marker={marker}
          />
        ))}
   
        {modalVisible && <MarkerModal />}
        {routingMode && <RoutingMachineLayer waypoints={wayPoints} />}
        <MapClickHandler />
      </MapContainer>
    </>
  );
}

function RoutingMachineLayer({ waypoints }) {
  useRoutingMachine(waypoints);
  return null;
}

export default MapComponent;
