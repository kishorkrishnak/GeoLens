import useRoutingMachine from "../../hooks/useRoutingMachine";

function RoutingMachine({ waypoints }) {
  useRoutingMachine(waypoints);
  return null;
}

export default RoutingMachine;
