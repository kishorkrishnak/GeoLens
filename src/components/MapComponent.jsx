import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { uid } from "react-uid";
import MapClickHandler from "./MapClickHandler";
import MarkerComponent from "./MarkerComponent";
import MarkerModal from "./MarkerModal/MarkerModal";

function MapComponent({
  modalVisible,
  setModalVisible,
  markers,
  center,
  maxBounds,
  setMarkerData,
  addMarker,
  deleteMarker,
  markerData,
  updateMarkerPosition
}) {
  return (
    <>
      <MapContainer
        className="map"
        center={center}
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
          <MarkerComponent
            key={uid(marker)}
            marker={marker}
            deleteMarker={deleteMarker}
            updateMarkerPosition={updateMarkerPosition}
          />
        ))}
        {modalVisible && (
          <MarkerModal
            markerData={markerData}
            setMarkerData={setMarkerData}
            addMarker={addMarker}
            setModalVisible={setModalVisible}
          />
        )}

        <MapClickHandler
          modalVisible={modalVisible}
          markerData={markerData}
          setMarkerData={setMarkerData}
          setModalVisible={setModalVisible}
        />
      </MapContainer>
    </>
  );
}

export default MapComponent;
