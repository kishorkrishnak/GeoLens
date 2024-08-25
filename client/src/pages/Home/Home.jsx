import { Box } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CreateYourLens from "./Sections/CreateYourLens";
import Cta from "./Sections/Cta.jsx";
import Hero from "./Sections/Hero";
import HowItWorks from "./Sections/HowItWorks";
import TopLenses from "./Sections/TopLenses.jsx";

const Home = () => {
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar home />
      <Hero />
      <HowItWorks />
      <CreateYourLens />
      <TopLenses />
      <Cta />
      <Footer />
    </Box>
  );
};

export default Home;
