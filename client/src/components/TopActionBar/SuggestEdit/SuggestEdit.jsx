import { Edit } from "@mui/icons-material/";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useMapContext } from "../../../contexts/MapContext";
const SuggestEdit = () => {
  const { currentTileLayer, setCorrectionsModalVisible } = useMapContext();

  const handleSuggestClick = () => {
    setCorrectionsModalVisible(true);
  };

  return (
    <Box>
      <Tooltip
        title={<Typography variant="body1">Suggest Correction</Typography>}
        arrow
      >
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleSuggestClick}
        >
          <Edit
            sx={{
              color: currentTileLayer.darkBackground ? "white" : "#455A64",
            }}
            fontSize="medium"
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SuggestEdit;
