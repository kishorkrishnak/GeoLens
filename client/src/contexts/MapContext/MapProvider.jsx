import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createMarker, deleteMarker, updateMarker } from "../../api/marker";
import { useAuthContext } from "../AuthContext";
import MapContext from "./MapContext";

export const MapProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [routingMode, setRoutingMode] = useState(false);
  const [isLensCreator, setIsLensCreator] = useState(false);
  const [centerLatLong, setCenterLatLong] = useState([1, 15]);
  const [lens, setLens] = useState(null);
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
    address: "",
  });

  //get client's geocoordinates and set it as the default center of map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenterLatLong([latitude, longitude]);
      }
    );
  }, []);

  //check if the lens visitor is the creator of the lens
  useEffect(() => {
    if (!user) return;

    if (lens?.creator?._id === user?._id) {
      return setIsLensCreator(true);
    } else {
      return setIsLensCreator(false);
    }
  }, [lens, user]);

  const addMarker = async () => {
    if (!(markerData.title && markerData.category)) {
      return toast.error("You must provide a title and category");
    }

    const location = {
      type: "Point",
      coordinates: [markerData.lat, markerData.lng],
    };

    const newMarker = {
      ...markerData,
      lensId: lens._id,
      location,
    };

    const response = await createMarker(newMarker);

    setLens({
      ...lens,
      markers: [...lens.markers, response.data.data],
    });

    setModalVisible(false);
    toast.success("Marker added");
    setMarkerData({});
  };

  const removeMarker = async (id) => {
    try {
      const response = await deleteMarker(id);
      if (response.data.status === "success") {
        const updatedMarkers = lens.markers.filter(
          (marker) => marker._id !== id
        );

        setLens({
          ...lens,
          markers: [...updatedMarkers],
        });

        toast.success("Marker deleted");
        setRoutingMode(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.success("Error while deleting marker");
    }
  };

  const updateMarkerPosition = async (id, { lat, lng }) => {
    try {
      const response = await updateMarker(id, {
        location: {
          type: "Point",
          coordinates: [lat, lng],
        },
      });
      if (response.data.status === "success") {
        const updatedMarkers = lens.markers.map((marker) => {
          if (marker._id === id) {
            return {
              ...marker,
              location: {
                type: "Point",
                coordinates: [lat, lng],
              },
            };
          }

          return marker;
        });

        setLens({
          ...lens,
          markers: updatedMarkers,
        });
      } else {
        throw new Error("Error while updating marker");
      }
    } catch (error) {
      toast.error("Could not update marker");
    }
  };

  const contextValue = {
    lens,
    isLensCreator,
    centerLatLong,
    maxBounds,
    setLens,
    markerData,
    setMarkerData,
    markers: lens?.markers,
    markerCount: lens?.markers?.length,
    modalVisible,
    setModalVisible,
    addMarker,
    removeMarker,
    updateMarkerPosition,
    routingMode,
    setRoutingMode,
    sidebarCollapsed,
    setSidebarCollapsed,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
