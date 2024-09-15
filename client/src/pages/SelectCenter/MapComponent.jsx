import { Typography } from "@mui/material";
import { useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RecenterMap from "../../components/RecenterMap";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";
import MapClickHandler from "./MapClickHandler";
import Searchbar from "./Searchbar";

const MapComponent = ({ operation }) => {
  const { centerLatLong, setCenterLatLong } = useLensCreationContext();

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
        <Searchbar operation={operation} />
        <Marker
          eventHandlers={eventHandlers}
          draggable
          ref={markerRef}
          position={centerLatLong}
        >
          <Popup permanent>
            <Typography variant="h6">
              This will be the center of your map and your map will be focused
              around this particular region. Add markers for all your favorite
              spots in this region 😊
            </Typography>
          </Popup>
        </Marker>
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default MapComponent;
