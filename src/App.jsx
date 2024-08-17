import { useState } from "react";
import MapComponent from "./components/MapComponent";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [markerCount, setMarkerCount] = useState(0);

  return (
    <div className="App">
      <Sidebar markerCount={markerCount} />
      <MapComponent setMarkerCount={setMarkerCount} />
    </div>
  );
}

export default App;
