import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useMapContext } from "../../../contexts/MapContext";

const CreatorCard = ({ creator }) => {
  const { sidebarCollapsed } = useMapContext();

  return (
    <Link
      to={`/user/${creator?._id}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "12px",
        margin: "20px 0",
        color: "white",
        textDecoration: "none",
      }}
    >
      <IconButton
        sx={{
          p: 0,
          position: sidebarCollapsed ? "absolute" : "",

          left: sidebarCollapsed ? -3.5 : "",
          bottom: sidebarCollapsed ? 20 : "",
          marginLeft: sidebarCollapsed ? 1.5 : "",
        }}
      >
        <Avatar
          sx={{
            height: sidebarCollapsed ? "30px" : "50px",
            width: sidebarCollapsed ? "30px" : "50px",
          }}
          alt={creator?.name}
          src={creator?.image}
        />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          opacity: sidebarCollapsed ? 0 : 1,
        }}
      >
        <Typography variant="p" fontSize={18} fontStyle={"italic"}>
          Created By
        </Typography>
        <Typography variant="p">{creator?.name}</Typography>
      </Box>
    </Link>
  );
};

export default CreatorCard;
