import { MapContainer, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import useMapContext from "../contexts/MapContext/useMapContext";
import MapClickHandler from "./MapClickHandler";
import MarkerComponent from "./MarkerComponent";
import MarkerModal from "./MarkerModal/MarkerModal";

function MapComponent() {
  const { putturCenterLatLong, maxBounds, modalVisible, markers } =
    useMapContext();
  return (
    <>
      <MapContainer
        className="map"
        center={putturCenterLatLong}
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

        {markers.map((marker) => (
          <MarkerComponent key={uid(marker)} marker={marker} />
        ))}
        {modalVisible && <MarkerModal />}

        <MapClickHandler />
      </MapContainer>
    </>
  );
}

export default MapComponent;
