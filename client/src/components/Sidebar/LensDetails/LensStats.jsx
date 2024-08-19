import { Box, Typography } from "@mui/material";
import { ThumbUp, Visibility } from "@mui/icons-material";
import { useMapContext } from "../../../contexts/MapContext";
const LensStats = () => {
  const { sidebarCollapsed } = useMapContext();

  return (
    <Box
      sx={{
        opacity: sidebarCollapsed ? 0 : 1,
      }}
      display="flex"
      flexDirection="column"
      gap={0.8}
    >
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
        variant="body1"
        noWrap
      >
        <Visibility fontSize="small" sx={{ marginRight: 1.5 }} />
        Views: {345}
      </Typography>
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
        variant="body1"
        noWrap
      >
        <ThumbUp
          fontSize="small"
          sx={{ verticalAlign: "middle", marginRight: 1.5 }}
        />
        Likes: {77}
      </Typography>
    </Box>
  );
};

export default LensStats;
