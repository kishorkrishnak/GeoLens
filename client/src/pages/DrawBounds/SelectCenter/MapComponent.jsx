import { OpenStreetMapProvider } from "leaflet-geosearch";
import {
  FeatureGroup,
  MapContainer,
  TileLayer
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import RecenterMap from "../../components/RecenterMap";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";
import MapClickHandler from "./MapClickHandler";

const MapComponent = () => {
  const { centerLatLong, setCenterLatLong } = useLensCreationContext();

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
              rectangle: true,
              polyline: false,
              circle: true,
              polygon: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
        <RecenterMap lat={centerLatLong[0]} lng={centerLatLong[1]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default MapComponent;
