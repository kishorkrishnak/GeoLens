import "@fontsource-variable/inter";
import { createRoot } from "react-dom/client";
import "react-responsive-modal/styles.css";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
