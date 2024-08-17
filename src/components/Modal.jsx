import React from "react";

function Modal({ markerData, setMarkerData, addMarker }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={() => setMarkerData(null)}>
          &times;
        </span>
        <h2>Enter Marker Details</h2>
        <input
          type="text"
          value={markerData.title}
          onChange={(e) =>
            setMarkerData({ ...markerData, title: e.target.value })
          }
          placeholder="Enter Title"
        />
        <input
          type="text"
          value={markerData.description}
          onChange={(e) =>
            setMarkerData({ ...markerData, description: e.target.value })
          }
          placeholder="Enter Description"
        />
        <input
          type="text"
          value={markerData.category}
          onChange={(e) =>
            setMarkerData({ ...markerData, category: e.target.value })
          }
          placeholder="Enter Category"
        />
        <button onClick={addMarker} className="btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Modal;
