import { Route, Routes } from "react-router-dom";
import SelectCenter from "../SelectCenter";
import LensDetails from "../LensDetails";
import { LensCreationProvider } from "../LensCreation/contexts/LensCreationContext";

const EditLens = ({ state }) => {
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

export default EditLens;
