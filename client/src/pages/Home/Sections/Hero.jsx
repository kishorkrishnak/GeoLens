import { Box, Button, Container, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import heroBgImg from "../../../assets/images/hero-background.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Box
      component={"section"}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${heroBgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center",
        height: { xs: "60vh", md: "70vh" },
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Container>
        <Typography
          sx={{
            fontSize: { xs: 36, md: 60 },
          }}
          variant="h2"
          gutterBottom
        >
          GeoLens: Explore & Share
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 22, md: 34 },
          }}
          variant="h4"
          gutterBottom
          color={"greenyellow"}
        >
          Your community, your map
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 16, md: 20 },
          }}
          variant="h6"
          paragraph
        >
          Discover and share interesting places in your community
        </Typography>
        <Button
          component={Link}
          to="/lenses"
          variant="contained"
          size="large"
          startIcon={<ExploreIcon />}
        >
          Start Exploring
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
