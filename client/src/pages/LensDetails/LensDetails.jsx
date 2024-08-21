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
import { useNavigate, useParams } from "react-router-dom";
import { createLens, getLens, updateLens } from "../../api/lens";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { handleFileUpload } from "../../utils/handleFileUpload";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";

const LensDetails = ({ operation }) => {
  const navigate = useNavigate();
  const { centerLatLong } = useLensCreationContext();
  const { user } = useAuthContext();
  const { id } = useParams();

  const [lensData, setLensData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    tags: [],
    location: {
      type: "Point",
      coordinates: centerLatLong,
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState(null);
  const { loading, setLoading } = useAuthContext();

  // Handle lens thumbnail upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const imageUrl = await handleFileUpload(file);
        setLensData((prevData) => ({
          ...prevData,
          thumbnail: imageUrl,
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (operation === "create") {
        await handleCreateLens();
      } else if (operation === "edit") {
        await handleUpdateLens();
      }
    } catch (error) {
      toast.error("Failed to save lens. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLens = async () => {
    const lensDataToSend = {
      ...lensData,
      creator: user._id,
    };

    const response = await createLens(lensDataToSend);
    setLensData({
      name: "",
      description: "",
      thumbnail: "",
      tags: [],
      location: {
        type: "Point",
        coordinates: centerLatLong,
      },
    });
    setTagInput("");
    setError(null);

    toast.success(
      "Lens created successfully! Add markers and share it with the world!"
    );
    navigate(`/lens/${response.data.data._id}`);
  };

  const handleUpdateLens = async () => {
    const { creator, ...lensDataToUpdate } = lensData;

    await updateLens(id, lensDataToUpdate);
    setLensData({
      name: "",
      description: "",
      thumbnail: "",
      tags: [],
      location: {
        type: "Point",
        coordinates: centerLatLong,
      },
    });
    setTagInput("");
    setError(null);

    toast.success("Lens updated successfully");
    navigate(`/user/${user._id}/lenses`);
  };

  const handleAddTag = () => {
    if (tagInput && !lensData.tags.includes(tagInput)) {
      setLensData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput],
      }));
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setLensData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  // Fetch and prefill lens data if in edit mode
  useEffect(() => {
    if (operation === "edit" && id) {
      const fetchLens = async () => {
        setLoading(true);

        try {
          const response = await getLens(id);
          const lensDetails = response.data?.data;
          if (lensDetails) {
            setLensData({
              name: lensDetails.name || "",
              description: lensDetails.description || "",
              thumbnail: lensDetails.thumbnail || "",
              tags: lensDetails.tags || [],
              location: {
                type: "Point",
                coordinates: centerLatLong,
              },
            });
          }
        } catch (error) {
          console.error("Error fetching lens data:", error);
          toast.error("Failed to fetch lens data.");
        } finally {
          setLoading(false);
        }
      };

      fetchLens();
    }
  }, [id, operation, centerLatLong, setLoading]);

  // Redirect if no centerLatLong available
  useEffect(() => {
    if (!centerLatLong || centerLatLong.length !== 2) navigate("/lens/new");
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
            {operation === "edit" ? "Edit Lens Details" : "Enter Lens Details"}
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            value={lensData.name}
            inputProps={{ maxLength: 100 }}
            onChange={(e) =>
              setLensData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={lensData.description}
            inputProps={{ maxLength: 2000 }}
            onChange={(e) =>
              setLensData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
            required
          />

          <Box>
            <Button variant="outlined" component="label">
              {lensData.thumbnail ? "Change Image" : "Upload Thumbnail"}
              <input hidden type="file" onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box>
            {lensData.thumbnail && (
              <img
                src={lensData.thumbnail}
                style={{ maxWidth: "100%", height: "auto" }}
                alt="thumbnail"
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
              sx={{ height: "100%", py: 1.87 }}
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            {lensData.tags.map((tag, index) => (
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
            sx={{ py: 2, color: "white", textTransform: "none" }}
          >
            {loading
              ? operation === "edit"
                ? "Updating..."
                : "Creating..."
              : operation === "edit"
              ? "Update Lens"
              : "Create Lens"}
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LensDetails;
