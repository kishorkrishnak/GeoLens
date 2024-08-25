import { Typography } from "@mui/material";
import L from "leaflet";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import RecenterMap from "../../components/RecenterMap";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";
import CircleBoundCalculator from "./CircleBoundCalculator";

L.Control.prototype._refocusOnMap = function _refocusOnMap() {};

const MapComponent = () => {
  const { centerLatLong, circleBoundRadius } = useLensCreationContext();

  return (
    <>
      <MapContainer
        className="map"
        center={centerLatLong}
        zoom={14}
        minZoom={12}
        scrollWheelZoom={true}
        maxBoundsViscosity={1}
      >
        <FeatureGroup>
          <Circle center={centerLatLong} radius={circleBoundRadius} />
        </FeatureGroup>
        <RecenterMap lat={centerLatLong[0]} lng={centerLatLong[1]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleBoundCalculator />

        <Marker position={centerLatLong}>
          <Popup permanent>
            <Typography variant="h6">
              This will be the center of your map and your map will be locked to
              this particular region. Add markers for all your favorite spots in
              this region :D
            </Typography>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapComponent;
