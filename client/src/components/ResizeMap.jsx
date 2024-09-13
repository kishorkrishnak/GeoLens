import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

const ResizeMap = () => {
  const map = useMap();
  const { sidebarCollapsed } = useMapContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady) {
      const handleResize = () => {
        clearTimeout(handleResize.timeout);
        handleResize.timeout = setTimeout(() => map.invalidateSize(), 500);
      };

      map.on("resize", handleResize);
      handleResize();

      return () => {
        clearTimeout(handleResize.timeout);
        map.off("resize", handleResize);
      };
    }
  }, [isReady, sidebarCollapsed, map]);

  return null;
};

export default ResizeMap;
