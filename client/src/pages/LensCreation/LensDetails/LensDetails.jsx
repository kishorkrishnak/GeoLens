import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Chip,
  Stack,
} from "@mui/material";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import { useLensCreationContext } from "../contexts/LensCreationContext";
import axios from "axios";
import useAuthContext from "../../../contexts/AuthContext/useAuthContext";
import { createLens } from "../../../api/lens";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LensDetails() {
  const navigate = useNavigate();
  const { centerLatLong } = useLensCreationContext();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const lensData = {
        name,
        description,
        location: {
          type: "Point",
          coordinates: centerLatLong,
        },
        creator: user._id,
        tags,
      };

      const response = await createLens(lensData);
      console.log(response);
      // Clear form fields
      setName("");
      setDescription("");
      setTagInput("");
      setTags([]);
      setError(null);

      toast.success("Hurray! lens created successfully");
      navigate(`/lens/${response.data.data.lens._id}`);
    } catch (err) {
      setError("Failed to create lens. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500, // Adjust this value as needed
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Enter Lens Details
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Add Tag"
              variant="outlined"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleAddTag}
            >
              Add
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} mt={2}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
              />
            ))}
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Lens"}
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default LensDetails;
