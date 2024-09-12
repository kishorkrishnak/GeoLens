import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getLenses } from "../../api/lens";
import noResultsImg from "../../assets/images/noresults.png";
import Footer from "../../components/Footer/Footer";
import LensesGrid from "../../components/LensesGrid";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { countryData } from "../../utils/data";
import { useMapContext } from "../../contexts/MapContext";
import toast from "react-hot-toast";

const Lenses = () => {
  const [lenses, setLenses] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [distance, setDistance] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const { setLoading } = useAuthContext();
  const { clientGeoCoordinates } = useMapContext();

  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      try {
        const response = await getLenses({
          search,
          country,
          state,
          sort,
          page,
          limit,
          distance,
          clientLat: clientGeoCoordinates[0],
          clientLng: clientGeoCoordinates[1],
        });
        setLenses(response.data.data);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error("Error fetching lenses data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, [
    search,
    country,
    state,
    distance,
    clientGeoCoordinates,
    sort,
    page,
    setLoading,
  ]);

  const getStatesByCountry = (country) => {
    if (!country) return [];
    const states = countryData.find(({ name }) => name === country).states;
    return states;
  };

  const countries = countryData.map((country) => country.name);
  const states = getStatesByCountry(country);

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
            Explore Lenses
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3, mb: 5 }}
          >
            <TextField
              label="Search"
              placeholder="Enter keyword"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <Autocomplete
                value={country}
                onChange={(event, newValue) => {
                  setCountry(newValue);
                }}
                options={countries}
                renderInput={(params) => (
                  <TextField {...params} label="Country" variant="outlined" />
                )}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option}
                freeSolo
              />
            </FormControl>
            <FormControl fullWidth>
              <Autocomplete
                value={state}
                onChange={(event, newValue) => {
                  setState(newValue);
                }}
                options={states}
                renderInput={(params) => (
                  <TextField {...params} label="State" variant="outlined" />
                )}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option}
                freeSolo
              />
            </FormControl>
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

            <FormControl fullWidth>
              <InputLabel>Distance</InputLabel>
              <Select
                value={distance}
                label="Distance"
                onChange={(e) => {
                  if (
                    clientGeoCoordinates &&
                    clientGeoCoordinates?.length === 2
                  ) {
                    setDistance(e.target.value);
                  } else
                    toast.error(
                      "You need to allow location access for this query"
                    );
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="10">&lt; 10 km</MenuItem>
                <MenuItem value="100">&lt; 100 km</MenuItem>
                <MenuItem value="500">&lt; 500 km</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {lenses.length > 0 ? (
            <>
              <LensesGrid lenses={lenses} />
              <Stack spacing={2} sx={{ mt: 5, alignItems: "center" }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Stack>
            </>
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
                alt="No Results"
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

export default Lenses;
