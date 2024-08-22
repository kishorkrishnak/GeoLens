import { Box, Slider, Typography } from "@mui/material";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";

const CircleBoundSlider = () => {
  const { setCircleBoundRadius, circleBoundRadius } = useLensCreationContext();

  const handleCircleRadiusChange = (e) => {
    setCircleBoundRadius(e.target.value);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 90,
        zIndex: 10000,
        left: 0,
        width: "70%",
        right: 0,
        margin: "0 auto",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="black" variant="h5" fontWeight={600}>
        Select the radius of your Lens
      </Typography>
      <Slider
        defaultValue={circleBoundRadius || 100}
        max={3000}
        aria-label="Select Circle Bound Radius"
        valueLabelDisplay="auto"
        onChange={handleCircleRadiusChange}
      />
    </Box>
  );
};

export default CircleBoundSlider;
