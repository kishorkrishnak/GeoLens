import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getLenses } from "../../../api/lens";
import LensesGrid from "../../../components/LensesGrid";
import { useAuthContext } from "../../../contexts/AuthContext";

const FeaturedLenses = () => {
  const [lenses, setLenses] = useState([]);
  const { setLoading } = useAuthContext();

  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      try {
        const response = await getLenses({
          sort: "popular",
          limit: 3,
          // featured: true,
        });
        setLenses(response.data.data);
      } catch (error) {
        console.error("Error fetching lenses data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, []);

  return (
    <Box
      component={"section"}
      sx={{
        margin: "3rem 0.5rem",
        minHeight: "45vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        borderRadius: 1,
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight={500} marginBottom={4}>
        Featured Lenses
      </Typography>

      <Container>
        {lenses && lenses?.length > 0 ? (
          <LensesGrid lenses={lenses} />
        ) : (
          <Typography
            width={"fit-content"}
            marginX={"auto"}
            variant="h6"
            fontWeight={500}
            marginTop={4}
          >
            No Featured Lenses
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedLenses;
