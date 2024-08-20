import { Route, Routes } from "react-router-dom";
import LensDetails from "../LensDetails";
import SelectCenter from "../SelectCenter";
import { LensCreationProvider } from "./contexts/LensCreationContext";

const LensCreation = ({ state }) => {
  const { operation } = state;
  return (
    <LensCreationProvider operation={operation}>
      <Routes>
        <Route path="/" element={<SelectCenter operation={operation} />} />
        <Route
          path="/details"
          element={<LensDetails operation={operation} />}
        />
      </Routes>
    </LensCreationProvider>
  );
};

export default LensCreation;
