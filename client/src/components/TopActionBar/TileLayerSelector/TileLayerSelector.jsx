import GridViewIcon from "@mui/icons-material/GridView";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { uid } from "react-uid";
import { useMapContext } from "../../../contexts/MapContext";
import DoneIcon from "@mui/icons-material/Done";
const TileLayerSelector = () => {
  const { tileLayers, currentTileLayer, setCurrentTileLayer ,setModalVisible} = useMapContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (anchorEl) return setAnchorEl(null);
    setAnchorEl(event.currentTarget);
  };

  const handleLayerSelect = (layer) => {
    setModalVisible(false)
    setCurrentTileLayer(layer);
    setAnchorEl(null);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Tooltip
        title={<Typography variant="body1">Switch Tile Layer</Typography>}
        arrow
      >
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <GridViewIcon
            sx={{
              color: currentTileLayer.darkBackground ? "white" : "#455A64",
            }}
            fontSize="medium"
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {tileLayers.map((tileLayer) => (
          <MenuItem
            key={uid(tileLayer)}
            onClick={() => handleLayerSelect(tileLayer)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 1,
              }}
            >
              <Typography>{tileLayer.label}</Typography>
           {tileLayer.id === currentTileLayer.id &&    <DoneIcon />}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TileLayerSelector;
