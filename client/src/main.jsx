import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
