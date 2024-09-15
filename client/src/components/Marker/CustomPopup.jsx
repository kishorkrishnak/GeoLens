import {
  Edit,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material/";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Stack, Typography } from "@mui/material";

const CustomPopup = ({
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Typography variant="h5">{markerData.title}</Typography>
      <Typography marginBottom={1} variant="subtitle2" display={"block"}>
        <Typography variant="span" fontWeight={600}>
          Category:{" "}
        </Typography>
        {markerData.category}
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        {markerData.description}
      </Typography>

      {markerData?.image && (
        <img
          src={markerData.image}
          style={{ maxWidth: "160px", borderRadius: "5px" }}
          alt="marker"
        />
      )}
      <Typography variant="subtitle2" fontWeight={600}>
        {markerData?.address?.formatted}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 3,
          marginTop: 1,
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
        <Stack marginTop={1} direction={"row"} spacing={1}>
          <Edit onClick={handleEditClick} fontSize="small" />
          <DeleteForeverIcon
            color="error"
            onClick={handleDeleteClick}
            fontSize="small"
          />
        </Stack>
      )}
    </Box>
  );
};

export default CustomPopup;
