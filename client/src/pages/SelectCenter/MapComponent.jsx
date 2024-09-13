import { Typography } from "@mui/material";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RecenterMap from "../../components/RecenterMap";
import SearchControl from "../../components/SearchControl/SearchControl";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";
import MapClickHandler from "./MapClickHandler";

const MapComponent = ({ operation }) => {
  const { centerLatLong, setCenterLatLong } = useLensCreationContext();
  const prov = new OpenStreetMapProvider();

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const markerElement = markerRef.current;

        if (markerElement != null) {
          const { lat, lng } = markerElement.getLatLng();
          const coordinates = [lat, lng];
          setCenterLatLong([...coordinates]);
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
        zoom={13}
        scrollWheelZoom={true}
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
          searchLabel={`${
            operation === "create" ? "Select" : "Change"
          } the centre point of your Lens`}
          keepResult={true}
        />

        <Marker
          eventHandlers={eventHandlers}
          draggable
          ref={markerRef}
          position={centerLatLong}
        >
          <Popup permanent>
            <Typography variant="h6">
              This will be the center of your map and your map will be focused around this particular region. Add markers for all your favorite spots in
              this region 😊
            </Typography>
          </Popup>
        </Marker>
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default MapComponent;
