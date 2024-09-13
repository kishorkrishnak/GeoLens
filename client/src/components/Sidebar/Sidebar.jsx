import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getWeatherData } from "../../api/geocode";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMapContext } from "../../contexts/MapContext";
import CurrentWeather from "./CurrentWeather";
import CreatorCard from "./LensDetails/CreatorCard";
import LensStats from "./LensDetails/LensStats";
import ShareButton from "./LensDetails/ShareButton";
import MarkerFilter from "./MarkerFilter";

const Sidebar = () => {
  const [weather, setWeather] = useState(null);
  const { id } = useParams();
  const {
    lens,
    markerCount,
    routingMode,
    setRoutingMode,
    setModalVisible,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useMapContext();

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const centerCoordinates = lens.location.coordinates;

  useEffect(() => {
    const fetchTodaysWeather = async () => {
      try {
        const response = await getWeatherData(
          centerCoordinates[0],
          centerCoordinates[1]
        );

        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchTodaysWeather();
  }, [centerCoordinates]);

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          top: sidebarCollapsed ? 6 : 13,
          left: sidebarCollapsed ? 4 : 210,
          zIndex: 1001,
          color: "white",
          borderRadius: 3,
          fontSize: "1.5rem",
          transition: "left 0.3s ease",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        sx={{
          width: sidebarCollapsed ? 50 : 260,
          height: "100vh",
          backgroundColor: "#2f3e55",
          position: "absolute",
          zIndex: 1000,
          top: 0,
          left: 0,
          color: "white",
          paddingLeft: sidebarCollapsed ? 0 : "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "width 0.3s ease, padding-left 0.3s ease",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            opacity: sidebarCollapsed ? 0 : 1,
            transition: "opacity 0.2s ease 0.1s", // Delayed transition for the content
            pointerEvents: sidebarCollapsed ? "none" : "auto", // Disable interaction when collapsed
          }}
        >
          <Box
            sx={{
              marginBottom: 3,
            }}
          >
            <Box
              onClick={() => navigate("/")}
              sx={{
                marginTop: 2,
                fontWeight: 600,
                display: "flex",
                cursor: "pointer",
                gap: 2,
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <img
                src="/logo.svg"
                alt="logo"
                style={{ height: 30, width: 30 }}
              />
              <Typography variant="h6">GeoLens</Typography>
            </Box>

            <MarkerFilter />

            <Button
              sx={{
                marginTop: 1,
                color: "white",
              }}
              onClick={() => {
                if (markerCount < 2 && !routingMode)
                  return toast.error("You need at least 2 markers for routing");
                setRoutingMode((prevMode) => {
                  if (!prevMode) setModalVisible(false);
                  return !prevMode;
                });
              }}
              variant="contained"
              color={routingMode ? "warning" : "success"}
            >
              {routingMode ? "Disable Routing" : "Enable Routing"}
            </Button>
          </Box>

          {weather && <CurrentWeather data={weather} />}
        </Box>

        <Box
          sx={{
            transition: "opacity 0.2s ease 0.1s",
          }}
        >
          <LensStats lensId={id} />
          <ShareButton lensId={id} markers={lens.markers} />
          <CreatorCard creator={user} />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
