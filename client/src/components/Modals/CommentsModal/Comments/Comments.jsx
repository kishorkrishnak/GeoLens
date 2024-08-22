import { Stack } from "@mui/material";
import Comment from "./Comment";

const Comments = ({ comments, setCommentIdToDelete, toggle }) => {
  return (
    <Stack
    spacing={1.5}
    direction={"column"}
    sx={{
      width: "100%",
    }}
  >
      {comments.map((comment, index) => (
        <Comment
          toggle={toggle}
          setCommentIdToDelete={setCommentIdToDelete}
          key={index}
          comment={comment}
        />
      ))}
    </Stack>
  );
};

export default Comments;
