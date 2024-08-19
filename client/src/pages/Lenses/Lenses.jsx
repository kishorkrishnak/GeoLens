import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getLenses } from "../../api/lens";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LensesGrid from "./LensesGrid";

const Lenses = () => {
  const [lenses, setLenses] = useState([]);
  const [filteredLenses, setFilteredLenses] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const response = await getLenses();
        setLenses(response.data.data);
        setFilteredLenses(response.data.data);
      } catch (error) {
        console.error("Error fetching lenses data:", error);
      }
    };

    fetchLenses();
  }, []);

  useEffect(() => {
    let result = lenses;

    if (search) {
      result = result.filter(
        (lens) =>
          lens.name.toLowerCase().includes(search.toLowerCase()) ||
          lens.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (country) {
      result = result.filter((lens) => lens.country === country);
    }

    if (state) {
      result = result.filter((lens) => lens.state === state);
    }

    result.sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setFilteredLenses(result);
  }, [search, country, state, sortOrder, lenses]);

  const countries = [...new Set(lenses.map((lens) => lens.country))];
  const states = [...new Set(lenses.map((lens) => lens.state))];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
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
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              label="Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {countries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              value={state}
              label="State"
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {states.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sort</InputLabel>
            <Select
              value={sortOrder}
              label="Sort"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <LensesGrid lenses={filteredLenses} />
      </Box>
      <Footer />
    </Box>
  );
};

export default Lenses;
