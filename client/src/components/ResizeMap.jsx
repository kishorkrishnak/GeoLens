import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "../contexts/MapContext";

const ResizeMap = () => {
  const map = useMap();
  
  const { sidebarCollapsed } = useMapContext();

  useEffect(() => {
    map.invalidateSize();
  }, [sidebarCollapsed, map]);

  return null;
};

export default ResizeMap;
