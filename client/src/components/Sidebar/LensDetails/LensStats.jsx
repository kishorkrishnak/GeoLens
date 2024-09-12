import {
  Chat,
  ThumbUp,
  ThumbUpAltOutlined,
  Visibility,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { dislikeLens, likeLens } from "../../../api/lens";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useMapContext } from "../../../contexts/MapContext";
const LensStats = ({ lensId }) => {
  const { sidebarCollapsed, lens, setLens, setCommentsModalVisible } =
    useMapContext();
  const { user, setLoading } = useAuthContext();

  const likeLensById = async () => {
    setLoading(true);
    try {
      const response = await likeLens(lensId);

      if (response.data.status === "success") {
        setLens({
          ...lens,
          likes: [...lens.likes, user._id],
        });
        toast.success("Lens liked");
      } else {
        toast.error("Error while liking Lens");
      }
    } catch (error) {
      console.error("Error while liking Lens:", error);
    } finally {
      setLoading(false);
    }
  };

  const dislikeLensById = async () => {
    setLoading(true);
    try {
      const response = await dislikeLens(lensId);

      if (response.data.status === "success") {
        const updatedLikes = lens.likes.filter((like) => like !== user._id);
        setLens({
          ...lens,
          likes: updatedLikes,
        });
        toast.success("Lens disliked");
      } else {
        toast.error("Error while liking Lens");
      }
    } catch (error) {
      console.error("Error while liking Lens:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        opacity: sidebarCollapsed ? 0 : 1,
      }}
      display="flex"
      flexDirection="column"
      gap={0.8}
    >
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
        variant="body1"
        noWrap
      >
        <Visibility fontSize="small" sx={{ marginRight: 1.5 }} />
        Views: {lens?.views || 0}
      </Typography>
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
        variant="body1"
        noWrap
      >
        {lens.likes.includes(user?._id) ? (
          <ThumbUp
            color="primary"
            onClick={dislikeLensById}
            fontSize="small"
            sx={{
              verticalAlign: "middle",
              marginRight: 1.5,
              cursor: "pointer",
            }}
          />
        ) : (
          <ThumbUpAltOutlined
            onClick={likeLensById}
            fontSize="small"
            sx={{
              verticalAlign: "middle",
              marginRight: 1.5,
              cursor: "pointer",
            }}
          />
        )}
        Likes: {lens?.likes?.length || 0}
      </Typography>

      <Box
        onClick={() => {
          setCommentsModalVisible(true);
        }}
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
          display={"flex"}
          marginTop={2}
          alignItems={"center"}
          justifyContent={"start"}
          color={"greenyellow"}
          variant="body1"
          noWrap
        >
          <Chat
            fontSize="small"
            sx={{ color: "white", verticalAlign: "middle", marginRight: 1.5 }}
          />
          View Comments
        </Typography>
      </Box>
    </Box>
  );
};

export default LensStats;
