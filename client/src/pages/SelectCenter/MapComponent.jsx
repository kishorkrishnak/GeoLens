import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useMemo, useRef } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import RecenterMap from "../../components/RecenterMap";
import SearchControl from "../../components/SearchControl/SearchControl";
import { Typography } from "@mui/material";
import { EditControl } from "react-leaflet-draw";
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
  const handleDraw = (e) => {
    const layer = e.layer;
    const bounds = layer.getBounds();
    // Store the bounds in your database or use it to restrict marker placement
    console.log(bounds);
  };
  return (
    <>
      <MapContainer
        className="map"
        center={centerLatLong}
        zoom={14}
        scrollWheelZoom={true}
        maxBoundsViscosity={1}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDraw}
            draw={{
              rectangle: true, // or enable polygon, circle, etc.
            }}
          />
        </FeatureGroup>
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
          } the center point of your lens`}
          keepResult={true}
        />

        <Marker
          eventHandlers={eventHandlers}
          draggable
          ref={markerRef}
          position={centerLatLong}
        >
          <Popup permanent>
            <Typography variant="h5">
              This will be the center of your map and your map will be locked to
              this particular region. Add markers for all your favorite spots in
              this region :D
            </Typography>
          </Popup>
        </Marker>
        {/* <MapClickHandler /> */}
      </MapContainer>
    </>
  );
};

export default MapComponent;