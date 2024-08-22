import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "react-responsive-modal";
import {
  addCommentToLens,
  deleteCommentFromLens,
  getCommentsForLens,
} from "../../../api/lens";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useMapContext } from "../../../contexts/MapContext";
import useModal from "../../../hooks/useModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Comments from "./Comments/Comments";
import "./CommentsModal.css";

const CommentsModal = ({ lensId }) => {
  const { commentsModalVisible, setCommentsModalVisible } = useMapContext();
  const { isShowing, toggle } = useModal();
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { setLoading, user } = useAuthContext();
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const deleteCommentById = async () => {
    setLoading(true);
    try {
      const response = await deleteCommentFromLens(lensId, commentIdToDelete);

      if (response.data.status === "success") {
        const updatedComments = comments.filter(
          (lens) => lens._id !== commentIdToDelete
        );
        setComments([...updatedComments]);
        setTotalItems((prevCount) => prevCount - 1);

        toast.success("Comment deleted successfully");
      } else {
        toast.error("Error while deleting comment");
      }
    } catch (error) {
      console.error("Error fetching comment data:", error);
    } finally {
      setLoading(false);
      toggle();
    }
  };

  useEffect(() => {
    if (commentsModalVisible) {
      const fetchComments = async () => {
        setLoading(true);
        try {
          const response = await getCommentsForLens(lensId, {
            sort,
            page,
            limit,
          });
          setComments(response.data.data);
          setTotalItems(response.data.total);
          setTotalPages(Math.ceil(response.data.total / limit));
        } catch (error) {
          console.error("Failed to fetch comments", error);
        } finally {
          setLoading(false);
        }
      };
      fetchComments();
    }
  }, [commentsModalVisible, lensId, sort, page]);

  const handleAddComment = async () => {
    if (!comment.trim()) {
      return;
    }

    setLoading(true);
    try {
      const newComment = {
        body: comment,
        userId: user._id,
      };
      const response = await addCommentToLens(lensId, newComment);

      if (response.data.status === "success") {
        setComments([response.data.data, ...comments]);
        setComment("");
        setTotalItems((prevCount) => prevCount + 1);
        toast.success("Comment added successfully");
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Failed to add comment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={commentsModalVisible}
        onClose={() => setCommentsModalVisible(false)}
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
          <Typography marginTop={1} variant="h5" color="black">
            {totalItems > 0
              ? totalItems === 1
                ? "1 Comment"
                : `${totalItems} Comments`
              : "No Comments"}
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
                <MenuItem value="popular">Popular</MenuItem>
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <TextField
                label="Comment"
                placeholder="Add your comment"
                variant="outlined"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                  paddingY: 1.9,
                }}
                variant="contained"
                color="primary"
                onClick={handleAddComment}
              >
                Comment
              </Button>
            </Box>
          </Box>

          <Comments
            comments={comments}
            toggle={toggle}
            setCommentIdToDelete={setCommentIdToDelete}
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
      </Modal>
      <ConfirmationModal
        title={"Are you sure want to delete this comment?"}
        isOpen={isShowing}
        onClose={() => toggle()}
        onConfirm={() => deleteCommentById(commentIdToDelete)}
      />
    </>
  );
};

export default CommentsModal;
