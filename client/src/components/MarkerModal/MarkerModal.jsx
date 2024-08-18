import { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Box,
  IconButton,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMapContext } from "../../contexts/MapContext";
import { handleFileUpload } from "../../utils/handleFileUpload";
import markerCategories from "./markerCategories";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css"; // Import styles
import SelectedLatLng from "./SelectedLatLng";
const MarkerModal = () => {
  const {
    markerData,
    setMarkerData,
    addMarker,
    setModalVisible,
    modalVisible,
  } = useMapContext();
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const imageUrl = await handleFileUpload(file);
      setMarkerData({ ...markerData, image: imageUrl });
      setUploading(false);
    }
  };

  return (
    <Modal
      open={modalVisible}
      onClose={() => setModalVisible(false)}
      center
      classNames={{
        modal: "custom-modal",
        overlay: "custom-overlay",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        padding={2}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h5" color="success">
            Add Marker
          </Typography>
        </Box>

        <Box my={2}>
          <SelectedLatLng latlng={[markerData.lat, markerData.lng]} />
        </Box>

        <Box component="form" noValidate autoComplete="off" width="100%">
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
              marginTop: "16px",
            }}
          />

          <Autocomplete
            options={markerCategories}
            groupBy={(option) => option.category}
            onChange={(e, v) =>
              setMarkerData({ ...markerData, category: v.category })
            }
            getOptionLabel={(option) => option.sub_category}
            renderOption={(props, data) => (
              <Typography key={data.id} {...props} variant="body1">
                {data.sub_category}
              </Typography>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Enter Category"
                placeholder="Categories"
                style={{ marginTop: "16px" }}
              />
            )}
          />

          <Box mt={2} mb={2}>
            <Button variant="outlined" component="label">
              {markerData?.image ? "Change Image" : "Upload a Image"}
              <input hidden type="file" onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box mt={2} mb={2}>
            {markerData.image && (
              <img
                src={markerData.image}
                style={{ maxWidth: "100%", height: "auto" }}
                alt="marker-image"
              />
            )}
          </Box>

          <Button onClick={addMarker} variant="contained" color="success">
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MarkerModal;
