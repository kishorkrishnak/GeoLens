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
import { deleteLens, getLenses } from "../../api/lens";
import Footer from "../../components/Footer/Footer";
import LensesGrid from "../../components/LensesGrid";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import useModal from "../../hooks/useModal";
import ConfirmationModal from "../../components/Modals/MarkerModal/ConfirmationModal";
import toast from "react-hot-toast";

const YourLenses = () => {
  const [lenses, setLenses] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");

  const { id } = useParams();

  const { setLoading } = useAuthContext();
  const { isShowing, toggle } = useModal();
  const [lensIdToDelete, setLensIdToDelete] = useState(null);

  const deleteLensById = async () => {
    setLoading(true);
    try {
      const response = await deleteLens(lensIdToDelete);
      if (response.data.status === "success") {
        const updatedLenses = lenses.filter(
          (lens) => lens._id !== lensIdToDelete
        );
        setLenses([...updatedLenses]);
        toast.success("Lens deleted successfully");
      } else {
        toast.error("Error while deleting lens");
      }
    } catch (error) {
      console.error("Error fetching lenses data:", error);
    } finally {
      setLoading(false);
      toggle();
    }
  };

  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      try {
        const response = await getLenses({
          search,
          sort,
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
  }, [search, sort, id]);

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
            Manage Your Lenses
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
            <LensesGrid
              toggle={toggle}
              setLensIdToDelete={setLensIdToDelete}
              allowEdit
              lenses={lenses}
            />
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
        <ConfirmationModal
          title={"Are you sure want to delete this lens?"}
          isOpen={isShowing}
          onClose={() => toggle()}
          onConfirm={() => deleteLensById(lensIdToDelete)}
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default YourLenses;
