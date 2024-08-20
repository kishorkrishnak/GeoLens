import { useEffect, useState } from "react";
import LensCreationContext from "./LensCreationContext";
import { useParams } from "react-router-dom";
import { getLensCenterCoordinates } from "../../../../api/lens";

export const LensCreationProvider = ({ children, operation }) => {
  const { id } = useParams();
  console.log(operation);
  const [centerLatLong, setCenterLatLong] = useState([
    12.762846155546352, 75.2016619004097,
  ]);

  useEffect(() => {
    const fetchCenterCoordinates = async () => {
      const response = await getLensCenterCoordinates(id);
      setCenterLatLong([...response.data.data.coordinates]);
    };
    if (operation === "edit") {
      fetchCenterCoordinates();
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCenterLatLong([latitude, longitude]);
        }
      );
    }
  }, [operation]);

  const [maxBounds, setMaxBounds] = useState(null);

  const contextValue = {
    centerLatLong,
    setCenterLatLong,
    maxBounds,
    setMaxBounds,
  };

  return (
    <LensCreationContext.Provider value={contextValue}>
      {children}
    </LensCreationContext.Provider>
  );
};

export default LensCreationProvider;
