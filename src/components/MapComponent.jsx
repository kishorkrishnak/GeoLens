import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

function MapComponent() {
  const position = [51.505, -0.09];
  return (
    <>
      <MapContainer
        className="map"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl ={false}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ,
      {/* <div id="map" onClick={handleMapClick}></div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setModalVisible(false)}
            >
              &times;
            </span>
            <h2>Enter Marker Details</h2>
            <input
              type="text"
              value={markerData.title}
              onChange={(e) =>
                setMarkerData({ ...markerData, title: e.target.value })
              }
              placeholder="Enter Title"
            />
            <input
              type="text"
              value={markerData.description}
              onChange={(e) =>
                setMarkerData({ ...markerData, description: e.target.value })
              }
              placeholder="Enter Description"
            />
            <input
              type="text"
              value={markerData.category}
              onChange={(e) =>
                setMarkerData({ ...markerData, category: e.target.value })
              }
              placeholder="Enter Category"
            />
            <button onClick={addMarker} className="btn">
              Submit
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}

export default MapComponent;
