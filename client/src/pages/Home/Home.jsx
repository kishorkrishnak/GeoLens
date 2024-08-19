import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LensesGrid from "../Lenses/LensesGrid";
import { getLenses } from "../../api/lens";
import ExploreIcon from "@mui/icons-material/Explore";
import HowItWorks from "./HowItWorks";

const Home = () => {
  const [lenses, setLenses] = useState([]);

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const response = await getLenses();
        setLenses(response.data.data);
      } catch (error) {
        console.error("Error fetching lenses data:", error);
      }
    };

    fetchLenses();
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(hero-background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
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
            GeoLens: Landmark Explorer
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

      <HowItWorks />

      <Box
        sx={{
          margin: "2rem 0.5rem",
          minHeight: "45vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          borderRadius: 1,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "inherit",
            marginBottom: 4,
          }}
        >
          Top lenses this week
        </Typography>
        {lenses && <LensesGrid lenses={lenses} />}
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
