import IosShareIcon from "@mui/icons-material/IosShare";
import { Box, IconButton, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useMapContext } from "../../../contexts/MapContext";
const ShareButton = ({ lensId }) => {
  const { sidebarCollapsed } = useMapContext();

  const handleShare = async () => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}/lens/${lensId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "View Lens at GeoLens",
          text: "View Lens at GeoLens",
          url,
        });
      } catch (error) {
        toast.error("Sharing failed.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      } catch (error) {
        toast.error("Failed to copy the link.");
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        sx={{
          opacity: sidebarCollapsed ? 0 : 1,
        }}
        variant="h6"
      >
        Share this lens
      </Typography>

      <IconButton
        onClick={handleShare}
        sx={{
          marginLeft: 1,
          color: "white",
          position: sidebarCollapsed ? "absolute" : "",

          left: sidebarCollapsed ? -3.5 : "",
          top: sidebarCollapsed ? 50 : "",
          zIndex: 1002,
        }}
      >
        <IosShareIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default ShareButton;
