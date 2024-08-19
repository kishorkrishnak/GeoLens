import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { generateUniqueId } from "../../utils";
import MapContext from "./MapContext";

export const MapProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [routingMode, setRoutingMode] = useState(false);
  const [centerLatLong, setCenterLatLong] = useState([1, 15]);
  const [markers, setMarkers] = useState(getSavedMarkers());
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

  //get client's geocoordinates and set it as the default center of map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenterLatLong([latitude, longitude]);
      }
    );
  }, []);

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
    setRoutingMode(false);
  }

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
    sidebarCollapsed,
    setSidebarCollapsed
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
