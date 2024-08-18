import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import MapComponent from "./MapComponent";

const SelectCenter = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar />

      <Button
        onClick={() => {
          navigate("/lens/new/details");
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

export default SelectCenter;
