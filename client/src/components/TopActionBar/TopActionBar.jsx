import { Stack } from "@mui/material";
import React from "react";
import SuggestEdit from "./SuggestEdit/SuggestEdit";
import TileLayerSelector from "./TileLayerSelector/TileLayerSelector";

const TopActionBar = () => {
  return (
    <Stack
      sx={{
        zIndex: 100000,
        position: "absolute",
        top: 10,
        right: 10,
      }}
      direction={"row"}
    >
      <TileLayerSelector />
      <SuggestEdit />
    </Stack>
  );
};

export default TopActionBar;
