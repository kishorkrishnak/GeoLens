import {
  Edit,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material/";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Stack, Typography } from "@mui/material";

const ResponsivePopup = ({
  markerData,
  isLiked,
  isDisliked,
  handleLike,
  handleDislike,
  handleEditClick,
  handleDeleteClick,
  isLensCreator,
}) => {
  return (
    <div>
      <Typography variant="h6">{markerData.title}</Typography>
      <Typography variant="body1">{markerData.description}</Typography>
      <Typography marginBottom={2} variant="subtitle2" display={"block"}>
        <Typography variant="span" fontWeight={600}>
          Category:{" "}
        </Typography>
        {markerData.category}
      </Typography>

      <Typography variant="subtitle2">
        {markerData?.address?.formatted}
      </Typography>

      {markerData?.image && (
        <img
          src={markerData.image}
          style={{ maxWidth: "130px", borderRadius: "5px" }}
          alt="marker"
        />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 3,
        }}
      >
        <Typography variant="body1">
          {isLiked ? (
            <ThumbUp
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
              fontSize="small"
              color="primary"
              onClick={handleLike}
            />
          ) : (
            <ThumbUpOutlined
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
              fontSize="small"
              color="primary"
              onClick={handleLike}
            />
          )}
          {markerData.likes.length}
        </Typography>
        <Typography variant="body1">
          {isDisliked ? (
            <ThumbDown
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
              fontSize="small"
              color="primary"
              onClick={handleDislike}
            />
          ) : (
            <ThumbDownOutlined
              sx={{ verticalAlign: "middle", marginRight: 1.5 }}
              fontSize="small"
              color="primary"
              onClick={handleDislike}
            />
          )}
          {markerData.dislikes.length}
        </Typography>
      </Box>

      {isLensCreator && (
        <Stack direction={"row"} spacing={1}>
          <Edit onClick={handleEditClick} fontSize="small" />
          <DeleteForeverIcon
            color="error"
            onClick={handleDeleteClick}
            fontSize="small"
          />
        </Stack>
      )}
    </div>
  );
};

export default ResponsivePopup;
