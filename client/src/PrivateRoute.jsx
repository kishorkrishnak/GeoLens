import { Navigate } from "react-router-dom";
import useAuthContext from "./contexts/AuthContext/useAuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuthContext();
  return user ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;
