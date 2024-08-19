import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { reverseGeoCode } from "../../../api/geocode";

const SelectedLatLng = ({ latlng }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const reverseGeoCodeSelectedPoint = async () => {
      try {
        const result = await reverseGeoCode(latlng);
        setAddress(result.data.results[0].formatted);
      } catch (error) {
        console.log(error);
      }
    };

    // reverseGeoCodeSelectedPoint();
  }, [latlng]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="p" fontSize={18} noWrap>
        Latitude: {latlng[0]}
      </Typography>

      <Typography variant="p" fontSize={18} noWrap>
        Longitude: {latlng[1]}
      </Typography>

      <Typography variant="p" fontSize={18}>
        Address: {address}
      </Typography>
    </Box>
  );
};

export default SelectedLatLng;
