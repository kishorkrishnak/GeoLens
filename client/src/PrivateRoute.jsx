import { Navigate } from "react-router-dom";

// redirect to home page if not logged in
const PrivateRoute = ({ component: Component, user,state }) => {
  return user ? <Component state={state} /> : <Navigate to="/" />;
};
export default PrivateRoute;
