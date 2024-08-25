import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLenses } from "../../../api/lens";
import LensesGrid from "../../../components/LensesGrid";
import { useAuthContext } from "../../../contexts/AuthContext";

const TopLenses = () => {
  const [lenses, setLenses] = useState([]);
  const { setLoading } = useAuthContext();

  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      try {
        const response = await getLenses({
          sort: "popular",
          limit: 3,
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
        Top lenses this week
      </Typography>
      {lenses && (
        <Container>
          <LensesGrid lenses={lenses} />
        </Container>
      )}
    </Box>
  );
};

export default TopLenses;
