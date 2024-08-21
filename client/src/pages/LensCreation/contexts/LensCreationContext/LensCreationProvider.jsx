import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLensCenterCoordinates } from "../../../../api/lens";
import LensCreationContext from "./LensCreationContext";

export const LensCreationProvider = ({ children, operation }) => {
  const { id } = useParams();
  const [centerLatLong, setCenterLatLong] = useState([
    23.0707, 80.0982,
  ]);

  useEffect(() => {
    const fetchCenterCoordinates = async () => {
      try {
        const response = await getLensCenterCoordinates(id);
        const coordinates = response.data.data.coordinates;
        setCenterLatLong(coordinates);
      } catch (error) {
        console.error("Failed to fetch center coordinates:", error);
      }
    };

    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const coordinates = [latitude, longitude];
          setCenterLatLong(coordinates);
        },
        (error) => console.error("Geolocation error:", error)
      );
    };

    if (operation === "edit") {
      fetchCenterCoordinates();
    } else {
      fetchCurrentLocation();
    }
  }, [id, operation]);

  const contextValue = {
    centerLatLong,
    setCenterLatLong,
  };

  return (
    <LensCreationContext.Provider value={contextValue}>
      {children}
    </LensCreationContext.Provider>
  );
};

export default LensCreationProvider;
