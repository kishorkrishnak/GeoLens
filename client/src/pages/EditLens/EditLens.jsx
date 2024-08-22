import { Route, Routes } from "react-router-dom";
import SelectCenter from "../SelectCenter";
import LensDetails from "../LensDetails";
import { LensCreationProvider } from "../LensCreation/contexts/LensCreationContext";
import DrawBounds from "../DrawBounds/SelectCenter";

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
