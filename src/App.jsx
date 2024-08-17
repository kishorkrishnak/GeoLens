import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
const LazyHome = lazy(() => import("./pages/Home"));
import MapProvider from "./contexts/MapContext/MapProvider";

const App = () => {
  return (
    <MapProvider>
      <BrowserRouter>
        <Toaster position="top-right" containerStyle={{ zIndex: 99999 }} />
        <Routes>
          <Route path="/" element={<LazyHome />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  );
};

export default App;
