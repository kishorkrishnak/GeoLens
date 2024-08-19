import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
const HowItWorks = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <CreateIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h6" align="center" gutterBottom>
              Create Lenses
            </Typography>
            <Typography variant="body1" align="center">
              Create map with markers to showcase your favorite locations and
              landmarks in your region.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
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
            elevation={3}
            sx={{
              p: 3,
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
              Discover local hotspots, hidden gems, and community favorites.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
