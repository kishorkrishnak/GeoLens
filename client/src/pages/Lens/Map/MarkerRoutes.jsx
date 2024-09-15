import L from "leaflet";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";
import { useMapContext } from "../../../contexts/MapContext";

const MarkerRoutes = () => {
  const { routingMode, lens } = useMapContext();

  const markers = lens.markers;

  const wayPoints = markers.map((marker) =>
    L.latLng(marker.location.coordinates[0], marker.location.coordinates[1])
  );

  return <div>{routingMode && <RoutingMachine waypoints={wayPoints} />}</div>;
};

export default MarkerRoutes;
