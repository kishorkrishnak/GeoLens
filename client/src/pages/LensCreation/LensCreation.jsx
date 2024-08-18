import { Route, Routes } from "react-router-dom";
import SelectCenter from "./SelectCenter";
import LensDetails from "./LensDetails";
import { LensCreationProvider } from "./contexts/LensCreationContext";

const LensCreation = () => {
  return (
    <LensCreationProvider>
      <Routes>
        <Route path="/" element={<SelectCenter />} />
        <Route path="/details" element={<LensDetails />} />
      </Routes>
    </LensCreationProvider>
  );
};

export default LensCreation;
