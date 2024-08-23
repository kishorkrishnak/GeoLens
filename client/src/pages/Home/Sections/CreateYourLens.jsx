import RoomIcon from "@mui/icons-material/Room";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import createLensImg from "../../../assets/images/createlens.jpg";
import { useAuthContext } from "../../../contexts/AuthContext";

const CreateYourLens = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCreateLensClick = (e) => {
    e.preventDefault();
    if (!user) return toast.error("You need to be logged in to create lenses");
    navigate("/lens/new");
  };

  return (
    <Box component={"section"} sx={{ bgcolor: "background.paper", py: 8 }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={500} gutterBottom>
              Create Your Lens
            </Typography>
            <Typography variant="h6" paragraph>
              Every community has its hidden gems and fascinating stories. With
              GeoLens, you have the power to bring these stories to life.
            </Typography>
            <Typography paragraph>
              Whether it&apos;s the best coffee shops in your neighborhood,
              historical landmarks in your city, or the most picturesque hiking
              trails nearby, your unique perspective can guide others to
              discover the world through your lens.
            </Typography>
            <Typography paragraph>
              Start crafting your lens today and become a local expert, sharing
              your passion and knowledge with explorers from around the globe.
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
              src={createLensImg}
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
  );
};

export default CreateYourLens;
