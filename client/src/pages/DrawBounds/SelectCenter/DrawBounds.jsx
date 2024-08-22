import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import CircleBoundSlider from "./CircleBoundSlider";
import MapComponent from "./MapComponent";

const DrawBounds = ({ operation }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const navigationUrl =
    operation === "edit" ? `/lens/edit/${id}/details` : "/lens/new/details";

  return (
    <div className="App">
      <Navbar />
      <CircleBoundSlider />
      <Button
        onClick={() => {
          navigate(navigationUrl);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "absolute",
          bottom: 90,
          mt: 3,
          mb: 2,
          zIndex: 10000,
          left: 0,
          right: 0,
          margin: "0 auto",
          color: "white",
          width: "fit-content",
        }}
        color="success"
        variant="contained"
      >
        Confirm
      </Button>

      <MapComponent />
      <Footer />
    </div>
  );
};

export default DrawBounds;
