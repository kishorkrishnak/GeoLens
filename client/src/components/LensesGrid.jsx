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
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const LensesGrid = ({ lenses, allowEdit, toggle, setLensIdToDelete }) => {
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
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={lens.thumbnail || "https://via.placeholder.com/300x140"}
                alt={lens.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  fontWeight={500}
                  component="div"
                >
                  {lens?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" noWrap>
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
                      label={lens.likes?.length}
                      size="small"
                    />
                  </Box>
                </Box>
                {allowEdit && (
                  <Stack
                    direction="row"
                    sx={{
                      mt: 2,
                    }}
                    spacing={1}
                    alignItems="center"
                  >
                    <Link
                      to={`/lens/edit/${lens._id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      sx={{ mt: 2 }}
                    >
                      <Chip
                        color="success"
                        label={"Edit"}
                        size="medium"
                        sx={{ ml: 0, color: "white" }}
                      />
                    </Link>

                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggle();
                        setLensIdToDelete(lens._id);
                      }}
                    >
                      <Chip
                        color="warning"
                        label={"Delete"}
                        size="medium"
                        sx={{ ml: 0, color: "white" }}
                      />
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default LensesGrid;
