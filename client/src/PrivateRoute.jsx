import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, user }) => {
  return user ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;
