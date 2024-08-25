import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createMarker, deleteMarker, updateMarker } from "../../api/marker";
import { useAuthContext } from "../AuthContext";
import MapContext from "./MapContext";
import { reverseGeoCode } from "../../api/geocode";
import { tileLayerData } from "../../utils/data";

export const MapProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [markerModalOperation, setMarkerModalOperation] = useState("create");
  const [correctionsModalVisible, setCorrectionsModalVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [routingMode, setRoutingMode] = useState(false);
  const [isLensCreator, setIsLensCreator] = useState(false);
  const [clientGeoCoordinates, setClientGeoCoordinates] = useState([]);
  const [lens, setLens] = useState(null);
  const [markerIdToUpdate, setMarkerIdToUpdate] = useState(null);
  const [selectedMarkerCategory, setSelectedMarkerCategory] = useState("All");

  const tileLayers = tileLayerData;
  const [currentTileLayer, setCurrentTileLayer] = useState(tileLayerData[0]);

  const [markerData, setMarkerData] = useState({
    lat: null,
    lng: null,
    title: "",
    description: "",
    category: "",
    image: "",
    address: {},
  });

  //get client's geocoordinates and set it as the default center of map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setClientGeoCoordinates([latitude, longitude]);
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
      coordinates: [markerData.lng, markerData.lat],
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

  const updateMarkerDetails = async () => {
    if (!(markerData.title && markerData.category)) {
      return toast.error("You must provide a title and category");
    }

    try {
      const response = await updateMarker(markerIdToUpdate, markerData);
      if (response.data.status === "success") {
        const updatedMarkers = lens.markers.map((marker) => {
          if (marker._id === markerIdToUpdate) {
            return {
              ...markerData,
            };
          }

          return marker;
        });

        setLens({
          ...lens,
          markers: updatedMarkers,
        });
      }
      setModalVisible(false);
      toast.success("Marker updated");
      setMarkerData({});
      setMarkerIdToUpdate(null);
    } catch (error) {
      console.log("Error while updating marker");
    }
  };

  const updateMarkerPosition = async (id, { lat, lng }) => {
    try {
      //fetch the address of the new latitude and longitude
      const addressReponse = await reverseGeoCode([lat, lng]);
      const address = addressReponse.data.results[0];

      const processedAddress = {
        formatted: address.formatted,
        components: address.components,
      };

      const response = await updateMarker(id, {
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
        processedAddress,
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
              address,
            };
          }

          return marker;
        });

        setLens({
          ...lens,
          markers: updatedMarkers,
        });

        toast.success(
          "Marker position updated, edit the marker details to reflect the new location"
        );
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
    clientGeoCoordinates,
    setLens,
    markerData,
    setMarkerData,
    markers: lens?.markers,
    markerCount: lens?.markers?.length,
    modalVisible,
    setModalVisible,
    addMarker,
    updateMarkerDetails,
    removeMarker,
    updateMarkerPosition,
    routingMode,
    setRoutingMode,
    sidebarCollapsed,
    setSidebarCollapsed,
    commentsModalVisible,
    setCommentsModalVisible,
    correctionsModalVisible,
    setCorrectionsModalVisible,
    markerModalOperation,
    setMarkerModalOperation,
    setMarkerIdToUpdate,
    selectedMarkerCategory,
    setSelectedMarkerCategory,
    tileLayers,
    currentTileLayer,
    setCurrentTileLayer,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
