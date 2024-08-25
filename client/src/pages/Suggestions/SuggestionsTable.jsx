import { Stack } from "@mui/material";
import Suggestion from "./Suggestion";

const SuggestionsTable = ({ suggestions, setSuggestionIdToDelete ,toggle}) => {
  return (
    <Stack
      spacing={1.5}
      direction={"column"}
      sx={{
        width: "100%",
      }}
    >
      {suggestions.map((suggestion, index) => (
        <Suggestion
          setSuggestionIdToDelete={setSuggestionIdToDelete}
          key={index}
          suggestion={suggestion}
          toggle={toggle}
        />
      ))}
    </Stack>
  );
};

export default SuggestionsTable;
