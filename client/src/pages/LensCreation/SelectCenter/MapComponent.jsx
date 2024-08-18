import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import MarkerComponent from "../Marker/MarkerComponent";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useMemo, useRef } from "react";
import SearchControl from "../../../components/SearchControl/SearchControl";
import useRoutingMachine from "../../../hooks/useRoutingMachine";
import { useLensCreationContext } from "../contexts/LensCreationContext";
import MapClickHandler from "./MapClickHandler";
import Recenter from "./Recenter";

function MapComponent() {
  const { centerLatLong, setCenterLatLong, maxBounds, setMaxBounds } =
    useLensCreationContext();
  const prov = new OpenStreetMapProvider();

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const markerElement = markerRef.current;

        if (markerElement != null) {
          const { lat, lng } = markerElement.getLatLng();
          setCenterLatLong([lat, lng]);
        }
      },
    }),
    []
  );
  // const calculateMaxBounds = (
  //   centerLat,
  //   centerLng,
  //   zoomLevel,
  //   mapWidth,
  //   mapHeight
  // ) => {
  //   const map = L.map(document.createElement("div")).setView(
  //     [centerLat, centerLng],
  //     zoomLevel
  //   );
  //   const bounds = map.getBounds(); // Get current bounds based on the center and zoom level

  //   // Calculate the width and height in degrees
  //   const latDelta = bounds.getNorth() - bounds.getSouth();
  //   const lngDelta = bounds.getEast() - bounds.getWest();

  //   // Extend the bounds a bit to fit within screen boundaries
  //   const maxBounds = L.latLngBounds(
  //     [bounds.getSouth() - latDelta * 0.1, bounds.getWest() - lngDelta * 0.1],
  //     [bounds.getNorth() + latDelta * 0.1, bounds.getEast() + lngDelta * 0.1]
  //   );

  //   return maxBounds;
  // };

  // const zoomLevel = 14;
  // const mapWidth = 1920; // Example: Screen width in pixels
  // const mapHeight = 1080; // Example: Screen height in pixels
  return (
    <>
      <MapContainer
        className="map"
        center={centerLatLong}
        zoom={14}
        scrollWheelZoom={true}
        maxBoundsViscosity={1}
      >
        <Recenter lat={centerLatLong[0]} lng={centerLatLong[1]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl
          provider={prov}
          showMarker={false}
          showPopup={false}
          maxMarkers={3}
          style="bar"
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Select the center point of your lens"}
          keepResult={true}
        />

        <Marker
          eventHandlers={eventHandlers}
          draggable
          ref={markerRef}
          position={centerLatLong}
        >
          <Popup permanent>
            <h2>
              This will be the center of your map and your map will be locked to
              this particular region. Add markers for all your favorite spots in
              this region :D
            </h2>
          </Popup>
        </Marker>
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
