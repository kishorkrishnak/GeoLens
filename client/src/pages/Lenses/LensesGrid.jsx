import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const LensesGrid = ({ lenses }) => {
  return (
    <Grid container spacing={3}>
      {lenses.map((lens) => (
        <Grid item xs={12} sm={6} md={4} key={lens._id}>
          <Link
            to={`/lens/${lens._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  lens.markers[0]?.image ||
                  "https://via.placeholder.com/300x140"
                }
                alt={lens.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {lens.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {lens.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar
                    src={lens.creator.image}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="body2">{lens.creator.name}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Chip
                    icon={<LocationOnIcon />}
                    label={`${lens.markers.length} markers`}
                    size="small"
                  />
                  <Box sx={{ display: "flex" }}>
                    <Chip
                      icon={<VisibilityIcon />}
                      label={lens.views}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={<FavoriteIcon />}
                      label={lens.likes}
                      size="small"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {lens.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default LensesGrid;
