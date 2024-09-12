import {
  CheckBox,
  CheckBoxOutlineBlank,
  DeleteForever,
} from "@mui/icons-material";
import { Avatar, Box, Checkbox, IconButton, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { updateSuggestion } from "../../api/lens";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMapContext } from "../../contexts/MapContext";

const Suggestion = ({ suggestion, setSuggestionIdToDelete, toggle }) => {
  const { isLensCreator } = useMapContext();
  const { setLoading, loading } = useAuthContext();
  const [suggestionData, setSuggestionData] = useState(suggestion);
  // Format the date
  const formattedDate = suggestionData?.createdAt
    ? formatDistanceToNow(new Date(suggestionData.createdAt), {
        addSuffix: true,
      })
    : "Unknown date";

  const handleCheckboxClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let response;
      if (suggestionData.read) {
        response = await updateSuggestion(
          suggestionData.lensId,
          suggestionData._id,
          {
            read: false,
          }
        );
      } else {
        response = await updateSuggestion(
          suggestionData.lensId,
          suggestionData._id,
          {
            read: true,
          }
        );
      }

      if (response.data.status === "success") {
        if (suggestion.read) toast.success("Suggestion marked as unread");
        else toast.success("Suggestion marked as read");

        if (suggestion.read) {
          setSuggestionData({ ...suggestionData, read: false });
        } else {
          setSuggestionData({ ...suggestionData, read: true });
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Failed to update suggestion read status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        borderRadius: 1.5,
        width: "100%",
        padding: 2,
        border: "1px solid #ddd",
        position: "relative",
      }}
    >
      <Link
        to={`/user/${suggestionData?.userId?._id}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "12px",
          color: "black",
          textDecoration: "none",
        }}
      >
        <IconButton
          sx={{
            p: 0,
          }}
        >
          <Avatar
            sx={{
              height: "30px",
              width: "30px",
            }}
            alt={suggestionData?.userId?.name}
            src={suggestionData?.userId?.image}
          />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <Typography color={"black"} variant="body2">
            {suggestionData?.userId.name}
          </Typography>
          <Typography color={"gray"} variant="caption">
            {formattedDate}
          </Typography>
        </Box>
      </Link>

      <Typography variant="body1" maxWidth={"95%"}>
        {suggestionData.suggestionText}
      </Typography>

      {/* Mark as Read Checkbox */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <Typography variant="body2" color="gray">
          Mark as Read
        </Typography>
        <Checkbox
          icon={<CheckBoxOutlineBlank fontSize="small" />}
          checkedIcon={<CheckBox fontSize="small" />}
          checked={suggestion.read}
          onChange={handleCheckboxClick}
        />
      </Box>

      {/* Conditionally render the delete button if the user is the lens owner */}
      {isLensCreator && (
        <IconButton
          size="large"
          aria-label="delete suggestion button"
          aria-controls="delete-suggestion"
          aria-haspopup="true"
          onClick={() => {
            setSuggestionIdToDelete(suggestionData._id);
            toggle();
          }}
          color="inherit"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
          }}
        >
          <DeleteForever color="error" fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default Suggestion;
