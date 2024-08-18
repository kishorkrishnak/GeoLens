import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80px",
        position: "sticky",
        top: 0,
      }}
    >
      <Typography color="white" variant="h5">
        GeoLens
      </Typography>
      <Typography color="white" variant="subtitle1">
        {`${new Date().getFullYear()} Explore Geo`}
      </Typography>
    </Box>
  );
};

export default Footer;
