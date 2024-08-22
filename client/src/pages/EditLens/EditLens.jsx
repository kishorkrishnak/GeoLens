import { Route, Routes } from "react-router-dom";
import DrawBounds from "../DrawBounds";
import { LensCreationProvider } from "../LensCreation/contexts/LensCreationContext";
import LensDetails from "../LensDetails";
import SelectCenter from "../SelectCenter";

const EditLens = ({ state }) => {
  const { operation } = state;
  return (
    <LensCreationProvider operation={operation}>
      <Routes>
        <Route path="/" element={<SelectCenter operation={operation} />} />
        <Route
          path="/bounds"
          element={<DrawBounds operation={operation} />}
        />
        <Route
          path="/details"
          element={<LensDetails operation={operation} />}
        />
      </Routes>
    </LensCreationProvider>
  );
};

export default EditLens;
