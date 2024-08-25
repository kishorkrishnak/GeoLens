import { Autocomplete, TextField, Typography } from "@mui/material";
import { useMapContext } from "../../contexts/MapContext";
import marker_categories from "../Modals/MarkerModal/markerCategories";

const MarkerFilter = () => {
  const { selectedMarkerCategory, setSelectedMarkerCategory } = useMapContext();

  return (
    <Autocomplete
      freeSolo
      sx={{
        mr: 1,
        mt: 1,
      }}
      options={marker_categories}
      groupBy={(option) => option.category}
      value={
        marker_categories.find(
          (option) => option.sub_category === selectedMarkerCategory
        ) || null
      }
      onChange={(e, v) => {
        if (v) {
          setSelectedMarkerCategory(v.sub_category);
        } else {
          setSelectedMarkerCategory("");
        }
      }}
      getOptionLabel={(option) => option.sub_category}
      renderOption={(props, data) => (
        <Typography key={data.id} {...props} variant="body1">
          {data.sub_category}
        </Typography>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Marker Category"
          sx={{
            marginTop: "16px",
            backgroundColor: "#3f4a5a",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5a6785",
              },
              "&:hover fieldset": {
                borderColor: "#7986b5",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#9ea7ce",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
            "& .MuiAutocomplete-inputRoot": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        />
      )}
    />
  );
};

export default MarkerFilter;
