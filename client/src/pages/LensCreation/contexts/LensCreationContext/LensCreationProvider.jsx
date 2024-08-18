import { useEffect, useState } from "react";
import LensCreationContext from "./LensCreationContext";

export const LensCreationProvider = ({ children }) => {
  const [centerLatLong, setCenterLatLong] = useState([
    12.762846155546352, 75.2016619004097,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenterLatLong([latitude, longitude]);
      }
    );
  }, []);

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
