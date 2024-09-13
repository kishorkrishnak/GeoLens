import IosShareIcon from "@mui/icons-material/IosShare";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useMapContext } from "../../../contexts/MapContext";
import formatMarkersToGeoJSON from "../../../utils/formatMarkersToGeoJSON";
const ShareButton = () => {
  const { sidebarCollapsed, lens } = useMapContext();

  const handleShare = async () => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}/lens/${lens._id}`;
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

  const handleExport = async () => {
    try {
      const markersGeoJSON = formatMarkersToGeoJSON(lens?.markers);

      const geoJSONString = JSON.stringify(markersGeoJSON, null, 2);

      const blob = new Blob([geoJSONString], { type: "application/json" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${lens?.name}-markers.geojson`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to export markers");
    }
  };
  return (
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: sidebarCollapsed ? "column" : "row",
      }}
    >
      <Typography
        sx={{
          opacity: sidebarCollapsed ? 0 : 1,
        }}
        variant="body1"
      >
        Share
      </Typography>
      <Tooltip
        title={<Typography variant="body1">Share Lens</Typography>}
        arrow
      >
        <IconButton
          onClick={handleShare}
          sx={{
            color: "white",
            position: sidebarCollapsed ? "absolute" : "",
            left: sidebarCollapsed ? 4 : "",
            top: sidebarCollapsed ? 50 : "",
            zIndex: 1002,
          }}
        >
          <IosShareIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      {lens?.markers?.length > 0 && (
        <>
          <Typography
            marginLeft={sidebarCollapsed ? 0 : 1}
            sx={{
              opacity: sidebarCollapsed ? 0 : 1,
            }}
            variant="body1"
          >
            Export
          </Typography>
          
          <Tooltip
            title={<Typography variant="body1">Export GeoJSON</Typography>}
            arrow
          >
            <IconButton
              onClick={handleExport}
              sx={{
                color: "white",
                position: sidebarCollapsed ? "absolute" : "",
                left: sidebarCollapsed ? 4 : "",
                top: sidebarCollapsed ? 100 : "",
                zIndex: 1002,
              }}
            >
              <FileDownloadIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default ShareButton;
