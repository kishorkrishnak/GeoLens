import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createLens } from "../../../api/lens";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import {useAuthContext} from "../../../contexts/AuthContext";

import { useLensCreationContext } from "../contexts/LensCreationContext";
import { handleFileUpload } from "../../../utils/handleFileUpload";

function LensDetails() {
  const navigate = useNavigate();
  const { centerLatLong } = useLensCreationContext();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const imageUrl = await handleFileUpload(file);
      setThumbnail(imageUrl);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const lensData = {
        name,
        description,
        thumbnail,
        location: {
          type: "Point",
          coordinates: centerLatLong,
        },
        creator: user._id,
        tags,
      };

      const response = await createLens(lensData);
      setName("");
      setDescription("");
      setTagInput("");
      setThumbnail("");
      setTags([]);
      setError(null);

      toast.success(
        "Hurray! lens created successfully, now add markers for your favorite locations and share it with the world!",
        {
          duration: 8000,
        }
      );
      navigate(`/lens/${response.data.data._id}`);
    } catch (err) {
      toast.error("Failed to create lens. Please try again.");
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

  useEffect(() => {
    if (!centerLatLong && !centerLatLong.length === 2) navigate("/lens/new");
  }, [centerLatLong, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          paddingY: 5,
          paddingX: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
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
            inputProps={{ maxLength: 100 }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            inputProps={{ maxLength: 2000 }}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Box>
            <Button variant="outlined" component="label">
              {thumbnail ? "Change Image" : "Upload Thumbnail"}
              <input hidden type="file" onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box>
            {thumbnail && (
              <img
                src={thumbnail}
                style={{ maxWidth: "100%", height: "auto" }}
                alt="marker-image"
              />
            )}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Add Tags"
              variant="outlined"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{
                height: "100%",
                py: 1.87,
              }}
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
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
            color="success"
            disabled={loading}
            sx={{
              py: 2,
              color: "white",
              textTransform: "none",
            }}
          >
            {loading ? "Creating..." : "Create Lens"}
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default LensDetails;
