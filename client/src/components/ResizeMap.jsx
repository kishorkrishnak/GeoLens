import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

const ResizeMap = () => {
  const map = useMap();

  const { sidebarCollapsed } = useMapContext();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [sidebarCollapsed, map]);

  return null;
};

export default ResizeMap;
