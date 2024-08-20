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
import Footer from "../../components/Footer/Footer";
import LensesGrid from "../../components/LensesGrid";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { countryData } from "../../utils/data";

const Lenses = () => {
  const [lenses, setLenses] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState();
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const { setLoading } = useAuthContext();

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
  }, [search, country, state, sort, page]);

  const getStatesByCountry = (country) => {
    if (!country) return [];
    const states =
      countryData
        .find(({ name }) => name === country)
        ?.states?.map((data) => data.name) || [];

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
              placeholder="Names, places, keywords"
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
                <MenuItem value="closest">Closest</MenuItem>
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
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
                src="/noresults.png"
                alt="Create Your Lens"
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
