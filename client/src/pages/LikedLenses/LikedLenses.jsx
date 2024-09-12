import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLenses } from "../../api/lens";
import noResultsImg from "../../assets/images/noresults.png";
import Footer from "../../components/Footer/Footer";
import LensesGrid from "../../components/LensesGrid";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";

const LikedLenses = () => {
  const [lenses, setLenses] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const { id } = useParams();

  const { setLoading } = useAuthContext();

  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      try {
        const response = await getLenses({
          search,
          sort,
          likedOnly: true,
          creatorId: id,
        });
        setLenses(response.data.data);
      } catch (error) {
        console.error("Error fetching lenses data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, [search, sort, id, setLoading]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <Container sx={{ flexGrow: 1, paddingY: { xs: 5, md: 6 } }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Lenses You Liked
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3, mb: 5 }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sort}
                label="Sort"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="popular">Popular</MenuItem>
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {lenses.length > 0 ? (
            <LensesGrid lenses={lenses} />
          ) : (
            <Box
              sx={{
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                No Lenses Found
              </Typography>
              <Box
                component="img"
                src={noResultsImg}
                alt="No results"
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LikedLenses;
