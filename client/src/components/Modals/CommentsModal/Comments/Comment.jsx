import { DeleteForever } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { useMapContext } from "../../../../contexts/MapContext";

const Comment = ({ comment, setCommentIdToDelete, toggle }) => {
  const { isLensCreator } = useMapContext();

  // Format the date
  const formattedDate = comment?.createdAt
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    : "Unknown date";

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
        position: "relative", // Ensures the delete button is positioned correctly
      }}
    >
      <Link
        to={`/user/${comment?.userId?._id}`}
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
            alt={comment?.userId?.name}
            src={comment?.userId?.image}
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
            {comment?.userId.name}
          </Typography>
          <Typography color={"gray"} variant="caption">
            {formattedDate}
          </Typography>
        </Box>
      </Link>

      <Typography variant="body1" maxWidth={"95%"}>
        {comment.body}
      </Typography>

      {/* Conditionally render the delete button if the user is the lens owner */}
      {isLensCreator && (
        <IconButton
          size="large"
          aria-label="delete comment button"
          aria-controls="delete-comment"
          aria-haspopup="true"
          onClick={() => {
            setCommentIdToDelete(comment._id);
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

export default Comment;
