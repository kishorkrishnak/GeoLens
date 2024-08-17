import "./MarkerModal.css";

const MarkerModal = ({
  markerData,
  setMarkerData,
  addMarker,
  setModalVisible,
}) => {
  return (
    <div
      onClick={() => {
        setModalVisible(false);
      }}
      className="modal"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-content"
      >
        <span
          className="close-button"
          onClick={() => {
            setModalVisible(false);
          }}
        >
          &times;
        </span>
        <h1>Enter Marker Details</h1>
        <input
          type="text"
          value={markerData?.title}
          onChange={(e) =>
            setMarkerData({ ...markerData, title: e.target.value })
          }
          placeholder="Enter Title"
        />
        <input
          type="text"
          value={markerData?.description}
          onChange={(e) =>
            setMarkerData({ ...markerData, description: e.target.value })
          }
          placeholder="Enter Description"
        />
        <input
          type="text"
          value={markerData?.category}
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
};

export default MarkerModal;
