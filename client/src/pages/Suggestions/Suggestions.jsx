import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  deleteSuggestionFromLens,
  getSuggestionsForLens,
} from "../../api/lens";
import Footer from "../../components/Footer/Footer";
import ConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import useModal from "../../hooks/useModal";
import SuggestionsTable from "./SuggestionsTable";

const Suggestions = () => {
  const [suggestionIdToDelete, setSuggestionIdToDelete] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { setLoading } = useAuthContext();
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("General");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const { isShowing, toggle } = useModal();
  const { id } = useParams();

  const deleteSuggestionById = async () => {
    setLoading(true);
    try {
      const response = await deleteSuggestionFromLens(id, suggestionIdToDelete);

      if (response.data.status === "success") {
        const updatedSuggestions = suggestions.filter(
          (suggestion) => suggestion._id !== suggestionIdToDelete
        );
        setSuggestions([...updatedSuggestions]);
        const newTotalItems = totalItems - 1;
        setTotalItems(newTotalItems);
        setTotalPages(Math.ceil(newTotalItems / limit));
        toggle();
        toast.success("Suggestion deleted successfully");
      } else {
        toast.error("Error while deleting suggestion");
      }
    } catch (error) {
      console.error("Error fetching suggestion data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await getSuggestionsForLens(id, {
          sort,
          page,
          limit,
          category,
        });
        setSuggestions(response.data.data);
        setTotalItems(response.data.total);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error("Failed to fetch comments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [id, sort, page, category, setLoading]);

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
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h4" color="black">
            {totalItems > 0
              ? totalItems === 1
                ? "1 Suggestion"
                : `${totalItems} Suggestions`
              : "No Suggestions"}
          </Typography>

          <Box
            sx={{
              my: 3,
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sort}
                label="Sort"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Location Error">Location Error</MenuItem>
                <MenuItem value="Information Update">
                  Information Update
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <SuggestionsTable
            suggestions={suggestions}
            setSuggestionIdToDelete={setSuggestionIdToDelete}
            toggle={toggle}
          />

          <Stack
            spacing={2}
            sx={{ mt: 5, alignItems: "center", width: "100%" }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        </Box>
        <ConfirmationModal
          title={"Are you sure want to delete this suggestion?"}
          isOpen={isShowing}
          onClose={() => toggle()}
          onConfirm={() => deleteSuggestionById(suggestionIdToDelete)}
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default Suggestions;
