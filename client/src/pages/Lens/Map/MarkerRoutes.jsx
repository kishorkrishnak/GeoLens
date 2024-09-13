import L from "leaflet";
import { useMapContext } from "../../../contexts/MapContext";
import RoutingMachine from "../../../components/RoutingMachine/RoutingMachine";

const MarkerRoutes = () => {
  const {
    routingMode,
    lens,
 
  } = useMapContext();

  const wayPoints = lens.markers.map((marker) =>
    L.latLng(marker.location.coordinates[0], marker.location.coordinates[1])
  );
  return <div>{routingMode && <RoutingMachine waypoints={wayPoints} />}</div>;
};

export default MarkerRoutes;
