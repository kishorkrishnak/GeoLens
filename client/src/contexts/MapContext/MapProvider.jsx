import { useState } from "react";
import toast from "react-hot-toast";
import { generateUniqueId } from "../../utils";
import MapContext from "./MapContext";

export const MapProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [routingMode, setRoutingMode] = useState(false);

  const [markers, setMarkers] = useState(getSavedMarkers());

  function getSavedMarkers() {
    return JSON.parse(localStorage.getItem("markers")) || [];
  }

  function setSavedMarkers(markers) {
    try {
      localStorage.setItem("markers", JSON.stringify(markers));
    } catch (e) {
      console.error("Failed to update localStorage:", e);
    }
  }

  function addMarker() {
    const id = generateUniqueId();

    if (!(markerData.title && markerData.category)) {
      return toast.error("You must provide a title and category");
    }
    const newMarker = {
      ...markerData,
      id,
    };
    setMarkers([...markers, newMarker]);

    const savedMarkers = getSavedMarkers();

    savedMarkers.push(newMarker);
    setSavedMarkers(savedMarkers);
    setModalVisible(false);
    toast.success("Marker added");
    setMarkerData({});
  }

  function deleteMarker(id) {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers([...updatedMarkers]);
    setSavedMarkers(updatedMarkers);
    toast.success("Marker deleted");
    setRoutingMode(false)
  }

  const centerLatLong = [12.762846155546352, 75.2016619004097];
  const maxBounds = [
    [12.74116988678989, 75.09318351745607],
    [12.797405423615684, 75.22253036499025],
  ];

  const [markerData, setMarkerData] = useState({
    lat: null,
    lng: null,
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const updateMarkerPosition = (id, { lat, lng }) => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.id === id) {
        return {
          ...marker,
          lat,
          lng,
        };
      }

      return marker;
    });

    setMarkers([...updatedMarkers]);
    let savedMarkers = getSavedMarkers();
    const savedMarker = savedMarkers.find((marker) => marker.id === id);

    if (savedMarker) {
      savedMarker.lat = lat;
      savedMarker.lng = lng;
    }

    setSavedMarkers(savedMarkers);
  };

  const contextValue = {
    markers,
    setMarkers,
    modalVisible,
    setModalVisible,
    markerData,
    setMarkerData,
    addMarker,
    deleteMarker,
    updateMarkerPosition,
    centerLatLong,
    maxBounds,
    markerCount: markers.length,
    routingMode,
    setRoutingMode,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
