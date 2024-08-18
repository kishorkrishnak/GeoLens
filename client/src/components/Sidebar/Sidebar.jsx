import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useMapContext } from "../../contexts/MapContext";
import toast from "react-hot-toast";
import useAuthContext from "../../contexts/AuthContext/useAuthContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { markerCount, routingMode, setRoutingMode, setModalVisible } =
    useMapContext();
  const { user } = useAuthContext();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          top: 13,

          left: collapsed ? 15 : 200,
          zIndex: 1001,
          color: collapsed ? "#2f323b" : "white",
          borderRadius: 3,
          fontSize: "1.5rem",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: "#2f3e55",
          position: "absolute",
          zIndex: 1000,
          top: 0,
          left: 0,
          color: "white",
          paddingLeft: "0.5rem",
          display: collapsed ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              marginTop: 2,
              fontWeight: 600,
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <img src="/logo.svg" alt="logo" style={{ height: 30, width: 30 }} />
            <Typography variant="h6">GeoLens</Typography>
          </Box>
          <Typography
            variant="body1"
            fontSize={18}
            noWrap
            sx={{ marginTop: 4 }}
          >
            Total Markers: {markerCount}
          </Typography>
          <Button
            sx={{
              marginTop: 1,
            }}
            onClick={() => {
              if (markerCount < 2 && !routingMode)
                return toast.error("You need atleast 2 markers for routing");
              setRoutingMode((prevMode) => {
                if (!prevMode) setModalVisible(false);
                return !prevMode;
              });
            }}
            variant="contained"
            color={routingMode ? "error" : "success"}
          >
            {routingMode ? "Disable Routing" : "Enable Routing"}
          </Button>
        </Box>

        <Link
          to={`/profile/${user?._id}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "12px",
            marginBottom: "18px",
            color: "white",
            textDecoration: "none",
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <Avatar
              sx={{ height: "50px", width: "50px" }}
              alt={user?.name}
              src={user?.image}
            />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Typography variant="p" fontSize={18} fontStyle={"italic"}>
              Created By
            </Typography>
            <Typography variant="p">{user?.name}</Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
}

export default Sidebar;
