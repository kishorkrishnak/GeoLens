import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, IconButton, Typography } from "@mui/material";
export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "info.main",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80px",
        position: "sticky",
        top: 0,
      }}
    >
      <Typography color="white" variant="body1">
        Copyright &#169; {new Date().getFullYear()} GeoLens
      </Typography>

      <IconButton target="_blank" href="https://github.com/kishorkrishnak">
        <GitHubIcon htmlColor="white" />
      </IconButton>
    </Box>
  );
};

export default Footer;
