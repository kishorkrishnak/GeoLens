import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RecenterMap from "../../../components/RecenterMap";
import SearchControl from "../../../components/SearchControl/SearchControl";
import { useLensCreationContext } from "../contexts/LensCreationContext";
import MapClickHandler from "./MapClickHandler";

function MapComponent() {
  const { centerLatLong, setCenterLatLong } = useLensCreationContext();
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

  return (
    <>
      <MapContainer
        className="map"
        center={centerLatLong}
        zoom={14}
        scrollWheelZoom={true}
        maxBoundsViscosity={1}
      >
        <RecenterMap lat={centerLatLong[0]} lng={centerLatLong[1]} />
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

export default MapComponent;
