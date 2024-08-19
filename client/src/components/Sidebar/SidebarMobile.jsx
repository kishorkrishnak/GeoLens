import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWeatherData } from "../../api/geocode";
import useAuthContext from "../../contexts/AuthContext/useAuthContext";
import { useMapContext } from "../../contexts/MapContext";
import CurrentWeather from "./CurrentWeather";
import CreatorCard from "./LensDetails/CreatorCard";
import LensStats from "./LensDetails/LensStats";
import ShareButton from "./LensDetails/ShareButton";
import { useParams } from "react-router-dom";

const SidebarMobile = () => {
  const [weather, setWeather] = useState(null);
  const { id } = useParams();
  const {
    centerLatLong,
    markerCount,
    routingMode,
    setRoutingMode,
    setModalVisible,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useMapContext();

  const { user } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const fetchTodaysWeather = async () => {
      try {
        const response = await getWeatherData(
          centerLatLong[0],
          centerLatLong[1]
        );

        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
      }
    };

    // fetchTodaysWeather();
  }, [centerLatLong]);

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
              sx={{
                marginTop: 2,
                fontWeight: 600,
                display: "flex",
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
            <Typography variant="h6" noWrap sx={{ marginTop: 4 }}>
              Total Markers: {markerCount}
            </Typography>
            <Button
              sx={{
                marginTop: 1,
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
              color={routingMode ? "error" : "success"}
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
          <LensStats />
          <ShareButton lensId={id} />
          <CreatorCard creator={user} />
        </Box>
      </Box>
    </>
  );
};

export default SidebarMobile;
