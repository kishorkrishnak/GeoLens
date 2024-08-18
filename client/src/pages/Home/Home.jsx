import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LensTable from "./Table";

const Home = () => {
  const [lenses, setLenses] = useState([
    {
      id: "1",
      name: "Historic Downtown Tour",
      creator: "John Doe",
      category: "Historical",
      views: 1200,
    },
    {
      id: "2",
      name: "Nature Walk in Central Park",
      creator: "Jane Smith",
      category: "Nature",
      views: 980,
    },
    {
      id: "3",
      name: "Best Coffee Shops in Town",
      creator: "Mike Brown",
      category: "Food",
      views: 750,
    },
    {
      id: "4",
      name: "City Events Guide",
      creator: "Emily White",
      category: "Events",
      views: 1340,
    },
    {
      id: "5",
      name: "Hidden Gems of the East Side",
      creator: "Alice Green",
      category: "Hidden Gems",
      views: 620,
    },
  ]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          height: "55vh",
          p: 1,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(loginmarker.jpeg)`,
            backgroundSize: "400px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            width: "100%",
            height: "100%",
            p: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 20, md: 30 },
              textAlign: "center",
              color: "inherit",
            }}
          >
            Login, create and share lenses and lot more...
          </Typography>
        </Box>
        <Typography
          to="/lens"
          component={Link}
          sx={{
            backgroundImage: `url(mapmarkers.png)`,
            backgroundSize: "400px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            width: "100%",
            height: "100%",
            padding: "0.5rem",
            textDecoration: "none",
            color: "inherit",
            fontSize: { xs: 20, md: 30 },
          }}
        >
          Explore basic features as a guest
        </Typography>
      </Box>

      <Box
        sx={{
          margin: "2rem 0.5rem",
          minHeight: "45vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          borderRadius: 1,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 20, md: 25 },
            textAlign: "center",
            color: "inherit",
          }}
        >
          Top lenses this week
        </Typography>
        <LensTable lenses={lenses} />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
