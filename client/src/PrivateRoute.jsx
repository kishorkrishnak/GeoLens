import { Navigate } from "react-router-dom";

// redirect to home page if not logged in
const PrivateRoute = ({ component: Component, user }) => {
  return user ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;
