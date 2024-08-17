import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ markerCount }) {
  const [collapsed, setCollapsed] = useState(false);

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
