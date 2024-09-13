import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapBoundsEnforcer from "../../../components/MapBoundsEnforcer";
import ResizeMap from "../../../components/ResizeMap";

import MapClickHandler from "../../../components/MapClickHandler";
import createCentreIcon from "../../../components/Marker/MarkerIcons/CentreIcon";
import CommentsModal from "../../../components/Modals/CommentsModal/CommentsModal";
import MarkerModal from "../../../components/Modals/MarkerModal/MarkerModal";
import SuggestCorrectionModal from "../../../components/Modals/SuggestCorrectionModal/CommentsModal/SuggestCorrectionModal";
import PopupObserver from "../../../components/PopupObserver";
import { useMapContext } from "../../../contexts/MapContext";
import MarkerRoutes from "./MarkerRoutes";
import Markers from "./Markers";

const Map = () => {
  const { lens, selectedMarkerCategory, currentTileLayer, sidebarCollapsed } =
    useMapContext();

  const mapContainerRef = useRef(null);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapContainerRef.current.style.width = `calc(100vw - ${
        sidebarCollapsed ? "50px" : "260px"
      })`;
      mapContainerRef.current.style.transition = "width 0.3s ease";
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    // Force re-creation of MapContainer when lens changes
    setMapKey((prevKey) => prevKey + 1);
  }, [lens]);

  const markers = lens.markers;

  const centerCoordinates = lens.location.coordinates;
  const filteredMarkers = markers.filter((marker) =>
    selectedMarkerCategory && selectedMarkerCategory !== "All"
      ? marker.category === selectedMarkerCategory
      : true
  );
  const centreIcon = createCentreIcon();
  
  return (
    <div ref={mapContainerRef} style={{ height: "100vh", marginLeft: "auto" }}>
      <MapContainer
        key={mapKey}
        className="map"
        id="lens-map"
        center={centerCoordinates}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBoundsViscosity={1}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <RecenterMap lat={centerCoordinates[0]} lng={centerCoordinates[1]} /> */}
        <MapBoundsEnforcer />
        <ResizeMap />

        <TileLayer
          url={currentTileLayer.url}
          attribution={currentTileLayer.attribution}
        />

        <Markers markers={filteredMarkers} />

        <Marker icon={centreIcon} position={centerCoordinates}>
          <Popup permanent>
            <Typography variant="h6">Centre point of this Lens</Typography>
            <Typography variant="subtitle2">
              {lens?.address?.formatted}
            </Typography>
          </Popup>
        </Marker>

        <MarkerModal lensId={lens._id} />
        <CommentsModal lensId={lens._id} />
        <SuggestCorrectionModal lensId={lens._id} />

        <MarkerRoutes />

        <PopupObserver />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
