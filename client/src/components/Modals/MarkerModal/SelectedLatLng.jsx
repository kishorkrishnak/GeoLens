import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { reverseGeoCode } from "../../../api/geocode";
import { useMapContext } from "../../../contexts/MapContext";

const SelectedLatLng = () => {
  const { markerData, setMarkerData } = useMapContext();

  useEffect(() => {
    const reverseGeoCodeSelectedPoint = async () => {
      try {
        const selectedLocation = [markerData.lat, markerData.lng];
        const result = await reverseGeoCode(selectedLocation);
        const address = result.data.results[0];

        setMarkerData({ ...markerData, address });
      } catch (error) {
        console.log(error);
      }
    };

    reverseGeoCodeSelectedPoint();
  }, [markerData.lat, markerData.lng]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }}>
      <Typography variant="p" fontSize={18} noWrap>
        Latitude: {markerData.lat}
      </Typography>

      <Typography variant="p" fontSize={18} noWrap>
        Longitude: {markerData.lng}
      </Typography>

      <Typography variant="p" fontSize={18}>
        Address: {markerData.address?.formatted}
      </Typography>
    </Box>
  );
};

export default SelectedLatLng;
