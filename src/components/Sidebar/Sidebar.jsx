import { useState } from "react";
import "./Sidebar.css";
import useMapContext from "../../contexts/MapContext/useMapContext";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { markerCount } = useMapContext();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div
        id="toggleSidebar"
        className={collapsed ? "collapsed" : ""}
        onClick={toggleSidebar}
      >
        ☰
      </div>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-title">
          <img src="logo.svg" alt="logo" />
          <h2>LocalLens</h2>
        </div>
        <p className="sidebar-totalmarkers">
          Total Markers:{" "}
          <span className="sidebar-totalmarkers-count">{markerCount}</span>
        </p>
      </div>
    </>
  );
}

export default Sidebar;
