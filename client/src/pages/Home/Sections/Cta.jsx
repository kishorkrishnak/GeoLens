import { Box, Button, Container, Grid, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import exploreWorldImg from "../../../assets/images/exploreworld.jpg";

const Cta = () => {
  return (
    <Box component={"section"} sx={{ bgcolor: "background.default", py: 8 }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={exploreWorldImg}
              alt="Why GeoLens"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={500} gutterBottom>
              Discover the world, one lens at a time.
            </Typography>

            <Typography paragraph>
              GeoLens is more than just a map, it&apos;s a gateway to your
              community&apos;s most cherished locations and untold stories.
              Whether you&apos;re an explorer or a storyteller, GeoLens empowers
              you to:
            </Typography>
            <Box
              sx={{
                pl: 2.09,
              }}
            >
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
            </Box>
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
  );
};

export default Cta;
