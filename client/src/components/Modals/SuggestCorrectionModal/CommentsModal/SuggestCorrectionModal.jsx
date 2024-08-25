import { Box, Button, Stack, TextField } from "@mui/material";
import { Modal } from "react-responsive-modal";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useState } from "react";
import { useMapContext } from "../../../../contexts/MapContext";
import { suggestCorrection } from "../../../../api/lens"; // Assume handleFileUpload is imported here
import toast from "react-hot-toast";
import { handleFileUpload } from "../../../../utils/handleFileUpload";

const SuggestCorrectionModal = ({ lensId }) => {
  const { correctionsModalVisible, setCorrectionsModalVisible } =
    useMapContext();
  const { setLoading, user } = useAuthContext();
  const [suggestion, setSuggestion] = useState({
    userId: user?._id,
    category: "General",
    suggestionText: "",
    attachmentUrl: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const imageUrl = await handleFileUpload(file);
        setSuggestion((prev) => ({
          ...prev,
          attachmentUrl: imageUrl,
        }));
      } catch (error) {
        console.error("Failed to upload image", error);
        toast.error("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  const addSuggestion = async () => {
    setLoading(true);
    try {
      const response = await suggestCorrection(lensId, suggestion);

      if (response.data.status === "success") {
        toast.success("Suggestion successfully sent to Lens creator");
        setSuggestion({
          userId: user?._id,
          category: "General",
          suggestionText: "",
          attachmentUrl: "",
        });

        setCorrectionsModalVisible(false);
      } else throw new Error();
    } catch (error) {
      console.error("Failed to suggest correction", error);
      toast.error("Failed to submit suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={correctionsModalVisible}
        onClose={() => setCorrectionsModalVisible(false)}
        center
        classNames={{
          modal: "custom-modal",
        }}
        animationDuration={400}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          padding={2}
        >
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
            <Stack
              direction={"column"}
              spacing={2}
              sx={{
                width: "100%",
                mt: 1,
              }}
            >
              <TextField
                label="Category"
                select
                variant="outlined"
                fullWidth
                value={suggestion.category}
                onChange={(e) =>
                  setSuggestion((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                SelectProps={{ native: true }}
              >
                <option value="General">General</option>
                <option value="Location Error">Location Error</option>
                <option value="Information Update">Information Update</option>
                <option value="Other">Other</option>
              </TextField>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Attach Image/Document
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>

              <TextField
                label="Suggestion/Edit"
                placeholder="Mention your Suggestion or Edit"
                variant="outlined"
                rows={5}
                multiline
                fullWidth
                value={suggestion.suggestionText}
                onChange={(e) =>
                  setSuggestion((prev) => ({
                    ...prev,
                    suggestionText: e.target.value,
                  }))
                }
              />

              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                  paddingY: 1.9,
                  mt: 2,
                }}
                variant="contained"
                color="primary"
                onClick={addSuggestion}
              >
                Suggest
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SuggestCorrectionModal;
