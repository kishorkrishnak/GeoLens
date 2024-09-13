import { Stack } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import SuggestEdit from "./SuggestEdit/SuggestEdit";
import TileLayerSelector from "./TileLayerSelector/TileLayerSelector";

const TopActionBar = () => {
  const { user } = useAuthContext();

  return (
    <Stack
      sx={{
        zIndex: 100,
        position: "absolute",
        top: 10,
        right: 10,
      }}
      direction={"row"}
    >
      <TileLayerSelector />
      {user?._id && <SuggestEdit />}
    </Stack>
  );
};

export default TopActionBar;
