import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  LayerGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import MapBoundsEnforcer from "../../../components/MapBoundsEnforcer";
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
  const { lens, selectedMarkerCategory, currentTileLayer } = useMapContext();

  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Force re-creation of MapContainer when lens changes
    setMapKey((prevKey) => prevKey + 1);
  }, [lens._id]);

  const markers = lens.markers;

  const centerCoordinates = lens.location.coordinates;
  const filteredMarkers = markers.filter((marker) =>
    selectedMarkerCategory && selectedMarkerCategory !== "All"
      ? marker.category === selectedMarkerCategory
      : true
  );
  const centreIcon = createCentreIcon();

  return (
    <MapContainer
      key={mapKey}
      className="map"
      center={centerCoordinates}
      zoom={14}
      scrollWheelZoom={true}
      zoomControl={false}
      maxBoundsViscosity={1}
    >
      <MapBoundsEnforcer />

      <TileLayer
        url={currentTileLayer.url}
        attribution={currentTileLayer.attribution}
      />

      <Markers markers={filteredMarkers} />

      <LayerGroup>
        <Marker icon={centreIcon} position={centerCoordinates}>
          <Popup permanent>
            <Typography variant="h6">Centre point of this Lens</Typography>
            <Typography variant="subtitle2">
              {lens?.address?.formatted}
            </Typography>
          </Popup>
        </Marker>
      </LayerGroup>
      <MarkerModal lensId={lens._id} />
      <CommentsModal lensId={lens._id} />
      <SuggestCorrectionModal lensId={lens._id} />

      <MarkerRoutes />

      <PopupObserver />
      <MapClickHandler />
    </MapContainer>
  );
};

export default Map;
