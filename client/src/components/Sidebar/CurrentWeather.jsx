import { Box, Typography } from "@mui/material";

const CurrentWeather = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: "0.5rem",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <img
          src={data.current.condition.icon}
          alt="icon"
          style={{
            width: "80px",
            height: "80px",
          }}
        />

        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <Typography variant="h5">
            {data.current.temp_c} <sup style={{ fontSize: "16px" }}>&deg;C</sup>
          </Typography>
          <Typography variant="h6">
            Wind: {data.current.wind_kph} kph
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="p">
          {data.location.name}, {data.location.region}, {data.location.country}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrentWeather;
