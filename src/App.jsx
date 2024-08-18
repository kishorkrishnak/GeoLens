import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import useAuthContext from "./contexts/AuthContext/useAuthContext";
import { MapProvider } from "./contexts/MapContext";
const LazyMapPage = lazy(() => import("./pages/MapPage"));
const LazyLogin = lazy(() => import("./pages/Auth/Login"));
const LazyHome = lazy(() => import("./pages/Home"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile"));

const App = () => {
  const defaultTheme = createTheme();
  const { user } = useAuthContext();
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  return (
    <Suspense fallback={<CircularProgress />}>
      <GoogleOAuthProvider
        clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}
      >
        <ThemeProvider theme={defaultTheme}>
          <MapProvider>
            <BrowserRouter>
              <Toaster
                position="top-right"
                containerStyle={{ zIndex: 99999 }}
              />
              <Routes>
                <Route path="/" element={<LazyHome />} />
                <Route path="/lens" element={<LazyMapPage />} />
                <Route path="/lens/:id" element={<LazyMapPage />} />
                <Route path="/lens/:id" element={<LazyMapPage />} />
                <Route path="/profile/:id" element={<LazyUserProfile />} />
                <Route
                  path="/login"
                  element={user ? <Navigate to={"/"} /> : <LazyLogin />}
                />
              </Routes>
            </BrowserRouter>
          </MapProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Suspense>
  );
};

export default App;
