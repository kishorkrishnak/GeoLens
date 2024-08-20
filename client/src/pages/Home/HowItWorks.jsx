import CreateIcon from "@mui/icons-material/Create";
import PublicIcon from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";

const HowItWorks = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h4" fontWeight={500} align="center">
        How It Works
      </Typography>
      <Grid container spacing={4} sx={{ mt: { xs: 1, md: 2 } }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              px: 4,
              py: { xs: 5, md: 4 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <CreateIcon />
            </Avatar>
            <Typography variant="h6" align="center" gutterBottom>
              Create Lenses
            </Typography>
            <Typography variant="body1" align="center">
              Create maps with markers to showcase best locations and landmarks
              in your region.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              px: 4,
              py: { xs: 5, md: 4 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>
              <ShareIcon />
            </Avatar>
            <Typography variant="h6" align="center" gutterBottom>
              Share Experiences
            </Typography>
            <Typography align="center">
              Share your themed lenses with the community and discover new
              perspectives.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              px: 4,
              py: { xs: 5, md: 4 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "error.main", mb: 2 }}>
              <PublicIcon />
            </Avatar>
            <Typography variant="h6" align="center" gutterBottom>
              Explore Community
            </Typography>
            <Typography align="center">
              Discover local hotspots, hidden gems, and community favorites for
              new adventures
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
