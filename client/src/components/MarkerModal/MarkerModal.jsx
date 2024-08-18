import {
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMapContext } from "../../contexts/MapContext";
import "./MarkerModal.css";
import SelectedLatLng from "./SelectedLatLng";

const MarkerModal = () => {
  const { markerData, setMarkerData, addMarker, setModalVisible } =
    useMapContext();

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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Add Marker</Typography>
          <IconButton
            onClick={() => {
              setModalVisible(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <SelectedLatLng latlng={[markerData.lat, markerData.lng]} />

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Enter Title"
            value={markerData?.title}
            onChange={(e) =>
              setMarkerData({ ...markerData, title: e.target.value })
            }
            margin="normal"
          />

          <TextareaAutosize
            minRows={4}
            placeholder="Enter Description"
            value={markerData?.description}
            onChange={(e) =>
              setMarkerData({ ...markerData, description: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              fontFamily: "Roboto, sans-serif",
              resize: "none",
              border: "1px solid #b8b8b8",
              borderRadius: "4px",
              outline: "none",
            }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Enter Category"
            value={markerData?.category}
            onChange={(e) =>
              setMarkerData({ ...markerData, category: e.target.value })
            }
            margin="normal"
          />

          <Box mt={1} mb={2}>
            <Button variant="outlined" component="label">
              {markerData?.image ? "Change Image" : "Upload a Image"}
              <input
                hidden
                type="file"
                onChange={(e) =>
                  setMarkerData({ ...markerData, image: e.target.files[0] })
                }
              />
            </Button>
          </Box>

          <Box mt={1} mb={2}>
            {markerData.image && (
              <img src={markerData.image} alt="marker-image"></img>
            )}
          </Box>

          <Button onClick={addMarker} variant="contained" color="success">
            Add
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default MarkerModal;
