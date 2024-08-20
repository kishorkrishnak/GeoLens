import ExploreIcon from "@mui/icons-material/Explore";
import RoomIcon from "@mui/icons-material/Room";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getLenses } from "../../api/lens";
import Footer from "../../components/Footer/Footer";
import LensesGrid from "../../components/LensesGrid";
import Navbar from "../../components/Navbar/Navbar";
import {useAuthContext} from "../../contexts/AuthContext";

import HowItWorks from "./HowItWorks";
const Home = () => {
  const [lenses, setLenses] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCreateLensClick = (e) => {
    e.preventDefault();
    if (!user) return toast.error("You need to be logged in to create lenses");
    navigate("/lens/new");
  };

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const response = await getLenses({
          sort: "popular",
          limit: 6,
        });
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
      <Navbar home />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(hero-background.jpg)`,
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

      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 36, md: 46 },
                }}
                gutterBottom
              >
                Create Your Lens
              </Typography>
              <Typography variant="h6" paragraph>
                Every community has its hidden gems and fascinating stories.
                With GeoLens, you have the power to bring these stories to life.
              </Typography>
              <Typography paragraph>
                Whether it&apos;s the best coffee shops in your neighborhood,
                historical landmarks in your city, or the most picturesque
                hiking trails nearby, your unique perspective can guide others
                to discover the world through your lens.
              </Typography>
              <Typography paragraph>
                Start crafting your lens today and become a local expert,
                sharing your passion and knowledge with explorers from around
                the globe.
              </Typography>
              <Button
                component={Link}
                onClick={handleCreateLensClick}
                to="/lens/new"
                variant="contained"
                startIcon={<RoomIcon />}
                size="large"
                sx={{ mt: 2 }}
              >
                Create Your Lens
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/createlens.jpg"
                alt="Create Your Lens"
                sx={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          margin: "3rem 0.5rem",
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
        {lenses && (
          <Container>
            <LensesGrid lenses={lenses} />
          </Container>
        )}
      </Box>

      <Box sx={{ bgcolor: "background.default", py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/exploreworld.jpg"
                alt="Why GeoLens"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 36, md: 46 },
                }}
                gutterBottom
              >
                Discover the world, one lens at a time.
              </Typography>

              <Typography paragraph>
                GeoLens is more than just a map—it's a gateway to your
                community&apos;s most cherished locations and untold stories.
                Whether you&apos;re an explorer or a storyteller, GeoLens
                empowers you to:
              </Typography>
              <ul>
                <li>
                  <Typography paragraph>
                    Unearth hidden gems and local secrets.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Connect with like-minded adventurers.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Share your unique perspective with the world.
                  </Typography>
                </li>
              </ul>
              <Typography paragraph>
                Join us on a journey to map the world, one lens at a time. Your
                story matters, and with GeoLens, you can make it part of the
                global narrative.
              </Typography>
              <Button
                component={Link}
                to="/lenses"
                variant="contained"
                size="large"
                startIcon={<TravelExploreIcon />}
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
